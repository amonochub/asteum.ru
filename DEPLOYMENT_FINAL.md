# 🚀 Final Deployment Guide - asteum.ru

## ✅ SSL Сертификаты проверены и готовы!

**Домен**: asteum.ru  
**IP**: 89.169.38.246  
**SSL**: GlobalSign GCC R3 DV TLS CA 2020  
**Срок действия**: до 24 марта 2026 года ✅

---

## 📦 Что готово

### ✅ SSL Configuration

```
SSL/
├── certificate-2.crt      ✅ CN=www.asteum.ru
├── certificate-2.key      ✅ Приватный ключ (проверен)
├── certificate_ca.crt     ✅ GlobalSign цепочка
└── certificate-2.csr      ✅ CSR файл
```

### ✅ Project без Supabase

- Удалены зависимости: `@supabase/supabase-js`, `@tanstack/react-query`
- Обновлен `App.tsx` - убран QueryClientProvider
- Обновлен `.env.example` - без Supabase переменных
- Обновлен `src/config/env.ts` - без Supabase конфига

### ✅ Docker Production

- `Dockerfile.production` - без Supabase переменных
- `docker-compose.production.yml` - упрощенная версия
- `nginx-ssl.conf` - настроен для ваших сертификатов

---

## ⚡ Деплой за 3 команды

### На локальной машине:

```bash
# 1. Создать .env.production (если нужен API)
cat > .env.production << 'EOF'
VITE_APP_ENV=production
# VITE_API_URL=http://localhost:3000  # Если нужен backend
EOF

# 2. Загрузить на сервер
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . user@89.169.38.246:/opt/asteum/

# 3. На сервере запустить
ssh user@89.169.38.246 'cd /opt/asteum && docker-compose -f docker-compose.production.yml up -d'
```

### Или прямо на сервере:

```bash
ssh user@89.169.38.246

cd /opt/asteum  # или mkdir -p /opt/asteum && cd /opt/asteum

# Загрузить код (если еще не сделано)
# git clone ... или rsync ...

# Запустить
docker-compose -f docker-compose.production.yml up -d

# Проверить
docker-compose -f docker-compose.production.yml logs -f
```

---

## ✅ Проверка

```bash
# 1. Контейнер работает
docker ps | grep asteum
# Ожидается: asteum-app

# 2. Health check
curl https://asteum.ru/health
# Ожидается: "healthy"

# 3. HTTPS работает
curl -I https://asteum.ru
# Ожидается: HTTP/2 200

# 4. HTTP редирект
curl -I http://asteum.ru
# Ожидается: 301

# 5. SSL валиден
openssl s_client -connect asteum.ru:443 -servername asteum.ru < /dev/null
# Проверить: verify return code: 0 (ok)
```

### В браузере:

1. Откройте https://asteum.ru
2. ✅ Зеленый замок SSL
3. ✅ Сайт загружается
4. ✅ Нет ошибок в Console (F12)
5. ✅ Все страницы работают (/, /edu)

---

## 🔧 Полезные команды

```bash
# Логи
docker-compose -f docker-compose.production.yml logs -f

# Перезапуск
docker-compose -f docker-compose.production.yml restart

# Остановка
docker-compose -f docker-compose.production.yml down

# Пересборка (после изменений)
docker-compose -f docker-compose.production.yml up -d --build

# Проверка nginx
docker exec asteum-app nginx -t

# Просмотр SSL файлов
docker exec asteum-app ls -la /etc/nginx/ssl/

# Проверка процессов
docker exec asteum-app ps aux
```

---

## 📊 SSL Certificate Info

```
Subject: CN=www.asteum.ru
Issuer: GlobalSign GCC R3 DV TLS CA 2020
Valid from: Aug 22 13:35:19 2025 GMT
Valid until: Mar 24 13:35:19 2026 GMT
Status: ✅ VALID (проверено)
```

---

## 🛡️ Security Features

Реализовано:

- ✅ **HTTPS обязательный** - HTTP редирект на HTTPS
- ✅ **HSTS** - Strict-Transport-Security
- ✅ **Security Headers** - XSS, CSP, X-Frame-Options
- ✅ **Modern SSL** - TLS 1.2/1.3 only
- ✅ **Strong Ciphers** - Только безопасные
- ✅ **OCSP Stapling** - Включен
- ✅ **GlobalSign CA** - Надежный сертификат

---

## 🎯 Performance

Nginx настройки:

- ✅ **Gzip compression** - для всех текстовых файлов
- ✅ **Cache** - 1 год для статических файлов
- ✅ **SPA routing** - поддержка React Router
- ✅ **Health check** - автоматический (каждые 30 сек)

---

## 📞 Troubleshooting

### Сайт не открывается?

```bash
# Проверить DNS
nslookup asteum.ru
dig asteum.ru

# Проверить контейнер
docker ps | grep asteum

# Проверить логи
docker logs asteum-app

# Проверить порты
netstat -tulpn | grep -E ':80|:443'
```

### SSL ошибка?

```bash
# Проверить сертификаты в контейнере
docker exec asteum-app ls -la /etc/nginx/ssl/

# Проверить nginx конфигурацию
docker exec asteum-app nginx -t

# Проверить логи nginx
docker exec asteum-app tail -f /var/log/nginx/error.log
```

### 502 Bad Gateway?

```bash
# Приложение не запустилось - проверить логи
docker logs asteum-app

# Проверить процессы
docker exec asteum-app ps aux
```

---

## 🔄 Обновление сайта

```bash
# Загрузить новый код
cd /opt/asteum
git pull  # или rsync

# Пересобрать и перезапустить
docker-compose -f docker-compose.production.yml up -d --build

# Проверить
curl https://asteum.ru/health
```

---

## 📋 Checklist перед Go Live

- [x] SSL сертификаты на месте
- [x] SSL сертификаты проверены (валидны)
- [x] nginx-ssl.conf настроен
- [x] docker-compose.production.yml готов
- [x] Supabase зависимости удалены
- [x] App.tsx обновлен
- [x] DNS настроен (asteum.ru → 89.169.38.246)
- [ ] Код загружен на сервер
- [ ] Docker запущен
- [ ] Сайт открывается в браузере
- [ ] SSL Labs проверка пройдена

---

## 🎉 Go Live!

Все готово к запуску! Выполните:

```bash
# На сервере
cd /opt/asteum
docker-compose -f docker-compose.production.yml up -d

# Подождите 10-15 секунд и проверьте
curl https://asteum.ru/health

# Если "healthy" - все работает! 🎉
```

Откройте в браузере: **https://asteum.ru**

---

## 📈 Мониторинг

### Online проверки после деплоя:

1. **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=asteum.ru
   - Ожидается: A или A+

2. **Lighthouse** (Chrome DevTools):
   - Performance: >= 90
   - Accessibility: >= 90
   - Best Practices: >= 90
   - SEO: >= 90

3. **Mobile-Friendly**: https://search.google.com/test/mobile-friendly

---

## 🎯 Итог

### ✅ Готово:

- SSL сертификаты проверены и настроены
- Supabase удален из проекта
- Docker конфигурация упрощена
- Nginx настроен с вашими сертификатами
- Документация обновлена

### Следующий шаг:

```bash
# Загрузить на сервер и запустить
rsync -avz . user@89.169.38.246:/opt/asteum/
ssh user@89.169.38.246 'cd /opt/asteum && docker-compose -f docker-compose.production.yml up -d'
```

---

**🚀 Проект готов к production!**

SSL: ✅ GlobalSign (до марта 2026)  
Domain: ✅ asteum.ru → 89.169.38.246  
Code: ✅ Без внешних зависимостей  
Docker: ✅ Production ready

**Удачи с запуском!** 🎊
