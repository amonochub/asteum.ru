# 📚 Best Practices & Documentation - Tech Stack

> Актуальная документация и рекомендации по использованию технологий в проекте  
> Обновлено: 2 октября 2025 (Context7 MCP)

---

## 📋 Содержание

1. [React 18 - UI Library](#react-18---ui-library)
2. [Vite - Build Tool](#vite---build-tool)
3. [Tailwind CSS - Styling](#tailwind-css---styling)
4. [React Router - Navigation](#react-router---navigation)
5. [Vitest - Unit Testing](#vitest---unit-testing)
6. [Playwright - E2E Testing](#playwright---e2e-testing)
7. [Общие рекомендации](#общие-рекомендации)

---

## React 18 - UI Library

### 🎯 Основные концепции

#### State Management

```typescript
// ✅ Используйте useState для локального state
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

#### Reducer Pattern для сложной логики

```typescript
// ✅ useReducer для сложных состояний
import { useReducer } from 'react';

type State = { count: number; name: string };
type Action =
  | { type: 'increment' }
  | { type: 'setName'; name: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'setName':
      return { ...state, name: action.name };
    default:
      return state;
  }
}

function Component() {
  const [state, dispatch] = useReducer(reducer, { count: 0, name: '' });

  return (
    <>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Count: {state.count}
      </button>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: 'setName', name: e.target.value })}
      />
    </>
  );
}
```

### 🎯 Рекомендации для проекта

1. **Custom Hooks** - выносите повторяющуюся логику
2. **ErrorBoundary** - уже реализован ✅
3. **Lazy Loading** - уже реализован ✅
4. **Типизация** - используйте TypeScript для props и state

**Документация**: https://react.dev

---

## Vite - Build Tool

### ⚡ Конфигурация и оптимизация

#### Плагины

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Условное применение плагина
    {
      ...customPlugin(),
      apply: 'build', // только для build
    },
  ],
  build: {
    rollupOptions: {
      // Кастомизация Rollup
      output: {
        manualChunks: {
          // Разделение vendor кода
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
  },
})
```

#### Оптимизация зависимостей

```typescript
export default defineConfig({
  optimizeDeps: {
    include: [
      // Включайте nested CommonJS зависимости
      'esm-dep > cjs-dep',
    ],
  },
})
```

### 🎯 Рекомендации для проекта

1. **Code Splitting** - уже настроен через lazy loading ✅
2. **Environment Variables** - используйте типизированный `env.ts` ✅
3. **Build Optimization** - настройте `manualChunks` для vendor кода
4. **Dev Performance** - `optimizeDeps` для быстрой загрузки

**Документация**: https://vitejs.dev

---

## Tailwind CSS - Styling

### 🎨 Dark Mode

#### Автоматический Dark Mode

```html
<!-- Используйте dark: префикс -->
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">Заголовок</h1>
</div>
```

#### JavaScript управление темой

```javascript
// Сохранение в localStorage
localStorage.theme = 'dark' // темная тема
localStorage.theme = 'light' // светлая тема
localStorage.removeItem('theme') // системная тема

// Применение класса
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
)
```

### 📱 Responsive Design

```html
<!-- Адаптивные утилиты -->
<div
  class="
  w-full          /* mobile */
  md:w-1/2        /* tablet */
  lg:w-1/3        /* desktop */
  xl:w-1/4        /* large desktop */
"
>
  <img
    class="
    brightness-110           /* default */
    md:brightness-150        /* tablet+ */
    hover:brightness-125     /* hover */
  "
  />
</div>
```

### 🎯 Комбинирование вариантов

```html
<!-- Dark mode + Responsive + Hover -->
<button
  class="
  bg-blue-500 
  dark:bg-blue-700 
  md:dark:bg-blue-900 
  hover:dark:md:bg-blue-950
"
>
  Кнопка
</button>
```

### 🎯 Рекомендации для проекта

1. **Dark Mode** - уже настроен через `next-themes` ✅
2. **Responsive First** - проектируйте сначала для mobile
3. **Utility-First** - используйте утилиты вместо custom CSS
4. **Container Queries** - для компонентов используйте `container` утилиты

**Документация**: https://tailwindcss.com

---

## React Router - Navigation

### 🚦 Lazy Loading Routes

#### Оптимальный подход

```typescript
// routes.tsx
import { lazy } from 'react'

// ✅ Lazy loading компонентов
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

export const routes = [
  {
    path: '/',
    lazy: async () => {
      // Параллельная загрузка компонента и данных
      const [Component, loader] = await Promise.all([
        import('./pages/Home'),
        import('./pages/Home.loader'),
      ])
      return { Component, loader }
    },
  },
]
```

#### Lazy Route Discovery

```typescript
// react-router.config.ts
export default {
  // Ленивая загрузка маршрутов
  routeDiscovery: {
    mode: 'lazy',
    manifestPath: '/__manifest',
  },

  // Или загрузка всех маршрутов сразу
  routeDiscovery: { mode: 'initial' },
}
```

#### Динамическая подгрузка subtrees

```typescript
let router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Home,
    },
  ],
  {
    async patchRoutesOnNavigation({ patch, path }) {
      if (path.startsWith('/dashboard')) {
        // Загружаем подмаршруты динамически
        let children = await import('./dashboard-routes')
        patch(null, children)
      }
    },
  }
)
```

### 🎯 Рекомендации для проекта

1. **Code Splitting** - используйте `lazy` для всех маршрутов ✅
2. **Preloading** - настройте preload для критических маршрутов
3. **Route Discovery** - рассмотрите lazy mode для больших приложений
4. **Error Handling** - обрабатывайте ошибки загрузки через ErrorBoundary ✅

**Документация**: https://reactrouter.com

---

## Vitest - Unit Testing

### 🧪 Конфигурация Coverage

#### Базовая настройка

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // или 'istanbul'
      enabled: true,
      reporter: ['text', 'html', 'clover', 'json'],

      // Пороги coverage
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
        perFile: true, // проверка для каждого файла
      },

      // Исключения
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.test.ts',
        '**/*.config.ts',
      ],
    },
  },
})
```

#### Mocking

```typescript
// Mock глобальных переменных
import { vi } from 'vitest'

vi.stubGlobal('__VERSION__', '1.0.0')
expect(__VERSION__).toBe('1.0.0')

// Очистка моков между тестами
// vitest.config.ts
export default defineConfig({
  test: {
    clearMocks: true, // очистка истории
    mockReset: true, // сброс реализации
    restoreMocks: true, // восстановление оригинала
  },
})
```

### 🎯 Рекомендации для проекта

1. **Coverage Target** - стремитесь к 80%+ ✅
2. **Mocking Strategy** - используйте `vi.stubGlobal` для глобалов
3. **Cleanup** - настройте `clearMocks` и `restoreMocks`
4. **Watch Mode** - используйте `--watch` в разработке

**Документация**: https://vitest.dev

---

## Playwright - E2E Testing

### 🎭 Конфигурация Multi-Browser

#### Тестирование на разных браузерах

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile emulation
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Branded browsers
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
})
```

#### Пример теста

```typescript
import { test, expect } from '@playwright/test'

test('homepage should load', async ({ page }) => {
  await page.goto('/')

  // Проверка заголовка
  await expect(page).toHaveTitle(/Asteum/)

  // Проверка элемента
  const hero = page.locator('h1')
  await expect(hero).toBeVisible()
  await expect(hero).toContainText('Process Flow')
})

// Тест с device emulation
test.use(devices['iPhone 12'])

test('mobile navigation', async ({ page }) => {
  await page.goto('/')

  // Мобильное меню
  await page.click('[aria-label="Menu"]')
  await expect(page.locator('nav')).toBeVisible()
})
```

### 🎯 Рекомендации для проекта

1. **Multi-Browser** - тестируйте на Chromium, Firefox, WebKit ✅
2. **Mobile Testing** - добавьте тесты для мобильных устройств
3. **CI Integration** - настройте retries для CI ✅
4. **Traces** - используйте `trace: 'on-first-retry'` для отладки ✅

**Документация**: https://playwright.dev

---

## 🎯 Общие рекомендации

### Development Workflow

```bash
# Разработка
npm run dev              # Dev сервер + HMR
npm run validate         # Полная проверка кода

# Тестирование
npm run test             # Unit тесты (watch mode)
npm run test:coverage    # С coverage отчетом
npm run test:e2e         # E2E тесты
npm run test:e2e:ui      # E2E UI mode для отладки

# Качество кода
npm run lint:fix         # Исправить ESLint ошибки
npm run format           # Форматировать Prettier
npm run type-check       # Проверить TypeScript

# Production
npm run build            # Production build
npm run preview          # Просмотр build
```

### Code Quality Checklist

- [ ] TypeScript strict mode ✅
- [ ] ESLint configured ✅
- [ ] Prettier configured ✅
- [ ] Pre-commit hooks ✅
- [ ] Unit tests ≥80% ✅
- [ ] E2E tests для критических путей ✅
- [ ] ErrorBoundary для React ✅
- [ ] Lazy loading routes ✅
- [ ] Dark mode support ✅
- [ ] Responsive design ✅

### Performance Best Practices

1. **Code Splitting**
   - ✅ Lazy loading компонентов
   - ✅ Dynamic imports для маршрутов
   - 🔄 Manual chunks для vendor кода

2. **Build Optimization**
   - ✅ Vite для быстрой сборки
   - ✅ Tree-shaking
   - 🔄 Bundle analysis (добавьте `rollup-plugin-visualizer`)

3. **Runtime Performance**
   - ✅ React.Suspense для lazy components
   - ✅ ErrorBoundary для graceful errors
   - 🔄 React.memo для дорогих компонентов

4. **Loading States**
   - ✅ Loading fallback в App.tsx
   - 🔄 Skeleton screens для контента
   - 🔄 Progressive enhancement

---

## 📚 Полезные ссылки

| Технология       | Документация                   | GitHub                                      |
| ---------------- | ------------------------------ | ------------------------------------------- |
| **React**        | https://react.dev              | https://github.com/facebook/react           |
| **Vite**         | https://vitejs.dev             | https://github.com/vitejs/vite              |
| **Tailwind CSS** | https://tailwindcss.com        | https://github.com/tailwindlabs/tailwindcss |
| **React Router** | https://reactrouter.com        | https://github.com/remix-run/react-router   |
| **Vitest**       | https://vitest.dev             | https://github.com/vitest-dev/vitest        |
| **Playwright**   | https://playwright.dev         | https://github.com/microsoft/playwright     |
| **Shadcn UI**    | https://ui.shadcn.com          | https://github.com/shadcn/ui                |
| **TypeScript**   | https://www.typescriptlang.org | https://github.com/microsoft/TypeScript     |

---

## 🔄 Следующие шаги

### Приоритет 1 (Критично)

- [ ] Настроить bundle analysis (visualizer)
- [ ] Добавить skeleton screens
- [ ] Настроить performance monitoring (Web Vitals)

### Приоритет 2 (Важно)

- [ ] Добавить mobile E2E тесты
- [ ] Настроить MSW для мокирования API
- [ ] Добавить Storybook для компонентов

### Приоритет 3 (Желательно)

- [ ] Настроить React Query (если появится API)
- [ ] Добавить i18n (internationalization)
- [ ] Progressive Web App (PWA) features

---

**Документация обновлена**: 2 октября 2025  
**Источник**: Context7 MCP  
**Проект**: Asteum Process Flow v1.0.0

**Статус**: ✅ Production Ready
