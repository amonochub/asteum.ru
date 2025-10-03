.PHONY: help install dev build test lint format clean docker-build docker-run

help: ## Показать эту справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm install

dev: ## Запустить dev сервер
	npm run dev

build: ## Собрать production build
	npm run build

preview: ## Предпросмотр production build
	npm run preview

# Code Quality
lint: ## Запустить линтер
	npm run lint

lint-fix: ## Исправить ошибки линтера
	npm run lint:fix

format: ## Форматировать код
	npm run format

format-check: ## Проверить форматирование
	npm run format:check

type-check: ## Проверить типы TypeScript
	npm run type-check

validate: ## Полная валидация (format + lint + type-check)
	npm run validate

# Testing
test: ## Запустить unit тесты
	npm run test

test-watch: ## Запустить тесты в watch режиме
	npm run test -- --watch

test-ui: ## Открыть UI для тестов
	npm run test:ui

test-coverage: ## Запустить тесты с coverage
	npm run test:coverage

test-e2e: ## Запустить E2E тесты
	npm run test:e2e

test-e2e-ui: ## Открыть Playwright UI
	npm run test:e2e:ui

test-all: ## Запустить все тесты
	npm run test:coverage && npm run test:e2e

# Docker
docker-build: ## Собрать Docker образ
	docker build -t asteum-app .

docker-run: ## Запустить Docker контейнер
	docker run -p 3000:80 asteum-app

docker-compose-up: ## Запустить через docker-compose
	docker-compose up -d

docker-compose-down: ## Остановить docker-compose
	docker-compose down

# Maintenance
clean: ## Очистить сгенерированные файлы
	rm -rf dist build coverage node_modules/.vite

clean-all: clean ## Полная очистка включая node_modules
	rm -rf node_modules

reinstall: clean-all install ## Переустановить зависимости

# CI/CD
ci: validate test-all ## Запустить все проверки CI

# Setup
setup: install ## Первичная настройка проекта
	cp .env.example .env.local
	@echo "✅ Проект настроен! Отредактируйте .env.local и запустите 'make dev'"

.DEFAULT_GOAL := help

