# Contributing to Asteum Process Flow

Спасибо за интерес к улучшению проекта! Мы ценим любой вклад.

## 📋 Содержание

- [Начало работы](#начало-работы)
- [Процесс разработки](#процесс-разработки)
- [Код стайл](#код-стайл)
- [Тестирование](#тестирование)
- [Pull Request процесс](#pull-request-процесс)

## 🚀 Начало работы

### Требования

- Node.js >= 18.x
- npm >= 9.x

### Установка

```bash
# Клонировать репозиторий
git clone <repository-url>
cd asteum-process-flow

# Установить зависимости
npm install

# Скопировать env файл
cp .env.example .env.local
# Заполните необходимые переменные окружения

# Запустить dev сервер
npm run dev
```

## 💻 Процесс разработки

### 1. Создайте ветку

```bash
git checkout -b feature/amazing-feature
# или
git checkout -b fix/bug-description
```

### Именование веток:

- `feature/` - новые функции
- `fix/` - исправления багов
- `docs/` - изменения документации
- `refactor/` - рефакторинг кода
- `test/` - добавление тестов
- `chore/` - обновление зависимостей, конфигураций

### 2. Внесите изменения

Перед коммитом убедитесь, что:

```bash
# Проверка форматирования
npm run format:check

# Исправить форматирование
npm run format

# Линтинг
npm run lint

# Проверка типов
npm run type-check

# Запустить тесты
npm run test

# Полная валидация
npm run validate
```

### 3. Коммит изменений

Мы используем [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in component"
git commit -m "docs: update README"
git commit -m "test: add unit tests for Button"
git commit -m "refactor: improve code structure"
git commit -m "chore: update dependencies"
```

**Типы коммитов:**

- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - изменение документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг
- `test:` - добавление тестов
- `chore:` - обновление инструментов, зависимостей

## 🎨 Код стайл

### TypeScript

- Используйте строгую типизацию (strict mode включен)
- Избегайте `any`, используйте `unknown` при необходимости
- Предпочитайте `interface` над `type` для объектов
- Всегда типизируйте функции (параметры и возврат)

### React

- Используйте функциональные компоненты
- Hooks вместо классов
- Деструктурируйте props
- Используйте TypeScript для props типов

### Именование

- Components: `PascalCase`
- Files: `kebab-case.tsx`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

### Структура компонента

```typescript
// imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// types
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// component
export const MyComponent = ({ title, onAction }: MyComponentProps) => {
  const [state, setState] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
};
```

## 🧪 Тестирование

### Unit тесты (Vitest)

```bash
# Запустить все тесты
npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test:coverage

# UI mode
npm run test:ui
```

### E2E тесты (Playwright)

```bash
# Запустить E2E тесты
npm run test:e2e

# UI mode
npm run test:e2e:ui

# Установить браузеры
npx playwright install
```

### Написание тестов

**Unit тесты:**

- Размещайте в `tests/unit/`
- Именуйте как `ComponentName.test.tsx`
- Тестируйте поведение, а не реализацию
- Используйте `@testing-library/react`

**E2E тесты:**

- Размещайте в `tests/e2e/`
- Именуйте как `feature-name.spec.ts`
- Тестируйте пользовательские сценарии

## 🔄 Pull Request процесс

### 1. Убедитесь что все проверки пройдены

```bash
npm run validate
npm run test
npm run test:e2e
```

### 2. Push в ваш fork

```bash
git push origin feature/amazing-feature
```

### 3. Создайте Pull Request

- Используйте понятное название
- Опишите изменения
- Укажите связанные issue (если есть)
- Приложите скриншоты (для UI изменений)

### Шаблон PR:

```markdown
## Описание

Краткое описание изменений

## Тип изменений

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Чеклист

- [ ] Код следует code style
- [ ] Добавлены unit тесты
- [ ] Добавлены E2E тесты (при необходимости)
- [ ] Документация обновлена
- [ ] Все тесты проходят
- [ ] Нет конфликтов с main веткой

## Скриншоты (если применимо)
```

### 4. Review процесс

- Maintainer'ы проверят ваш PR
- Возможно потребуется внести правки
- После апрува PR будет смержен

## 📝 Дополнительные ресурсы

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

## ❓ Вопросы?

Если у вас есть вопросы:

- Создайте issue
- Напишите в discussions

Спасибо за ваш вклад! 🎉
