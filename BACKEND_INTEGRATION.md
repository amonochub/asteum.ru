# 🔌 Backend Integration Guide

> Полная интеграция Frontend + Backend для Asteum Process Flow  
> Дата: 2 октября 2025

---

## ✅ Что создано

### Backend API

- ✅ **Node.js + Express + TypeScript**
- ✅ **SQLite** база данных
- ✅ **REST API** endpoints
- ✅ **Docker** ready
- ✅ **Production** ready

### Структура

```
backend/
├── src/
│   ├── index.ts           # Entry point
│   ├── config.ts          # Configuration
│   ├── database/          # SQLite setup
│   ├── models/            # User, Process models
│   ├── routes/            # API routes
│   └── middleware/        # Error handling
├── data/                  # SQLite database
├── Dockerfile
├── package.json
└── README.md
```

---

## 🚀 Быстрый старт

### 1. Backend

```bash
cd backend

# Установить зависимости
npm install

# Создать .env
cp .env.example .env

# Запустить dev сервер
npm run dev
```

Backend доступен на `http://localhost:3000`

### 2. Frontend

```bash
# В корне проекта
npm run dev
```

Frontend доступен на `http://localhost:8080`

---

## 📋 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### Users API

| Method | Endpoint     | Описание                    |
| ------ | ------------ | --------------------------- |
| GET    | `/users`     | Получить всех пользователей |
| GET    | `/users/:id` | Получить пользователя по ID |
| POST   | `/users`     | Создать пользователя        |
| PATCH  | `/users/:id` | Обновить пользователя       |
| DELETE | `/users/:id` | Удалить пользователя        |

### Processes API

| Method | Endpoint              | Описание               |
| ------ | --------------------- | ---------------------- |
| GET    | `/processes`          | Получить все процессы  |
| GET    | `/processes?user_id=` | Процессы пользователя  |
| GET    | `/processes/:id`      | Получить процесс по ID |
| POST   | `/processes`          | Создать процесс        |
| PATCH  | `/processes/:id`      | Обновить процесс       |
| DELETE | `/processes/:id`      | Удалить процесс        |

### Health Check

```bash
GET /health
```

---

## 💻 Использование в React

### 1. Базовый fetch

```typescript
import { env } from '@/config/env'

async function fetchUsers() {
  const response = await fetch(`${env.api.url}/api/v1/users`)
  const data = await response.json()
  return data
}
```

### 2. С error handling

```typescript
async function createUser(userData: { email: string; name: string }) {
  try {
    const response = await fetch(`${env.api.url}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
```

### 3. Custom hook (рекомендуется)

```typescript
// hooks/useApi.ts
import { env } from '@/config/env';

export function useApi() {
  const baseUrl = `${env.api.url}/api/v1`;

  async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed`);
    }
    const data = await response.json();
    return data.data;
  }

  async function post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed`);
    }
    const data = await response.json();
    return data.data;
  }

  return { get, post };
}

// В компоненте
function MyComponent() {
  const api = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then(setUsers);
  }, []);

  return <div>{/* ... */}</div>;
}
```

---

## 🐳 Docker Development

### Запуск всего стека

```bash
# Build и запуск frontend + backend
docker-compose -f docker-compose.full.yml up -d

# Проверить логи
docker-compose -f docker-compose.full.yml logs -f

# Остановить
docker-compose -f docker-compose.full.yml down
```

Доступно:

- Frontend: `http://localhost` (порт 80)
- Backend API: `http://localhost:3000`
- API через nginx: `http://localhost/api/v1`

---

## 🚀 Production Deployment

### На сервере (89.169.38.246)

```bash
# 1. Загрузить весь проект
rsync -avz . user@89.169.38.246:/opt/asteum/

# 2. На сервере запустить
ssh user@89.169.38.246
cd /opt/asteum
docker-compose -f docker-compose.full.yml up -d

# 3. Проверить
curl https://asteum.ru/health
curl https://asteum.ru/api/health
```

### Структура на production

```
https://asteum.ru/              → Frontend (React)
https://asteum.ru/api/v1/users  → Backend API
https://asteum.ru/api/health    → Backend health
https://asteum.ru/health        → Frontend health
```

---

## 📝 Примеры использования

### Example 1: Получить пользователей

```bash
curl http://localhost:3000/api/v1/users
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": 1696262400000,
      "updated_at": 1696262400000
    }
  ]
}
```

### Example 2: Создать пользователя

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "Jane Smith"
  }'
```

### Example 3: Создать процесс

```bash
curl -X POST http://localhost:3000/api/v1/processes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Автоматизация отчетов",
    "description": "Ежедневная генерация",
    "user_id": "USER_UUID_HERE"
  }'
```

---

## 🗄️ База данных

### Схема

```sql
-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Processes
CREATE TABLE processes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Process Steps
CREATE TABLE process_steps (
  id TEXT PRIMARY KEY,
  process_id TEXT NOT NULL,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (process_id) REFERENCES processes(id)
);

-- Logs
CREATE TABLE logs (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata TEXT,
  created_at INTEGER NOT NULL
);
```

### Доступ к базе

```bash
cd backend
npm install -g sqlite3

# Открыть базу
sqlite3 data/asteum.db

# Примеры запросов
SELECT * FROM users;
SELECT * FROM processes;
```

---

## 🔐 Безопасность

### Реализовано

- ✅ **Helmet** - HTTP security headers
- ✅ **CORS** - настроен для frontend
- ✅ **Validation** - Zod schema validation
- ✅ **SQL Injection** - Prepared statements
- ✅ **Error handling** - Graceful errors
- ✅ **Environment variables** - Секреты в .env

### Рекомендации

1. **Rate limiting** - добавить для API
2. **Authentication** - JWT токены
3. **Authorization** - Role-based access
4. **HTTPS only** - в production
5. **Database encryption** - для чувствительных данных

---

## 🧪 Тестирование

### Backend tests

```bash
cd backend
npm run test
npm run test:coverage
```

### Integration tests

```bash
# Запустить backend
cd backend && npm run dev

# В другом терминале - frontend E2E
npm run test:e2e
```

---

## 📊 Мониторинг

### Health Checks

```bash
# Backend
curl http://localhost:3000/health

# Frontend через nginx
curl http://localhost/health

# API через nginx
curl http://localhost/api/health
```

### Логи

```bash
# Docker logs
docker logs asteum-backend
docker logs asteum-app

# Backend logs (если не Docker)
cd backend && npm run dev
# Видно в консоли
```

---

## 🔧 Troubleshooting

### Backend не запускается?

```bash
cd backend
npm install
npm run build
npm start
```

### CORS ошибки?

Проверить `backend/.env`:

```env
CORS_ORIGIN=http://localhost:8080
```

### База данных не создается?

```bash
cd backend
rm -rf data/  # Удалить старую базу
npm run dev   # Создастся автоматически
```

### Frontend не подключается к API?

Проверить `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## 📚 Документация

### Backend

- **backend/README.md** - Детальная backend документация

### Frontend

- **README.md** - Главный README проекта
- **TECH_STACK_BEST_PRACTICES.md** - Best practices

### Deployment

- **DEPLOYMENT_FINAL.md** - Полная инструкция по деплою
- **BACKEND_INTEGRATION.md** - Этот файл

---

## 🎯 Следующие шаги

### Priority 1 (Критично)

1. [ ] Добавить authentication (JWT)
2. [ ] Настроить rate limiting
3. [ ] Добавить database backups

### Priority 2 (Важно)

1. [ ] Добавить API documentation (Swagger/OpenAPI)
2. [ ] Настроить logging (Winston/Pino)
3. [ ] Добавить monitoring (PM2/Prometheus)

### Priority 3 (Желательно)

1. [ ] WebSocket support для real-time
2. [ ] Caching (Redis)
3. [ ] Background jobs (Bull/BullMQ)

---

## 🎉 Готово!

**Backend API полностью готов к интеграции!**

✅ **API**: REST endpoints  
✅ **Database**: SQLite  
✅ **Docker**: Full stack  
✅ **Security**: Basic headers  
✅ **CORS**: Configured  
✅ **Validation**: Zod schemas  
✅ **TypeScript**: Strict mode  
✅ **Documentation**: Complete

**Можно начинать разработку!** 🚀

---

_Создано: 2 октября 2025_  
_Версия: 1.0.0_  
_Проект: Asteum Process Flow_
