# 📋 Итоговая инструкция по деплою

> Параллельный запуск на root@89.169.38.246

---

## 🎯 Структура на сервере

```
https://asteum.ru                → Основной сайт (не трогаем)
https://edu.asteum.ru            → Поддомен (не трогаем)
https://asteum.ru/process        → Process Flow (НОВЫЙ)
https://asteum.ru/process-api    → Backend API (НОВЫЙ)
```

---

## ⚡ 3 простых шага

### 1. Загрузить

```bash
rsync -avz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='backend/node_modules' \
  . root@89.169.38.246:/opt/asteum-process/
```

### 2. Запустить Docker

```bash
ssh root@89.169.38.246 'cd /opt/asteum-process && docker-compose -f docker-compose.parallel.yml up -d'
```

### 3. Добавить в Nginx

На сервере открыть конфиг asteum.ru:

```bash
nano /etc/nginx/sites-available/asteum.ru
```

В server блок добавить:

```nginx
# Process Flow
location /process {
    rewrite ^/process(/.*)$ $1 break;
    rewrite ^/process$ / break;
    proxy_pass http://localhost:8081;
    proxy_set_header Host $host;
}

location /process-api/ {
    rewrite ^/process-api/(.*)$ /api/$1 break;
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
}
```

Применить:

```bash
nginx -t && systemctl reload nginx
```

---

## ✅ Проверка

```bash
curl https://asteum.ru/process-health
```

В браузере: `https://asteum.ru/process`

---

## 🎉 Готово!

**Все работает параллельно:**

- ✅ asteum.ru
- ✅ edu.asteum.ru
- ✅ asteum.ru/process

**Никаких конфликтов!**
