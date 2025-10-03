# 🔄 Параллельный деплой - Не конфликтует с существующим сайтом

> Инструкция для запуска проекта параллельно с существующим сайтом на root@89.169.38.246  
> Дата: 2 октября 2025

---

## 🎯 Задача

На сервере **89.169.38.246** уже работает сайт. Нужно развернуть **Asteum Process Flow** параллельно, без конфликтов.

---

## 📊 Решение: 2 варианта

### Вариант 1: Поддомен (Рекомендуется) ⭐

```
Существующий: https://asteum.ru
Новый проект: https://app.asteum.ru
```

**Преимущества**:

- ✅ Чистое разделение
- ✅ Независимые SSL
- ✅ Легко масштабировать

### Вариант 2: Путь

```
Существующий: https://asteum.ru
Новый проект: https://asteum.ru/process
```

**Преимущества**:

- ✅ Один домен
- ✅ Проще DNS
- ⚠️ Сложнее настройка роутинга

---

## 🚀 Вариант 1: Поддомен (app.asteum.ru)

### Шаг 1: DNS настройка

Добавить A-запись для поддомена:

```
app.asteum.ru  →  89.169.38.246
```

Проверить:

```bash
nslookup app.asteum.ru
# Должен вернуть: 89.169.38.246
```

### Шаг 2: Загрузить проект на сервер

```bash
# С локальной машины
rsync -avz \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude 'backend/node_modules' \
  --exclude 'backend/dist' \
  . root@89.169.38.246:/opt/asteum-process/

# Или архивом
tar -czf asteum-process.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='backend/node_modules' \
  --exclude='backend/dist' \
  .
scp asteum-process.tar.gz root@89.169.38.246:/opt/
ssh root@89.169.38.246 'cd /opt && tar -xzf asteum-process.tar.gz -C asteum-process'
```

### Шаг 3: Запустить Docker контейнеры

```bash
# На сервере
ssh root@89.169.38.246

cd /opt/asteum-process

# Запустить контейнеры (порты 8081/8443 и 3001)
docker-compose -f docker-compose.parallel.yml up -d

# Проверить что запустились
docker ps | grep asteum-process

# Логи
docker-compose -f docker-compose.parallel.yml logs -f
```

**Используемые порты**:

- `8081` - HTTP frontend
- `8443` - HTTPS frontend
- `3001` - Backend API

### Шаг 4: Настроить Nginx на host

```bash
# На сервере
ssh root@89.169.38.246

# Создать конфиг для поддомена
cat > /etc/nginx/sites-available/app.asteum.ru << 'EOF'
# Nginx конфигурация для app.asteum.ru

server {
    listen 80;
    listen [::]:80;
    server_name app.asteum.ru;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name app.asteum.ru;

    # SSL (используем те же сертификаты что и для основного домена)
    ssl_certificate /opt/asteum-process/SSL/certificate-2.crt;
    ssl_certificate_key /opt/asteum-process/SSL/certificate-2.key;
    ssl_trusted_certificate /opt/asteum-process/SSL/certificate_ca.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Proxy к Docker контейнеру
    location / {
        proxy_pass https://localhost:8443;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_verify off;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:8081/health;
        access_log off;
    }

    access_log /var/log/nginx/app.asteum.ru.access.log;
    error_log /var/log/nginx/app.asteum.ru.error.log;
}
EOF

# Создать симлинк
ln -s /etc/nginx/sites-available/app.asteum.ru /etc/nginx/sites-enabled/

# Проверить конфигурацию
nginx -t

# Перезагрузить Nginx
systemctl reload nginx
```

### Шаг 5: Проверка

```bash
# Health checks
curl http://localhost:8081/health        # Frontend (локально)
curl http://localhost:3001/health        # Backend (локально)

# Через поддомен
curl https://app.asteum.ru/health
curl https://app.asteum.ru/api/v1/users

# В браузере
open https://app.asteum.ru
```

---

## 🔄 Вариант 2: Путь (/process)

### Использовать если нет возможности настроить поддомен

```bash
# На сервере в основном nginx конфиге asteum.ru
# Добавить location блоки:

location /process/ {
    proxy_pass http://localhost:8081/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    rewrite ^/process/(.*)$ /$1 break;
}

location /process-api/ {
    proxy_pass http://localhost:3001/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}

# Перезагрузить Nginx
systemctl reload nginx
```

Доступ:

```
https://asteum.ru/process
https://asteum.ru/process-api/v1/users
```

---

## 📊 Архитектура

### Вариант 1 (Поддомен)

```
┌─────────────────────────────────────────┐
│           89.169.38.246                 │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Основной сайт (asteum.ru)       │  │
│  │  Порты: 80, 443                  │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Process Flow (app.asteum.ru)    │  │
│  │                                  │  │
│  │  Nginx → Docker (8081/8443)      │  │
│  │  Backend: 3001                   │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Вариант 2 (Путь)

```
┌─────────────────────────────────────────┐
│           89.169.38.246                 │
│                                         │
│  Nginx (80/443)                         │
│    ├─ /          → Основной сайт        │
│    ├─ /process   → Docker (8081)        │
│    └─ /process-api → Backend (3001)     │
└─────────────────────────────────────────┘
```

---

## 🔧 Управление

### Запуск

```bash
cd /opt/asteum-process
docker-compose -f docker-compose.parallel.yml up -d
```

### Остановка

```bash
docker-compose -f docker-compose.parallel.yml down
```

### Перезапуск

```bash
docker-compose -f docker-compose.parallel.yml restart
```

### Логи

```bash
# Все логи
docker-compose -f docker-compose.parallel.yml logs -f

# Только frontend
docker logs asteum-process-frontend -f

# Только backend
docker logs asteum-process-backend -f
```

### Обновление

```bash
# Загрузить новый код
rsync -avz . root@89.169.38.246:/opt/asteum-process/

# На сервере пересобрать
cd /opt/asteum-process
docker-compose -f docker-compose.parallel.yml up -d --build
```

---

## 🔍 Troubleshooting

### Проблема: Порт уже занят

```bash
# Проверить какие порты заняты
netstat -tulpn | grep -E ':8081|:8443|:3001'

# Если заняты - изменить в docker-compose.parallel.yml
# Например: "8082:80" вместо "8081:80"
```

### Проблема: Nginx не запускается

```bash
# Проверить синтаксис
nginx -t

# Посмотреть логи
tail -f /var/log/nginx/error.log

# Проверить конфликты конфигов
ls -la /etc/nginx/sites-enabled/
```

### Проблема: Docker контейнеры не стартуют

```bash
# Проверить логи
docker-compose -f docker-compose.parallel.yml logs

# Проверить состояние
docker ps -a | grep asteum-process

# Пересоздать
docker-compose -f docker-compose.parallel.yml down
docker-compose -f docker-compose.parallel.yml up -d
```

### Проблема: SSL ошибки

```bash
# Проверить сертификаты
openssl x509 -in /opt/asteum-process/SSL/certificate-2.crt -noout -dates

# Проверить путь к сертификатам в nginx конфиге
ls -la /opt/asteum-process/SSL/
```

---

## ✅ Checklist деплоя

### Подготовка

- [ ] DNS настроен (A-запись для app.asteum.ru)
- [ ] Проект загружен на сервер (/opt/asteum-process)
- [ ] SSL сертификаты скопированы

### Docker

- [ ] docker-compose.parallel.yml настроен
- [ ] Контейнеры запущены (`docker ps`)
- [ ] Health checks проходят (`curl localhost:8081/health`)

### Nginx

- [ ] Конфиг создан (/etc/nginx/sites-available/app.asteum.ru)
- [ ] Симлинк создан (/etc/nginx/sites-enabled/)
- [ ] Nginx перезагружен (`systemctl reload nginx`)
- [ ] `nginx -t` проходит без ошибок

### Проверка

- [ ] `curl https://app.asteum.ru/health` работает
- [ ] `curl https://app.asteum.ru/api/health` работает
- [ ] Сайт открывается в браузере
- [ ] SSL сертификат валидный (зеленый замок)

---

## 📚 Файлы конфигурации

| Файл                          | Описание                              |
| ----------------------------- | ------------------------------------- |
| `docker-compose.parallel.yml` | Docker compose (порты 8081/8443/3001) |
| `nginx-parallel.conf`         | Nginx в Docker контейнере             |
| `nginx-subdomain.conf`        | Nginx на host для поддомена           |
| `PARALLEL_DEPLOYMENT.md`      | Эта инструкция                        |

---

## 🎉 Готово!

После выполнения всех шагов проект будет доступен:

**Вариант 1 (Поддомен)**:

```
https://app.asteum.ru              → Frontend
https://app.asteum.ru/api/v1/...   → Backend API
```

**Вариант 2 (Путь)**:

```
https://asteum.ru/process           → Frontend
https://asteum.ru/process-api/v1/   → Backend API
```

Основной сайт продолжит работать на:

```
https://asteum.ru                   → Существующий сайт
```

---

**✅ Проекты работают параллельно без конфликтов!**

_Дата: 2 октября 2025_  
_Версия: 1.0.0_  
_Режим: Параллельный деплой_
