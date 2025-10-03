# Asteum Process Flow

> Революционная платформа для автоматизации бизнес-процессов нового поколения

[![CI](https://github.com/asteum/asteum-process-flow/workflows/CI/badge.svg)](https://github.com/asteum/asteum-process-flow/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Production](https://img.shields.io/badge/live-asteum.ru-green)](https://asteum.ru)

## 🚀 Особенности

- ⚡ **Быстрая обработка** - 10x быстрее конкурентов
- 🛡️ **Высокая надежность** - 99.9% uptime
- 🎨 **Современный UI** - построен на Shadcn UI и Tailwind CSS
- 🌙 **Dark Mode** - поддержка светлой и темной темы
- 📱 **Responsive** - адаптивный дизайн для всех устройств
- 🔒 **Безопасность** - SSL с GlobalSign сертификатом
- ⚙️ **TypeScript** - полная типизация кода
- 🧪 **Тестирование** - Unit и E2E тесты
- 🐳 **Docker** - готов к containerization
- 🚀 **Production Ready** - полностью готов к деплою

## 📋 Содержание

- [Быстрый старт](#быстрый-старт)
- [Требования](#требования)
- [Установка](#установка)
- [Разработка](#разработка)
- [Тестирование](#тестирование)
- [Деплой](#деплой)
- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Документация](#документация)
- [Contributing](#contributing)
- [Лицензия](#лицензия)

## ⚡ Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/asteum/asteum-process-flow.git
cd asteum-process-flow

# Установить зависимости
npm install

# Запустить dev сервер
npm run dev
```

Откройте [http://localhost:8080](http://localhost:8080) в браузере.

## 📦 Требования

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git**

## 🛠️ Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/asteum/asteum-process-flow.git
cd asteum-process-flow
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск приложения

```bash
npm run dev
```

## 💻 Разработка

### Доступные команды

```bash
# Development
npm run dev              # Запустить dev сервер (localhost:8080)

# Build
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Запустить ESLint
npm run lint:fix         # Исправить ESLint ошибки
npm run format           # Форматировать код с Prettier
npm run format:check     # Проверить форматирование
npm run type-check       # Проверить TypeScript типы
npm run validate         # Полная валидация (format + lint + type-check)

# Testing
npm run test             # Запустить unit тесты
npm run test:ui          # UI для тестов
npm run test:coverage    # Тесты с coverage
npm run test:e2e         # E2E тесты с Playwright
npm run test:e2e:ui      # Playwright UI mode
```

### Git Hooks

Pre-commit hook автоматически запускает:

- Prettier formatting
- ESLint linting
- Type checking

### Workflow

1. Создайте feature ветку: `git checkout -b feature/amazing-feature`
2. Внесите изменения
3. Запустите валидацию: `npm run validate`
4. Коммит: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Создайте Pull Request

## 🧪 Тестирование

### Unit Tests (Vitest)

```bash
# Запустить все тесты
npm run test

# Watch mode
npm run test -- --watch

# Coverage report
npm run test:coverage

# UI mode
npm run test:ui
```

### E2E Tests (Playwright)

```bash
# Установить Playwright browsers (первый раз)
npx playwright install

# Запустить E2E тесты
npm run test:e2e

# UI mode для отладки
npm run test:e2e:ui
```

### Coverage

Цель покрытия: **80%+**

## 🚀 Деплой

### Production (asteum.ru)

Проект настроен для деплоя на **asteum.ru** с SSL сертификатом от GlobalSign.

```bash
# См. полную инструкцию
cat DEPLOYMENT_FINAL.md

# Быстрый деплой
rsync -avz . user@89.169.38.246:/opt/asteum/
ssh user@89.169.38.246 'cd /opt/asteum && docker-compose -f docker-compose.production.yml up -d'
```

### Docker

```bash
# Build образ
docker build -t asteum-app -f Dockerfile.production .

# Запустить контейнер
docker-compose -f docker-compose.production.yml up -d
```

### Документация по деплою

- **DEPLOYMENT_FINAL.md** - Финальная инструкция (начните отсюда!)
- **QUICK_DEPLOY.md** - Быстрый деплой за 5 минут
- **DEPLOYMENT.md** - Полная детальная инструкция
- **DEPLOYMENT_CHECKLIST.md** - Чеклист перед/после
- **DEPLOYMENT_SUMMARY.md** - Резюме всех изменений

## 🛠️ Технологии

### Core

- [React 18](https://react.dev/) - UI библиотека
- [TypeScript](https://www.typescriptlang.org/) - Типизация
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Роутинг

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк
- [Shadcn UI](https://ui.shadcn.com/) - UI компоненты
- [Radix UI](https://www.radix-ui.com/) - Headless UI
- [Lucide React](https://lucide.dev/) - Иконки

### Testing

- [Vitest](https://vitest.dev/) - Unit тесты
- [React Testing Library](https://testing-library.com/react) - Тестирование компонентов
- [Playwright](https://playwright.dev/) - E2E тесты

### Code Quality

- [ESLint](https://eslint.org/) - Линтинг
- [Prettier](https://prettier.io/) - Форматирование
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit

### Production

- [Docker](https://www.docker.com/) - Containerization
- [Nginx](https://nginx.org/) - Web server
- [GlobalSign SSL](https://www.globalsign.com/) - SSL Certificate

## 📁 Структура проекта

```
asteum-process-flow/
├── .github/              # GitHub Actions workflows
├── public/               # Статические файлы
├── src/
│   ├── assets/          # Изображения, шрифты
│   ├── components/      # React компоненты
│   │   ├── ui/         # UI компоненты (Shadcn)
│   │   └── ...         # Feature компоненты
│   ├── config/          # Конфигурация
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Утилиты
│   ├── pages/           # Страницы
│   └── shared/          # Общие типы и utils
├── tests/
│   ├── e2e/            # E2E тесты
│   ├── unit/           # Unit тесты
│   └── setup.ts        # Test setup
├── SSL/                 # SSL сертификаты
├── docker-compose.production.yml
├── Dockerfile.production
├── nginx-ssl.conf
└── ...
```

Подробнее см. [ARCHITECTURE.md](./ARCHITECTURE.md)

## 📚 Документация

### Для разработчиков

- [README.md](./README.md) - Quick start, установка, команды (этот файл)
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Как внести вклад
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура и технологии
- [INSTALLATION.md](./INSTALLATION.md) - Детальная установка

### Для деплоя

- [DEPLOYMENT_FINAL.md](./DEPLOYMENT_FINAL.md) - **Начните отсюда!**
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Быстрый деплой
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Детальная инструкция
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Чеклист
- [SSL/README.md](./SSL/README.md) - SSL сертификаты

### Changelog

- [CHANGELOG.md](./CHANGELOG.md) - История изменений

## 🤝 Contributing

Мы приветствуем contributions! Пожалуйста, прочитайте [CONTRIBUTING.md](./CONTRIBUTING.md) для деталей.

### Процесс

1. Fork репозиторий
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'feat: add amazing feature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. [LICENSE](LICENSE) файл.

## 👥 Команда

- **Разработка** - [Asteum Team](https://github.com/asteum)

## 🙏 Благодарности

- [Lovable](https://lovable.dev/) - Initial project template
- [Shadcn](https://twitter.com/shadcn) - UI components
- Все контрибьюторы проекта

## 📞 Контакты

- **Website**: [https://asteum.ru](https://asteum.ru)
- **Email**: support@asteum.ru
- **GitHub**: [Asteum](https://github.com/asteum)

---

## 🚀 Production Status

**Live**: https://asteum.ru  
**SSL**: GlobalSign (valid until March 2026)  
**Status**: ✅ Production Ready  
**Version**: 1.0.0

---

Сделано с ❤️ командой Asteum
