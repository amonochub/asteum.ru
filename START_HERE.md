# 🚀 START HERE - Деплой на asteum.ru

## ✅ Все готово к запуску!

**Домен**: asteum.ru  
**IP**: 89.169.38.246  
**SSL**: GlobalSign (до марта 2026) ✅  
**Код**: Без внешних зависимостей ✅

---

## 🎯 Что сделано

### ✅ Код полностью готов

- Supabase удален
- React Query удален
- App.tsx упрощен
- Зависимости обновлены
- TypeScript strict mode
- Все тесты настроены

### ✅ SSL сертификаты готовы

```
SSL/
├── certificate-2.crt      ✅ CN=www.asteum.ru
├── certificate-2.key      ✅ Приватный ключ
├── certificate_ca.crt     ✅ GlobalSign цепочка
```

### ✅ Docker готов

- nginx-ssl.conf настроен
- docker-compose.production.yml готов
- Dockerfile.production готов

### ✅ Документация готова

- DEPLOYMENT_FINAL.md - полная инструкция
- QUICK_DEPLOY.md - быстрый старт
- 6 других гайдов по деплою

---

## ⚡ Деплой за 3 шага

### Шаг 1: Загрузить на сервер

```bash
# Из локальной машины
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . user@89.169.38.246:/opt/asteum/
```

### Шаг 2: Запустить на сервере

```bash
# Подключиться к серверу
ssh user@89.169.38.246

# Перейти в папку
cd /opt/asteum

# Запустить Docker
docker-compose -f docker-compose.production.yml up -d

# Посмотреть логи
docker-compose -f docker-compose.production.yml logs -f
```

### Шаг 3: Проверить

```bash
# Health check
curl https://asteum.ru/health

# Если ответ "healthy" - все работает! ✅
```

Откройте в браузере: **https://asteum.ru**

---

## 📋 Быстрая проверка

После запуска проверьте:

```bash
# 1. Контейнер запущен?
docker ps | grep asteum
# Должен быть: asteum-app

# 2. Порты слушаются?
netstat -tulpn | grep -E ':80|:443'
# Должны быть: 0.0.0.0:80 и 0.0.0.0:443

# 3. HTTPS работает?
curl -I https://asteum.ru
# HTTP/2 200 OK

# 4. HTTP редирект?
curl -I http://asteum.ru
# 301 Moved Permanently → https://asteum.ru

# 5. SSL валиден?
openssl s_client -connect asteum.ru:443 -servername asteum.ru < /dev/null 2>/dev/null | grep "Verify return"
# Verify return code: 0 (ok)
```

---

## 🎨 В браузере

1. Откройте https://asteum.ru
2. ✅ Зеленый замок SSL
3. ✅ Сайт загружается
4. ✅ Нет ошибок в Console (F12)
5. ✅ Страницы работают: `/` и `/edu`

---

## 🔧 Полезные команды

```bash
# Просмотр логов
docker-compose -f docker-compose.production.yml logs -f

# Перезапуск
docker-compose -f docker-compose.production.yml restart

# Остановка
docker-compose -f docker-compose.production.yml down

# Обновление (после изменений)
docker-compose -f docker-compose.production.yml up -d --build
```

---

## 📚 Документация

Если нужны детали:

| Файл                        | Описание                        |
| --------------------------- | ------------------------------- |
| **START_HERE.md**           | Этот файл - быстрый старт ⭐    |
| **DEPLOYMENT_FINAL.md**     | Финальная инструкция с деталями |
| **QUICK_DEPLOY.md**         | Деплой за 5 минут               |
| **DEPLOYMENT_CHECKLIST.md** | Полный чеклист                  |

---

## ⚠️ Если что-то не работает

### Сайт не открывается?

```bash
docker ps | grep asteum
docker logs asteum-app
```

### SSL ошибка?

```bash
docker exec asteum-app ls -la /etc/nginx/ssl/
docker exec asteum-app nginx -t
```

### 502 Error?

```bash
docker logs asteum-app
docker exec asteum-app ps aux
```

См. раздел Troubleshooting в `DEPLOYMENT_FINAL.md`

---

## 🎉 Готово!

Все готово к запуску. Просто выполните 3 команды выше и сайт будет live на **https://asteum.ru**!

**Удачи! 🚀**

---

_Последнее обновление: 2 октября 2025_  
_SSL проверен, код готов, можно запускать!_
