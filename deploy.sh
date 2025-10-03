#!/bin/bash
# Автоматический деплой Process Flow на сервер
# Использование: ./deploy.sh

set -e  # Останавливаться при ошибках

SERVER="root@89.169.38.246"
REMOTE_PATH="/opt/asteum-process"
PROJECT_DIR="/Users/amonoc/Library/Mobile Documents/com~apple~CloudDocs/Проекты/asteum-process-flow"

echo "🚀 Начинаю деплой Process Flow..."
echo ""

# Шаг 1: Проверка подключения
echo "📡 Проверяю подключение к серверу..."
if ! ssh -o ConnectTimeout=5 "$SERVER" 'echo "✅ Подключение успешно"'; then
    echo "❌ Не могу подключиться к серверу $SERVER"
    echo ""
    echo "Настройте SSH ключ:"
    echo "  ssh-copy-id $SERVER"
    echo ""
    echo "Или выполните команды вручную (см. MANUAL_DEPLOY.md)"
    exit 1
fi

# Шаг 2: Создание директории на сервере
echo ""
echo "📁 Создаю директорию на сервере..."
ssh "$SERVER" "mkdir -p $REMOTE_PATH"

# Шаг 3: Загрузка файлов
echo ""
echo "📦 Загружаю файлы на сервер..."
rsync -avz --progress \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='backend/node_modules' \
  --exclude='backend/dist' \
  --exclude='backend/data' \
  --exclude='.vscode' \
  --exclude='.idea' \
  --exclude='coverage' \
  --exclude='test-results' \
  "$PROJECT_DIR/" "$SERVER:$REMOTE_PATH/"

# Шаг 4: Запуск Docker контейнеров
echo ""
echo "🐳 Запускаю Docker контейнеры..."
ssh "$SERVER" << 'ENDSSH'
cd /opt/asteum-process

echo "Проверяю Docker..."
docker --version

echo "Останавливаю старые контейнеры (если есть)..."
docker-compose -f docker-compose.parallel.yml down 2>/dev/null || true

echo "Запускаю новые контейнеры..."
docker-compose -f docker-compose.parallel.yml up -d --build

echo "Ожидаю запуска контейнеров..."
sleep 10

echo "Проверяю статус контейнеров..."
docker-compose -f docker-compose.parallel.yml ps

echo "✅ Docker контейнеры запущены!"
ENDSSH

# Шаг 5: Проверка health check
echo ""
echo "🏥 Проверяю работоспособность..."
sleep 5
ssh "$SERVER" << 'ENDSSH'
echo "Frontend health check:"
curl -s http://localhost:8081/health || echo "⚠️  Frontend еще не готов"

echo ""
echo "Backend health check:"
curl -s http://localhost:3001/health || echo "⚠️  Backend еще не готов"
ENDSSH

# Шаг 6: Инструкция по Nginx
echo ""
echo "✅ Файлы загружены и Docker контейнеры запущены!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 СЛЕДУЮЩИЙ ШАГ: Настройка Nginx"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Выполните на сервере:"
echo ""
echo "ssh $SERVER"
echo ""
echo "# Найдите конфиг для asteum.ru"
echo "ls -la /etc/nginx/sites-available/"
echo ""
echo "# Откройте конфиг (обычно это asteum.ru)"
echo "nano /etc/nginx/sites-available/asteum.ru"
echo ""
echo "# Добавьте в server блок для asteum.ru:"
cat << 'EOF'

# Process Flow Application
location /process {
    rewrite ^/process(/.*)$ $1 break;
    rewrite ^/process$ / break;
    
    proxy_pass http://localhost:8081;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Process Flow API
location /process-api/ {
    rewrite ^/process-api/(.*)$ /api/$1 break;
    
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
EOF

echo ""
echo "# Проверьте конфигурацию"
echo "nginx -t"
echo ""
echo "# Перезагрузите Nginx"
echo "systemctl reload nginx"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ После настройки Nginx сайт будет доступен:"
echo "   https://asteum.ru/process"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"


