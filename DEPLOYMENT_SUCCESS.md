# ✅ Деплой успешно завершен!

**Дата**: 2 октября 2025  
**Сервер**: root@89.169.38.246  
**Домен**: asteum.ru

---

## 🎉 Что развернуто

### Frontend

- **URL**: https://asteum.ru/process
- **Порт**: 8081 (внутренний)
- **Статус**: ✅ Работает
- **Health**: https://asteum.ru/process-health

### Backend API

- **URL**: https://asteum.ru/process-api
- **Порт**: 3001 (внутренний)
- **Статус**: ✅ Работает
- **Health**: https://asteum.ru/process-api/health
- **Endpoints**:
  - GET /process-api/api/v1/users
  - POST /process-api/api/v1/users
  - PATCH /process-api/api/v1/users/:id
  - DELETE /process-api/api/v1/users/:id
  - GET /process-api/api/v1/processes
  - POST /process-api/api/v1/processes
  - PATCH /process-api/api/v1/processes/:id
  - DELETE /process-api/api/v1/processes/:id

---

## 📊 Статус сервисов

```bash
✅ Frontend: healthy (порт 8081)
✅ Backend: healthy (порт 3001)
✅ Nginx: active (running)
✅ Docker контейнеры: 2/2 запущены
```

---

## 🌐 Доступ к приложению

### Основной URL

```
https://asteum.ru/process
```

### API Endpoints

```
https://asteum.ru/process-api/health
https://asteum.ru/process-api/api/v1/users
https://asteum.ru/process-api/api/v1/processes
```

---

## 🔧 Управление на сервере

### Подключение к серверу

```bash
ssh root@89.169.38.246
cd /opt/asteum-process
```

### Docker команды

```bash
# Просмотр статуса
docker-compose -f docker-compose.parallel.yml ps

# Логи
docker-compose -f docker-compose.parallel.yml logs -f

# Перезапуск
docker-compose -f docker-compose.parallel.yml restart

# Остановка
docker-compose -f docker-compose.parallel.yml down

# Запуск
docker-compose -f docker-compose.parallel.yml up -d
```

### Nginx команды

```bash
# Проверка конфигурации
nginx -t

# Перезагрузка
systemctl reload nginx

# Статус
systemctl status nginx

# Просмотр логов
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 📝 Nginx конфигурация

**Файл**: `/etc/nginx/sites-available/asteum.ru`

Основные location блоки:

- `/process` → Frontend (порт 8081)
- `/process-api/` → Backend API (порт 3001)
- `/process-health` → Health check

SSL сертификаты:

- `/opt/asteum-process/SSL/certificate-2.crt`
- `/opt/asteum-process/SSL/certificate-2.key`
- `/opt/asteum-process/SSL/certificate_ca.crt`

---

## 🔄 Обновление приложения

### Обновление кода

```bash
# На локальной машине
cd "/Users/amonoc/Library/Mobile Documents/com~apple~CloudDocs/Проекты/asteum-process-flow"

# Загрузить новый код на сервер
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' \
  . root@89.169.38.246:/opt/asteum-process/

# На сервере пересобрать и перезапустить
ssh root@89.169.38.246
cd /opt/asteum-process
docker-compose -f docker-compose.parallel.yml up -d --build
```

### Автоматическое обновление (скрипт)

```bash
./deploy.sh
```

---

## ⚠️ Важно

### Существующие сайты (не затронуты)

- ✅ liqtrade.ru - работает на порту 80/443
- ✅ static.liqtrade.ru - работает
- ✅ Все существующие сервисы не затронуты

### Используемые порты

- **8081** - Frontend HTTP (только localhost)
- **8443** - Frontend HTTPS (только localhost)
- **3001** - Backend API (только localhost)
- **80/443** - Nginx (публичный доступ)

Все Docker контейнеры слушают только localhost, доступ извне только через Nginx!

---

## 🐛 Troubleshooting

### Приложение не открывается?

```bash
# Проверить DNS
nslookup asteum.ru

# Проверить Nginx
systemctl status nginx
nginx -t

# Проверить Docker
docker ps | grep asteum-process

# Проверить health checks
curl https://localhost/process-health
curl https://localhost/process-api/health
```

### Логи показывают ошибки?

```bash
# Логи Docker
docker-compose -f docker-compose.parallel.yml logs

# Логи Nginx
tail -100 /var/log/nginx/error.log

# Системные логи
journalctl -u nginx -f
```

### SSL ошибки?

```bash
# Проверить сертификаты
ls -la /opt/asteum-process/SSL/
openssl x509 -in /opt/asteum-process/SSL/certificate-2.crt -text -noout

# Проверить срок действия
openssl x509 -in /opt/asteum-process/SSL/certificate-2.crt -noout -dates
```

---

## 📞 Техническая информация

### Структура проекта на сервере

```
/opt/asteum-process/
├── backend/              # Backend код
│   ├── src/
│   ├── package.json
│   └── ...
├── src/                  # Frontend код
├── SSL/                  # SSL сертификаты
│   ├── certificate-2.crt
│   ├── certificate-2.key
│   └── certificate_ca.crt
├── docker-compose.parallel.yml
├── Dockerfile.production
└── nginx конфиги
```

### Docker сеть

- **Network**: asteum-process-network
- **Driver**: bridge
- **Containers**:
  - asteum-process-frontend
  - asteum-process-backend

---

## ✅ Checklist

- [x] Файлы загружены на сервер
- [x] Docker контейнеры собраны
- [x] Frontend работает (порт 8081)
- [x] Backend работает (порт 3001)
- [x] База данных SQLite инициализирована
- [x] Nginx конфигурация создана
- [x] SSL сертификаты настроены
- [x] Health checks работают
- [x] API endpoints доступны
- [x] Существующие сайты не затронуты

---

## 🎊 Готово!

Ваш проект **Asteum Process Flow** успешно развернут и работает на:

```
🌐 https://asteum.ru/process
```

**Все сервисы работают параллельно с существующими сайтами!** ✨

---

_Дата деплоя: 2 октября 2025_  
_Время: 12:49 UTC_
