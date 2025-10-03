# Architecture Documentation

## 📐 Общая архитектура

Asteum Process Flow - это современное SPA приложение, построенное на React с использованием TypeScript и Vite.

## 🏗️ Технологический стек

### Core

- **React 18** - UI библиотека
- **TypeScript** - строгая типизация
- **Vite** - build tool и dev server
- **React Router** - маршрутизация

### UI & Styling

- **Tailwind CSS** - utility-first CSS фреймворк
- **Shadcn UI** - компонентная библиотека
- **Radix UI** - headless UI компоненты
- **Lucide React** - иконки

### State Management

- **React Query (TanStack Query)** - server state управление
- **React Hooks** - локальный state

### Backend & Data

- **Supabase** - BaaS (Backend as a Service)
  - PostgreSQL база данных
  - Authentication
  - Real-time subscriptions
  - Storage

### Testing

- **Vitest** - unit тестирование
- **React Testing Library** - тестирование компонентов
- **Playwright** - E2E тестирование

### Code Quality

- **ESLint** - линтинг
- **Prettier** - форматирование
- **TypeScript strict mode** - строгая типизация
- **Husky** - git hooks
- **lint-staged** - pre-commit проверки

### CI/CD

- **GitHub Actions** - автоматизация
- **Lighthouse CI** - performance мониторинг

## 📁 Структура проекта

```
asteum-process-flow/
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml       # CI pipeline
│       └── deploy.yml   # Deploy pipeline
├── .vscode/             # VS Code настройки
├── public/              # Статические файлы
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/          # Изображения, шрифты
│   ├── components/      # React компоненты
│   │   ├── ui/         # UI компоненты (Shadcn)
│   │   ├── ErrorBoundary.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── config/          # Конфигурация
│   │   └── env.ts      # Типизированные env переменные
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Внешние интеграции
│   │   └── supabase/
│   ├── lib/             # Утилиты
│   ├── pages/           # Страницы-роуты
│   ├── App.tsx          # Root компонент
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── tests/
│   ├── e2e/            # E2E тесты (Playwright)
│   ├── unit/           # Unit тесты (Vitest)
│   └── setup.ts        # Test setup
├── .env.example        # Шаблон переменных окружения
├── .eslintrc.js        # ESLint конфигурация
├── .prettierrc.json    # Prettier конфигурация
├── docker-compose.yml  # Docker композиция
├── Dockerfile          # Production Docker образ
├── nginx.conf          # Nginx конфигурация
├── package.json        # Зависимости и скрипты
├── playwright.config.ts # Playwright конфигурация
├── tsconfig.json       # TypeScript конфигурация
├── vite.config.ts      # Vite конфигурация
└── vitest.config.ts    # Vitest конфигурация
```

## 🔄 Data Flow

```
User Interaction
    ↓
React Component
    ↓
Event Handler
    ↓
React Query / Supabase Client
    ↓
Supabase API
    ↓
PostgreSQL Database
    ↓
Response
    ↓
React Query Cache
    ↓
Component Re-render
```

## 🎨 Component Architecture

### Component Types

1. **UI Components** (`src/components/ui/`)
   - Переиспользуемые базовые компоненты
   - Построены на Radix UI
   - Стилизованы с Tailwind CSS
   - Не содержат бизнес-логики

2. **Feature Components** (`src/components/`)
   - Специфичные для фичи компоненты
   - Могут содержать бизнес-логику
   - Используют UI компоненты

3. **Page Components** (`src/pages/`)
   - Компоненты страниц
   - Композируют feature компоненты
   - Связаны с роутами

### Component Pattern

```typescript
// Component composition
<ErrorBoundary>
  <QueryClientProvider>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
</ErrorBoundary>
```

## 🔐 Security

### Environment Variables

- Все чувствительные данные в `.env`
- Типизированный доступ через `src/config/env.ts`
- Валидация при старте приложения

### API Security

- Supabase Row Level Security (RLS)
- JWT токены для аутентификации
- Защита от CSRF через Supabase

### Frontend Security

- CSP headers в nginx
- XSS защита через React (автоматический escaping)
- HTTPS only в production

## 🚀 Performance

### Build Optimization

- Code splitting по роутам
- Tree shaking
- Minification
- Gzip compression

### Runtime Optimization

- React.lazy для lazy loading
- React Query для кеширования
- Оптимизация изображений
- Виртуализация длинных списков

### Monitoring

- Lighthouse CI в каждом PR
- Coverage отчеты
- Bundle size tracking

## 🔧 Development Workflow

```bash
# 1. Development
npm run dev          # Start dev server

# 2. Code Quality
npm run format       # Format code
npm run lint         # Lint code
npm run type-check   # Check types

# 3. Testing
npm run test         # Unit tests
npm run test:e2e     # E2E tests

# 4. Build
npm run build        # Production build

# 5. Preview
npm run preview      # Preview build
```

## 📦 Deployment

### Docker Deployment

```bash
# Build image
docker build -t asteum-app .

# Run container
docker run -p 3000:80 asteum-app

# Or use docker-compose
docker-compose up -d
```

### Cloud Deployment

Поддерживаются платформы:

- **Vercel** - рекомендуется для Next.js стиля
- **Netlify** - простой деплой SPA
- **AWS S3 + CloudFront** - полный контроль
- **Docker** - любой хостинг с Docker поддержкой

## 🔍 Debugging

### Development

- React DevTools
- Redux DevTools (если используется)
- Network tab для API запросов
- Supabase dashboard для данных

### Production

- Error Boundary для UI ошибок
- Sentry для error tracking (опционально)
- Lighthouse для performance

## 📚 Best Practices

### TypeScript

- Используйте strict mode
- Избегайте `any`
- Типизируйте все функции
- Используйте utility types

### React

- Функциональные компоненты
- Custom hooks для переиспользования логики
- Мемоизация при необходимости
- Правильное использование useEffect

### Testing

- Тестируйте поведение, не реализацию
- 80%+ coverage цель
- E2E тесты для критичных flow
- Mock внешние зависимости

## 🔄 Future Improvements

- [ ] Internationalization (i18n)
- [ ] PWA поддержка
- [ ] Advanced analytics
- [ ] A/B testing framework
- [ ] Performance monitoring
- [ ] Storybook для UI компонентов
