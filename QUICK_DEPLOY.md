# ⚡ Quick Deploy Guide - asteum.ru

> Быстрая инструкция для деплоя на production

## 🚀 За 5 минут

### Шаг 1: Подготовьте SSL сертификаты

```bash
# Положите в папку SSL:
# - certificate.crt (сертификат)
# - private.key (приватный ключ)
# - ca_bundle.crt (опционально)

ls SSL/
# Должны увидеть: certificate.crt, private.key
```

### Шаг 2: Создайте .env.production

```bash
cat > .env.production << 'EOF'
VITE_SUPABASE_URL=https://giuuggbyekudrlkkjyzq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=ваш_ключ_здесь
VITE_APP_ENV=production
EOF
```

### Шаг 3: Деплой!

```bash
# Если на локальной машине - загрузить на сервер
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . user@89.169.38.246:/opt/asteum/

# На сервере
ssh user@89.169.38.246
cd /opt/asteum/

# Запуск
docker-compose -f docker-compose.production.yml up -d
```

### Шаг 4: Проверка

```bash
# Проверить что всё работает
curl https://asteum.ru/health

# Открыть в браузере
# https://asteum.ru
```

## ✅ Готово!

Ваш сайт работает на **https://asteum.ru**

---

## 📚 Полная документация

Для детального изучения см. [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 Частые команды

```bash
# Просмотр логов
docker-compose -f docker-compose.production.yml logs -f

# Перезапуск
docker-compose -f docker-compose.production.yml restart

# Остановка
docker-compose -f docker-compose.production.yml down

# Обновление
git pull
docker-compose -f docker-compose.production.yml up -d --build
```

## ⚠️ Troubleshooting

### Сайт не открывается?

```bash
# Проверить контейнер
docker ps | grep asteum

# Проверить логи
docker logs asteum-app
```

### SSL ошибка?

```bash
# Проверить сертификаты
docker exec asteum-app ls -la /etc/nginx/ssl/

# Проверить nginx
docker exec asteum-app nginx -t
```

---

**Нужна помощь?** См. [DEPLOYMENT.md](./DEPLOYMENT.md) для полной инструкции.
