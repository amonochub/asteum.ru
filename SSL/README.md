# SSL Certificates for asteum.ru

## Необходимые файлы

Для работы SSL положите следующие файлы в эту папку:

### Обязательные файлы:

- `certificate.crt` - SSL сертификат для asteum.ru
- `private.key` - Приватный ключ (должен быть защищен, не коммитить в git!)

### Опциональные файлы:

- `ca_bundle.crt` - Цепочка сертификатов (chain/bundle)
- `certificate-2.csr` - CSR файл (уже есть)

## Получение сертификата

### Если у вас есть сертификат от reg.ru

1. Скачайте сертификат из панели reg.ru
2. Обычно вы получите:
   - `certificate.crt` - основной сертификат
   - `ca_bundle.crt` - промежуточные сертификаты
   - `private.key` - приватный ключ

3. Положите файлы в эту папку

### Использование Let's Encrypt (альтернатива)

Если хотите бесплатный SSL от Let's Encrypt:

```bash
# Из корня проекта
docker-compose -f docker-compose.production.yml up -d

# Получить сертификат
docker exec asteum-app certbot certonly --webroot \
  -w /var/www/certbot \
  -d asteum.ru \
  -d www.asteum.ru \
  --email your@email.com \
  --agree-tos \
  --no-eff-email

# Обновить nginx конфигурацию для использования Let's Encrypt путей
```

## Структура после добавления файлов

```
SSL/
├── README.md           (этот файл)
├── certificate.crt     (добавьте)
├── private.key         (добавьте, держите в секрете!)
├── ca_bundle.crt       (опционально)
└── certificate-2.csr   (уже есть)
```

## ⚠️ Безопасность

**ВАЖНО:**

- НЕ коммитьте `private.key` в git!
- Проверьте что `SSL/` добавлена в `.gitignore`
- Права на `private.key` должны быть `600` (только владелец может читать)

```bash
chmod 600 SSL/private.key
```

## Проверка сертификата

После установки сертификатов проверьте:

```bash
# Проверка сертификата
openssl x509 -in SSL/certificate.crt -text -noout

# Проверка что приватный ключ соответствует сертификату
openssl x509 -noout -modulus -in SSL/certificate.crt | openssl md5
openssl rsa -noout -modulus -in SSL/private.key | openssl md5
# Эти хеши должны совпадать!

# Проверка срока действия
openssl x509 -in SSL/certificate.crt -noout -dates
```

## Обновление сертификата

SSL сертификаты имеют срок действия (обычно 1 год). Для обновления:

1. Получите новый сертификат
2. Замените файлы в этой папке
3. Перезапустите контейнер:

```bash
docker-compose -f docker-compose.production.yml restart
```

## Автоматическое обновление (Let's Encrypt)

Если используете Let's Encrypt, добавьте cron задачу:

```bash
# Обновление каждый понедельник в 3:00
0 3 * * 1 docker exec asteum-app certbot renew --quiet && docker-compose -f docker-compose.production.yml restart
```
