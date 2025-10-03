# ⚡ Быстрая проверка деплоя

## Проверить что все работает:

```bash
# 1. Frontend
curl -k https://asteum.ru/process-health

# 2. Backend
curl -k https://asteum.ru/process-api/health

# 3. API Users
curl -k https://asteum.ru/process-api/api/v1/users

# 4. Открыть в браузере
open https://asteum.ru/process
```

## Ожидаемые результаты:

1. Frontend: `healthy`
2. Backend: `{"success":true,"status":"healthy",...}`
3. API: `{"success":true,"data":[]}`
4. Браузер: Открывается приложение Process Flow

---

✅ Если все работает - деплой успешен!
