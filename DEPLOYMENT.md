# 🚀 Production Deployment Guide - asteum.ru

## 📋 Предварительные требования

- [x] Домен asteum.ru настроен (DNS записи)
- [x] SSL сертификат получен
- [ ] Docker и Docker Compose установлены на сервере
- [ ] Доступ к серверу по SSH (89.169.38.246)

---

## 🔐 Подготовка SSL сертификатов

### 1. Положите SSL файлы в папку SSL/

Вам нужны следующие файлы:

- `certificate.crt` - SSL сертификат
- `private.key` - Приватный ключ
- `ca_bundle.crt` - Цепочка (опционально)

См. подробности в `SSL/README.md`

### 2. Проверьте сертификат

```bash
# Проверка что сертификат валиден
openssl x509 -in SSL/certificate.crt -text -noout

# Проверка соответствия ключа и сертификата
openssl x509 -noout -modulus -in SSL/certificate.crt | openssl md5
openssl rsa -noout -modulus -in SSL/private.key | openssl md5
```

---

## 🌍 Настройка переменных окружения

### 1. Создайте .env.production

```bash
cat > .env.production << 'EOF'
# Supabase (ваши реальные значения)
VITE_SUPABASE_URL=https://giuuggbyekudrlkkjyzq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_real_key_here

# App Environment
VITE_APP_ENV=production

# Optional: Analytics
# VITE_GA_TRACKING_ID=
# VITE_YM_TRACKING_ID=

# Optional: Sentry
# VITE_SENTRY_DSN=
# VITE_SENTRY_ENVIRONMENT=production
EOF
```

### 2. Проверьте .gitignore

Убедитесь что `.env.production` в `.gitignore`:

```bash
grep ".env.production" .gitignore
```

---

## 🐳 Локальная проверка перед деплоем

### 1. Соберите production build локально

```bash
# Build
npm run build

# Preview
npm run preview
```

### 2. Проверьте Docker образ

```bash
# Собрать образ
docker build -t asteum-app:test .

# Запустить локально (без SSL)
docker run -p 8080:80 asteum-app:test

# Открыть http://localhost:8080
```

---

## 🚢 Деплой на сервер

### Метод 1: Docker Compose (рекомендуется)

#### 1. Скопируйте проект на сервер

```bash
# Из локальной машины
rsync -avz --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.git' \
  . user@89.169.38.246:/opt/asteum/
```

#### 2. На сервере установите зависимости

```bash
ssh user@89.169.38.246

cd /opt/asteum/

# Если нужно, установите Docker
# curl -fsSL https://get.docker.com | sh
# sudo usermod -aG docker $USER
```

#### 3. Создайте .env.production на сервере

```bash
nano .env.production
# Заполните реальными значениями
```

#### 4. Запустите приложение

```bash
# Production деплой с SSL
docker-compose -f docker-compose.production.yml up -d

# Проверка логов
docker-compose -f docker-compose.production.yml logs -f

# Проверка статуса
docker-compose -f docker-compose.production.yml ps
```

#### 5. Проверьте работу

```bash
# Локальная проверка
curl http://localhost/health

# Проверка с домена
curl https://asteum.ru/health

# Проверка SSL
openssl s_client -connect asteum.ru:443 -servername asteum.ru
```

### Метод 2: Manual Docker Commands

```bash
# Build
docker build -t asteum-app \
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
  -f Dockerfile.production .

# Run
docker run -d \
  --name asteum-app \
  -p 80:80 \
  -p 443:443 \
  -v $(pwd)/SSL:/etc/nginx/ssl:ro \
  -v $(pwd)/nginx-ssl.conf:/etc/nginx/conf.d/default.conf:ro \
  --restart unless-stopped \
  asteum-app
```

---

## 🔍 Проверка и мониторинг

### Проверка что всё работает

```bash
# 1. HTTP → HTTPS редирект
curl -I http://asteum.ru

# 2. HTTPS работает
curl -I https://asteum.ru

# 3. WWW редирект
curl -I https://www.asteum.ru

# 4. Health check
curl https://asteum.ru/health

# 5. SSL рейтинг
# Проверьте на https://www.ssllabs.com/ssltest/analyze.html?d=asteum.ru
```

### Мониторинг логов

```bash
# Все логи
docker-compose -f docker-compose.production.yml logs -f

# Только ошибки
docker-compose -f docker-compose.production.yml logs -f | grep error

# Последние 100 строк
docker-compose -f docker-compose.production.yml logs --tail=100
```

---

## 🔄 Обновление приложения

### Zero-downtime deployment

```bash
# 1. Загрузить новый код
git pull origin main

# 2. Собрать новый образ
docker-compose -f docker-compose.production.yml build

# 3. Обновить контейнер
docker-compose -f docker-compose.production.yml up -d

# Docker автоматически создаст новый контейнер и переключит трафик
```

### Откат к предыдущей версии

```bash
# Список образов
docker images asteum-app

# Остановить текущий
docker-compose -f docker-compose.production.yml down

# Запустить старый образ (замените TAG на нужный)
docker tag asteum-app:TAG asteum-app:latest
docker-compose -f docker-compose.production.yml up -d
```

---

## 🛡️ Security Checklist

### После деплоя проверьте:

- [ ] ✅ HTTPS работает
- [ ] ✅ HTTP редиректит на HTTPS
- [ ] ✅ WWW редиректит на основной домен
- [ ] ✅ Security headers присутствуют
- [ ] ✅ SSL сертификат валиден и не истек
- [ ] ✅ Нет console errors в браузере
- [ ] ✅ CORS настроен правильно для Supabase
- [ ] ✅ Environment variables не утекают в клиент
- [ ] ✅ Source maps не доступны в production
- [ ] ✅ SSL Labs рейтинг A или A+

### Проверка Security Headers

```bash
curl -I https://asteum.ru | grep -E "Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|Content-Security-Policy"
```

Ожидаемый результат:

```
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: SAMEORIGIN
x-content-type-options: nosniff
content-security-policy: default-src 'self' https:; ...
```

---

## 🔧 Troubleshooting

### Проблема: Сайт не открывается

```bash
# 1. Проверить что контейнер запущен
docker ps | grep asteum

# 2. Проверить логи
docker logs asteum-app

# 3. Проверить nginx внутри контейнера
docker exec asteum-app nginx -t

# 4. Проверить порты
netstat -tulpn | grep -E '80|443'
```

### Проблема: SSL ошибка

```bash
# 1. Проверить что сертификаты смонтированы
docker exec asteum-app ls -la /etc/nginx/ssl/

# 2. Проверить nginx конфигурацию
docker exec asteum-app cat /etc/nginx/conf.d/default.conf

# 3. Проверить логи nginx
docker exec asteum-app cat /var/log/nginx/error.log
```

### Проблема: 502 Bad Gateway

```bash
# Обычно означает что приложение не запустилось
docker logs asteum-app
docker exec asteum-app ps aux
```

### Проблема: Supabase не подключается

```bash
# 1. Проверить переменные окружения
docker exec asteum-app env | grep VITE_

# 2. Проверить в browser console
# Откройте https://asteum.ru и посмотрите Network tab

# 3. Проверить CORS в Supabase
# Dashboard → Settings → API → CORS
# Добавьте https://asteum.ru
```

---

## 📊 Мониторинг и метрики

### Настройка автозапуска

```bash
# Docker настроен на автозапуск (restart: unless-stopped)
# Но можно также добавить systemd service

cat > /etc/systemd/system/asteum.service << 'EOF'
[Unit]
Description=Asteum App
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/asteum
ExecStart=/usr/bin/docker-compose -f docker-compose.production.yml up -d
ExecStop=/usr/bin/docker-compose -f docker-compose.production.yml down

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable asteum
sudo systemctl start asteum
```

### Логи и аналитика

```bash
# Экспорт логов
docker logs asteum-app > /var/log/asteum/app.log

# Ротация логов (добавить в cron)
# 0 0 * * * docker logs asteum-app >> /var/log/asteum/app-$(date +\%Y\%m\%d).log 2>&1
```

---

## 🔄 Backup и Recovery

### Backup перед обновлением

```bash
# 1. Backup текущего образа
docker commit asteum-app asteum-app:backup-$(date +%Y%m%d)

# 2. Backup конфигураций
tar -czf asteum-backup-$(date +%Y%m%d).tar.gz \
  nginx-ssl.conf \
  docker-compose.production.yml \
  .env.production

# 3. Backup SSL (если меняются)
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz SSL/
```

### Recovery

```bash
# Восстановить из backup образа
docker tag asteum-app:backup-20251002 asteum-app:latest
docker-compose -f docker-compose.production.yml up -d
```

---

## 📞 Support

При проблемах:

1. Проверьте логи: `docker-compose -f docker-compose.production.yml logs`
2. Проверьте Troubleshooting секцию выше
3. Создайте Issue в GitHub с логами

---

## ✅ Post-Deployment Checklist

После успешного деплоя:

- [ ] Сайт открывается по https://asteum.ru
- [ ] SSL сертификат валиден
- [ ] Все страницы работают (/, /edu)
- [ ] Supabase подключение работает
- [ ] Мобильная версия отображается корректно
- [ ] Performance (Lighthouse) >= 90
- [ ] Security headers на месте
- [ ] Настроена аналитика (если нужно)
- [ ] Настроен мониторинг (если нужно)
- [ ] Документация обновлена
- [ ] Команда проинформирована

---

**🎉 Поздравляем с успешным деплоем!**

Сайт доступен по адресу: **https://asteum.ru**
