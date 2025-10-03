# ⚡ Быстрый параллельный деплой - 5 команд

> Запуск на сервере параллельно с существующим сайтом

---

## 🎯 Что получится

```
Существующий сайт: https://asteum.ru (не трогаем)
Новый проект:      https://app.asteum.ru
```

---

## ⚡ 5 команд

### 1️⃣ Настроить DNS (один раз)

В панели управления DNS добавить:

```
A запись: app.asteum.ru → 89.169.38.246
```

Проверить:

```bash
nslookup app.asteum.ru
```

### 2️⃣ Загрузить на сервер

```bash
rsync -avz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  . root@89.169.38.246:/opt/asteum-process/
```

### 3️⃣ Запустить Docker

```bash
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml up -d'
```

### 4️⃣ Настроить Nginx (скопировать конфиг nginx-subdomain.conf на сервер)

```bash
scp nginx-subdomain.conf root@89.169.38.246:/etc/nginx/sites-available/app.asteum.ru

ssh root@89.169.38.246 'ln -sf /etc/nginx/sites-available/app.asteum.ru /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx'
```

### 5️⃣ Проверить

```bash
curl https://app.asteum.ru/health
```

Ожидается: `healthy`

---

## ✅ Готово!

Откройте в браузере: **https://app.asteum.ru**

---

## 📊 Используемые порты

- **8081** - HTTP frontend (внутренний)
- **8443** - HTTPS frontend (внутренний)
- **3001** - Backend API (внутренний)
- **80/443** - Nginx (внешний)

Не конфликтуют с существующим сайтом! ✅

---

## 🔧 Управление

```bash
# Остановить
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml down'

# Перезапустить
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml restart'

# Логи
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml logs -f'

# Обновить
rsync -avz --exclude='node_modules' . root@89.169.38.246:/opt/asteum-process/
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml up -d --build'
```

---

## ⚠️ Troubleshooting

### DNS не резолвится?

```bash
# Подождать 5-10 минут после настройки DNS
# Проверить
dig app.asteum.ru
```

### Nginx ошибка?

```bash
ssh root@89.169.38.246 'nginx -t'
ssh root@89.169.38.246 'tail -f /var/log/nginx/error.log'
```

### Docker не запускается?

```bash
ssh root@89.169.38.246 'docker ps -a | grep asteum-process'
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml logs'
```

---

**🚀 Оба сайта работают параллельно!**

- ✅ `asteum.ru` - основной сайт
- ✅ `app.asteum.ru` - Process Flow
