# Asteum Backend API

> REST API для Asteum Process Flow  
> Node.js + Express + TypeScript + SQLite

---

## 🚀 Быстрый старт

### Установка

```bash
# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Запустить dev сервер
npm run dev
```

Сервер запустится на `http://localhost:3000`

---

## 📋 API Endpoints

### Health Check

```bash
GET /health
```

### Users

```bash
GET    /api/v1/users         # Получить всех пользователей
GET    /api/v1/users/:id     # Получить пользователя по ID
POST   /api/v1/users         # Создать пользователя
PATCH  /api/v1/users/:id     # Обновить пользователя
DELETE /api/v1/users/:id     # Удалить пользователя
```

### Processes

```bash
GET    /api/v1/processes           # Получить все процессы
GET    /api/v1/processes?user_id=  # Получить процессы пользователя
GET    /api/v1/processes/:id       # Получить процесс по ID
POST   /api/v1/processes           # Создать процесс
PATCH  /api/v1/processes/:id       # Обновить процесс
DELETE /api/v1/processes/:id       # Удалить процесс
```

---

## 📖 Примеры

### Создать пользователя

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

### Создать процесс

```bash
curl -X POST http://localhost:3000/api/v1/processes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Автоматизация отчетов",
    "description": "Ежедневная генерация отчетов",
    "user_id": "USER_ID_HERE"
  }'
```

---

## 🛠️ Разработка

```bash
# Dev сервер с hot reload
npm run dev

# Build для production
npm run build

# Запуск production
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Тестирование
npm run test
npm run test:coverage
```

---

## 🗄️ База данных

Используется **SQLite** для простоты и портативности.

### Схема

- **users** - пользователи
- **processes** - бизнес-процессы
- **process_steps** - шаги процессов
- **logs** - логи системы

База создается автоматически при первом запуске в `data/asteum.db`

---

## 🐳 Docker

### Development

```bash
# Build
docker build -t asteum-backend .

# Run
docker run -p 3000:3000 asteum-backend
```

### Production

```bash
# Build
docker build -f Dockerfile -t asteum-backend:latest .

# Run
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name asteum-backend \
  asteum-backend:latest
```

---

## ⚙️ Конфигурация

Все настройки через переменные окружения в `.env`:

```env
NODE_ENV=development
PORT=3000
HOST=localhost
DATABASE_PATH=./data/asteum.db
CORS_ORIGIN=http://localhost:8080
API_PREFIX=/api/v1
```

---

## 🔗 Интеграция с Frontend

### 1. Обновить frontend env

```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
```

### 2. Использовать в React

```typescript
import { env } from '@/config/env'

const response = await fetch(`${env.api.url}/api/v1/users`)
const data = await response.json()
```

---

## 📦 Структура проекта

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── config.ts             # Configuration
│   ├── database/
│   │   └── index.ts          # Database setup
│   ├── models/
│   │   ├── User.ts           # User model
│   │   └── Process.ts        # Process model
│   ├── routes/
│   │   ├── users.ts          # User routes
│   │   └── processes.ts      # Process routes
│   └── middleware/
│       └── errorHandler.ts   # Error handling
├── data/                     # SQLite database
├── dist/                     # Build output
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

---

## 🚀 Деплой на сервер

### 1. Подготовка

```bash
# На сервере создать директорию
mkdir -p /opt/asteum/backend
cd /opt/asteum/backend
```

### 2. Загрузить код

```bash
# С локальной машины
rsync -avz backend/ user@89.169.38.246:/opt/asteum/backend/
```

### 3. Запустить

```bash
# На сервере
cd /opt/asteum/backend
npm install
npm run build
npm start

# Или через PM2
npm install -g pm2
pm2 start dist/index.js --name asteum-backend
pm2 save
```

### 4. Nginx proxy

```nginx
# В nginx.conf добавить
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## 🔐 Безопасность

- ✅ Helmet для HTTP headers
- ✅ CORS настроен
- ✅ Input validation (Zod)
- ✅ SQL injection защита (prepared statements)
- ✅ Error handling
- ✅ Environment variables

---

## 📊 Мониторинг

Health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-02T...",
  "environment": "development"
}
```

---

## 🤝 Contributing

1. Fork репозиторий
2. Создать feature ветку
3. Сделать изменения
4. Commit с Conventional Commits
5. Push и создать PR

---

## 📝 Лицензия

MIT License

---

**Создано для Asteum Process Flow**  
**Version**: 1.0.0
