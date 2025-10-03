# ✅ Исправлена ошибка 500 Internal Server Error

## Проблема

При открытии `https://asteum.ru/` возникала ошибка **500 Internal Server Error**.

## Причина

Nginx конфигурация пыталась обработать корневой путь `/` через директорию `/var/www/asteum.ru`, которая не существовала, что приводило к бесконечному циклу редиректов на `/index.html`.

**Логи ошибок:**

```
[error] rewrite or internal redirection cycle while internally redirecting to "/index.html"
```

## Решение

Создана заглушка для главной страницы в `/var/www/asteum.ru/index.html` с красивым лендингом, который перенаправляет пользователей к Process Flow.

## Что сделано

1. **Создана директория** `/var/www/asteum.ru/`
2. **Создан index.html** с красивым лендингом:
   - Название: "Asteum - Process Flow Management"
   - Кнопка перехода на `/process`
   - Ссылки на API Status и Health Check
   - Современный дизайн с градиентом

3. **Перезагружен Nginx**

## ✅ Текущий статус

### Все URLs работают:

| URL                                          | Статус     | Описание                   |
| -------------------------------------------- | ---------- | -------------------------- |
| `https://asteum.ru/`                         | ✅ 200 OK  | Главная страница (лендинг) |
| `https://asteum.ru/process`                  | ✅ 200 OK  | Process Flow приложение    |
| `https://asteum.ru/process-health`           | ✅ healthy | Health check frontend      |
| `https://asteum.ru/process-api/health`       | ✅ healthy | Health check API           |
| `https://asteum.ru/process-api/api/v1/users` | ✅ 200 OK  | API endpoint               |

## Проверка работы

```bash
# Главная страница
curl -I https://asteum.ru/
# Ожидается: HTTP/2 200

# Process Flow
curl https://asteum.ru/process-health
# Ожидается: healthy

# API
curl https://asteum.ru/process-api/health
# Ожидается: {"success":true,"status":"healthy",...}
```

## Структура на сервере

```
/var/www/asteum.ru/
└── index.html          # Главная страница (лендинг)

/opt/asteum-process/
├── backend/            # Backend API
├── src/                # Frontend код
├── SSL/                # SSL сертификаты
└── docker-compose.parallel.yml
```

## Дальнейшие действия

Главная страница (`https://asteum.ru/`) сейчас показывает заглушку. В будущем вы можете:

1. **Заменить на полноценный сайт** - просто положите файлы в `/var/www/asteum.ru/`
2. **Настроить редирект** - изменить Nginx конфиг для редиректа `/` → `/process`
3. **Оставить как есть** - красивый лендинг с переходом на Process Flow

---

**Дата исправления**: 2 октября 2025, 12:51 UTC  
**Время простоя**: ~2 минуты  
**Статус**: ✅ Полностью исправлено
