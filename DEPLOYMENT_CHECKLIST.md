# ✅ Deployment Checklist для asteum.ru

## 📋 Перед деплоем

### 1. SSL Сертификаты

- [ ] Файлы сертификатов в папке `SSL/`
  - [ ] `certificate.crt` - SSL сертификат
  - [ ] `private.key` - приватный ключ
  - [ ] `ca_bundle.crt` - цепочка (опционально)
- [ ] Проверен срок действия сертификата
- [ ] Права на private.key установлены: `chmod 600 SSL/private.key`
- [ ] SSL файлы НЕ в git (проверить .gitignore)

### 2. Environment Variables

- [ ] Создан файл `.env.production`
- [ ] Заполнен `VITE_SUPABASE_URL`
- [ ] Заполнен `VITE_SUPABASE_PUBLISHABLE_KEY`
- [ ] `.env.production` НЕ в git
- [ ] Проверены все обязательные переменные

### 3. Supabase Configuration

- [ ] CORS настроен для `https://asteum.ru`
- [ ] CORS настроен для `https://www.asteum.ru`
- [ ] API keys активны
- [ ] RLS policies настроены (если используются)
- [ ] Database миграции применены

### 4. DNS & Domain

- [x] A запись @ → 89.169.38.246
- [x] A запись www → 89.169.38.246
- [x] DNS серверы: ns1.reg.ru, ns2.reg.ru
- [ ] DNS пропагирован (проверить: `nslookup asteum.ru`)
- [ ] TTL установлен разумный (300-3600)

### 5. Code Quality

- [ ] Все тесты проходят: `npm run test`
- [ ] Линтинг без ошибок: `npm run lint`
- [ ] Type check: `npm run type-check`
- [ ] Build успешен: `npm run build`
- [ ] Preview работает: `npm run preview`

### 6. Security

- [ ] Нет console.log в production коде
- [ ] Нет секретов в коде
- [ ] Security headers настроены
- [ ] CSP policy настроен
- [ ] HTTPS редирект работает

### 7. Performance

- [ ] Lighthouse score проверен
- [ ] Images оптимизированы
- [ ] Bundle size разумный
- [ ] Lazy loading работает

---

## 🚀 Деплой

### 1. Локальная проверка

```bash
# Build и preview
npm run build
npm run preview

# Docker локально
docker build -t asteum-test .
docker run -p 8080:80 asteum-test
```

- [ ] Локальный build работает
- [ ] Preview работает корректно
- [ ] Docker образ собирается

### 2. Загрузка на сервер

```bash
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . user@89.169.38.246:/opt/asteum/
```

- [ ] Код загружен на сервер
- [ ] SSL сертификаты загружены
- [ ] .env.production создан на сервере

### 3. Запуск на сервере

```bash
ssh user@89.169.38.246
cd /opt/asteum/
docker-compose -f docker-compose.production.yml up -d
```

- [ ] Docker контейнер запущен
- [ ] Порты 80 и 443 слушаются
- [ ] Health check работает

---

## ✅ После деплоя

### 1. Базовые проверки

- [ ] Сайт открывается: https://asteum.ru
- [ ] WWW редирект работает: https://www.asteum.ru
- [ ] HTTP редирект на HTTPS работает
- [ ] SSL сертификат валиден (зеленый замок)
- [ ] Все страницы работают: /, /edu

### 2. Функциональность

- [ ] Навигация работает
- [ ] Все кнопки кликабельны
- [ ] Формы работают (если есть)
- [ ] Supabase подключение работает
- [ ] Dark mode переключается

### 3. SEO & Performance

- [ ] Meta tags присутствуют (view-source)
- [ ] robots.txt доступен: https://asteum.ru/robots.txt
- [ ] sitemap.xml доступен: https://asteum.ru/sitemap.xml
- [ ] Lighthouse score >= 90
- [ ] Google Search Console настроен
- [ ] Yandex Webmaster настроен

### 4. Security

```bash
# Проверка SSL
curl -I https://asteum.ru

# Проверка security headers
curl -I https://asteum.ru | grep -i "strict-transport-security\|x-frame-options\|x-content-type"
```

- [ ] HTTPS работает
- [ ] SSL Labs рейтинг A/A+: https://www.ssllabs.com/ssltest/analyze.html?d=asteum.ru
- [ ] Security headers присутствуют
- [ ] Нет mixed content warnings
- [ ] Нет console errors

### 5. Мобильная версия

- [ ] Открывается на мобильном
- [ ] Адаптивный дизайн работает
- [ ] Нет горизонтального скролла
- [ ] Тач-элементы достаточно большие
- [ ] Viewport meta tag правильный

### 6. Cross-browser

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Mobile Chrome

### 7. Monitoring & Logging

- [ ] Docker логи настроены
- [ ] Health check работает: https://asteum.ru/health
- [ ] Настроен мониторинг uptime (если нужно)
- [ ] Настроены алерты (если нужно)

---

## 📊 Performance Metrics

### Target Metrics

- Lighthouse Performance: >= 90
- Lighthouse Accessibility: >= 90
- Lighthouse Best Practices: >= 90
- Lighthouse SEO: >= 90
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Total Blocking Time: < 300ms

### Фактические (заполнить после деплоя):

- [ ] Lighthouse Performance: \_\_\_
- [ ] Lighthouse Accessibility: \_\_\_
- [ ] Lighthouse Best Practices: \_\_\_
- [ ] Lighthouse SEO: \_\_\_
- [ ] FCP: \_\_\_
- [ ] TTI: \_\_\_
- [ ] TBT: \_\_\_

---

## 🔧 Troubleshooting Commands

```bash
# Проверка контейнера
docker ps | grep asteum

# Логи
docker logs asteum-app
docker-compose -f docker-compose.production.yml logs -f

# Перезапуск
docker-compose -f docker-compose.production.yml restart

# Проверка nginx
docker exec asteum-app nginx -t

# Проверка SSL файлов
docker exec asteum-app ls -la /etc/nginx/ssl/

# Проверка процессов
docker exec asteum-app ps aux
```

---

## 📝 Post-Deployment Tasks

- [ ] Обновить README с production URL
- [ ] Добавить запись в CHANGELOG
- [ ] Создать git tag для релиза
- [ ] Уведомить команду о деплое
- [ ] Обновить документацию (если были изменения)
- [ ] Настроить backup (если еще не настроен)
- [ ] Настроить мониторинг (если еще не настроен)
- [ ] Протестировать основные user flows

---

## 🎯 Success Criteria

Деплой считается успешным если:

✅ Сайт доступен по HTTPS без ошибок
✅ SSL сертификат валиден
✅ Все страницы загружаются корректно
✅ Supabase работает
✅ Performance метрики в пределах нормы
✅ Нет критических ошибок в логах
✅ Mobile версия работает
✅ SEO настроено

---

## 📞 Emergency Contacts

В случае проблем:

1. Проверить логи: `docker logs asteum-app`
2. См. DEPLOYMENT.md - раздел Troubleshooting
3. Откатиться на предыдущую версию (если нужно)

---

**Дата деплоя**: \***\*\_\*\***
**Версия**: \***\*\_\*\***
**Deployed by**: \***\*\_\*\***
**Status**: [ ] Success / [ ] Failed

---

_Checklist version: 1.0_
_Last updated: 2 октября 2025_
