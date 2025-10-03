# 🚀 Installation & Quick Start Guide

## 📋 Предварительные требования

Убедитесь что у вас установлено:

- **Node.js** >= 18.x ([Скачать](https://nodejs.org/))
- **npm** >= 9.x (идет с Node.js)
- **Git** ([Скачать](https://git-scm.com/))

Проверить версии:

```bash
node --version
npm --version
git --version
```

---

## ⚡ Быстрая установка

### 1. Установка зависимостей

```bash
npm install
```

Это установит все необходимые зависимости из `package.json`.

### 2. Настройка переменных окружения

```bash
# Создать .env.local из шаблона
cp .env.example .env.local
```

Откройте `.env.local` и заполните своими данными:

```env
# Получите эти данные в Supabase Dashboard
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

# Опционально
VITE_APP_ENV=development
```

### 3. Запуск приложения

```bash
npm run dev
```

Откройте [http://localhost:8080](http://localhost:8080) в браузере.

---

## 🧪 Первый запуск - Проверка качества

После установки рекомендуется запустить все проверки:

```bash
# Проверить форматирование
npm run format:check

# Запустить линтер
npm run lint

# Проверить типы TypeScript
npm run type-check

# Или все вместе
npm run validate
```

Если увидите ошибки, исправьте их:

```bash
npm run format    # Автоформатирование
npm run lint:fix  # Автоисправление линтера
```

---

## 🔧 Настройка IDE

### VS Code (рекомендуется)

1. Установите рекомендуемые расширения:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - Playwright Test for VSCode

2. VS Code автоматически использует настройки из `.vscode/settings.json`

3. Перезагрузите VS Code для применения настроек

### Другие IDE

Убедитесь что ваша IDE:

- Использует Prettier для форматирования
- Интегрирована с ESLint
- Поддерживает TypeScript

---

## 📦 Дополнительные инструменты

### Playwright для E2E тестов

При первом запуске E2E тестов нужно установить браузеры:

```bash
npx playwright install
```

### Git Hooks

Husky hooks установятся автоматически при `npm install`.

Если возникли проблемы:

```bash
npx husky install
```

---

## 🐳 Альтернатива: Docker

Если не хотите устанавливать Node.js локально:

```bash
# Собрать и запустить
docker-compose up

# Или через Makefile
make docker-build
make docker-run
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000)

---

## 🎯 Workflow для разработки

### Ежедневная работа

```bash
# 1. Запустить dev сервер
npm run dev

# 2. Внести изменения в коде

# 3. Перед коммитом (автоматически через pre-commit hook)
npm run validate

# 4. Запустить тесты
npm run test

# 5. Коммит (husky запустит проверки)
git commit -m "feat: add new feature"
```

### Полная проверка (как в CI)

```bash
# Все проверки
npm run validate

# Unit тесты с coverage
npm run test:coverage

# E2E тесты
npm run test:e2e

# Build
npm run build
```

Или через Makefile:

```bash
make ci
```

---

## 🔍 Troubleshooting

### Проблема: "Cannot find module"

```bash
# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
```

Или через Makefile:

```bash
make reinstall
```

### Проблема: Port 8080 уже занят

Измените порт в `vite.config.ts`:

```typescript
server: {
  port: 3000, // Измените на свободный порт
}
```

### Проблема: Ошибки TypeScript после обновления

```bash
# Очистить кеш и пересобрать
npm run type-check
```

### Проблема: Тесты не запускаются

```bash
# Очистить coverage и кеши
rm -rf coverage .vitest
npm run test
```

### Проблема: Husky hooks не работают

```bash
# Переустановить husky
rm -rf .husky
npm install
npx husky install
```

---

## 📚 Следующие шаги

После успешной установки:

1. **Изучите документацию**:
   - [README.md](./README.md) - Общая информация
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Как контрибьютить
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура проекта

2. **Запустите тесты**:

   ```bash
   npm run test
   npm run test:e2e
   ```

3. **Изучите примеры**:
   - `src/components/` - Компоненты
   - `tests/unit/` - Unit тесты
   - `tests/e2e/` - E2E тесты

4. **Начните разработку**!

---

## 💡 Полезные команды

```bash
# Development
npm run dev              # Dev сервер
npm run build            # Production build
npm run preview          # Preview build

# Quality
npm run format           # Форматировать
npm run lint             # Линтинг
npm run type-check       # Проверка типов
npm run validate         # Все проверки

# Testing
npm run test             # Unit тесты
npm run test:coverage    # С coverage
npm run test:e2e         # E2E тесты

# Makefile (альтернатива)
make dev                 # = npm run dev
make build               # = npm run build
make test                # = npm run test
make ci                  # Все проверки CI
```

Полный список в [README.md](./README.md#доступные-команды)

---

## 🆘 Получить помощь

- **Issues**: [GitHub Issues](https://github.com/yourusername/asteum-process-flow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/asteum-process-flow/discussions)
- **Documentation**: См. все `.md` файлы в корне проекта

---

**Готово! Приятной разработки! 🎉**
