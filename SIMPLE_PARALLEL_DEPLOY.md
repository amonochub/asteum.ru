# 🚀 Простой параллельный деплой - Через путь /process

> Запуск параллельно с существующим сайтом БЕЗ поддомена  
> Работает: asteum.ru/process

---

## 🎯 Что получится

```
Существующий: https://asteum.ru          (не трогаем)
Поддомен:     https://edu.asteum.ru      (не трогаем)
Process Flow: https://asteum.ru/process  (новый)
API:          https://asteum.ru/process-api
```

---

## ⚡ Деплой за 3 шага

### Шаг 1: Загрузить проект на сервер

```bash
# С локальной машины
rsync -avz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='backend/node_modules' \
  . root@89.169.38.246:/opt/asteum-process/
```

### Шаг 2: Запустить Docker контейнеры

```bash
ssh root@89.169.38.246

cd /opt/asteum-process

# Запустить на портах 8081 и 3001 (не конфликтуют)
docker-compose -f docker-compose.parallel.yml up -d

# Проверить
docker ps | grep asteum-process
```

**Порты**:

- `8081` - Frontend (HTTP)
- `3001` - Backend API

### Шаг 3: Добавить в Nginx конфиг

```bash
# На сервере найти конфиг для asteum.ru
ssh root@89.169.38.246

# Обычно это один из:
# /etc/nginx/sites-available/asteum.ru
# /etc/nginx/conf.d/asteum.ru.conf
# /etc/nginx/nginx.conf

# Открыть конфиг
nano /etc/nginx/sites-available/asteum.ru

# В server блок для asteum.ru (после других location) добавить:
```

```nginx
# Process Flow приложение
location /process {
    rewrite ^/process(/.*)$ $1 break;
    rewrite ^/process$ / break;

    proxy_pass http://localhost:8081;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# API для Process Flow
location /process-api/ {
    rewrite ^/process-api/(.*)$ /api/$1 break;

    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

```bash
# Проверить конфиг
nginx -t

# Перезагрузить Nginx
systemctl reload nginx
```

---

## ✅ Проверка

```bash
# Health checks
curl https://asteum.ru/process-health
curl https://asteum.ru/process-api/v1/users

# В браузере
open https://asteum.ru/process
```

---

## 📊 Архитектура

```
root@89.169.38.246
│
├── Nginx (порты 80/443)
│   ├── /              → Основной сайт
│   ├── /edu           → Поддомен edu
│   ├── /process       → Process Flow (новый) ✨
│   └── /process-api   → Backend API (новый) ✨
│
└── Docker контейнеры
    ├── asteum-process-frontend:8081
    └── asteum-process-backend:3001
```

---

## 🔧 Управление

### Запуск/Остановка

```bash
ssh root@89.169.38.246

cd /opt/asteum-process

# Запустить
docker-compose -f docker-compose.parallel.yml up -d

# Остановить
docker-compose -f docker-compose.parallel.yml down

# Перезапустить
docker-compose -f docker-compose.parallel.yml restart

# Логи
docker-compose -f docker-compose.parallel.yml logs -f
```

### Обновление кода

```bash
# Загрузить новый код
rsync -avz --exclude='node_modules' . root@89.169.38.246:/opt/asteum-process/

# Пересобрать и перезапустить
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml up -d --build'
```

---

## 📝 Важные моменты

### ✅ Что НЕ трогаем

- ✅ Основной сайт `asteum.ru`
- ✅ Поддомен `edu.asteum.ru`
- ✅ Существующие порты 80/443
- ✅ Существующие Docker контейнеры

### ✅ Что используем

- ✅ Новые порты: 8081, 3001
- ✅ Новый путь: `/process`
- ✅ Новые контейнеры с префиксом `asteum-process-`

### ✅ Используемые порты

| Сервис   | Порт    | Конфликты              |
| -------- | ------- | ---------------------- |
| Nginx    | 80, 443 | Нет (уже используется) |
| Frontend | 8081    | Нет (новый)            |
| Backend  | 3001    | Нет (новый)            |

---

## 🔍 Troubleshooting

### Docker не запускается?

```bash
# Проверить порты
netstat -tulpn | grep -E ':8081|:3001'

# Если заняты - изменить в docker-compose.parallel.yml
# Например: "8082:80" вместо "8081:80"
```

### Nginx ошибки?

```bash
# Проверить синтаксис
nginx -t

# Посмотреть логи
tail -f /var/log/nginx/error.log

# Проверить что Docker запущен
curl http://localhost:8081/health
curl http://localhost:3001/health
```

### 404 ошибка на /process?

```bash
# Проверить что location добавлен в правильный server блок
# Должен быть в блоке для asteum.ru, НЕ для edu.asteum.ru

# Проверить конфиг
cat /etc/nginx/sites-available/asteum.ru | grep -A 10 "location /process"
```

### React Router не работает?

```bash
# Добавить в nginx location /process:
try_files $uri $uri/ /index.html;

# Или использовать:
location /process {
    alias /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
}
```

---

## 📚 Альтернативные пути (если /process занят)

Можно использовать другой путь:

```nginx
location /app {          # вместо /process
    proxy_pass http://localhost:8081;
    # ...
}

location /app-api/ {     # вместо /process-api
    proxy_pass http://localhost:3001/api/;
    # ...
}
```

Доступ:

- `https://asteum.ru/app`
- `https://asteum.ru/app-api`

---

## ✅ Checklist деплоя

- [ ] Проект загружен в `/opt/asteum-process/`
- [ ] Docker контейнеры запущены (`docker ps`)
- [ ] Порты 8081 и 3001 слушаются (`netstat -tulpn`)
- [ ] Health checks работают локально
- [ ] Nginx конфиг обновлен
- [ ] `nginx -t` проходит без ошибок
- [ ] Nginx перезагружен
- [ ] `curl https://asteum.ru/process-health` работает
- [ ] Сайт открывается в браузере

---

## 🎉 Готово!

После выполнения проект доступен:

```
✅ https://asteum.ru              → Основной сайт (не тронут)
✅ https://edu.asteum.ru          → Поддомен (не тронут)
✅ https://asteum.ru/process      → Process Flow (работает) ✨
✅ https://asteum.ru/process-api  → Backend API ✨
```

---

## 📊 Быстрая справка команд

```bash
# Загрузить
rsync -avz --exclude='node_modules' . root@89.169.38.246:/opt/asteum-process/

# Запустить
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml up -d'

# Проверить
curl https://asteum.ru/process-health

# Логи
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml logs -f'

# Остановить
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml down'
```

---

**✅ Все сайты работают параллельно!**

_Дата: 2 октября 2025_  
_Режим: Параллельный деплой через путь_  
_Путь: /process_
