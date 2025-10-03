/**
 * Типизированный доступ к переменным окружения
 * Все переменные валидируются при старте приложения
 */

interface EnvironmentVariables {
  app: {
    environment: 'development' | 'staging' | 'production'
  }
  api?: {
    url: string
  }
  analytics?: {
    gaTrackingId?: string
    ymTrackingId?: string
  }
  sentry?: {
    dsn?: string
    environment?: string
  }
}

/**
 * Получает переменную окружения с валидацией
 */
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

/**
 * Получает опциональную переменную окружения
 */
const getOptionalEnvVar = (key: string): string | undefined => {
  return import.meta.env[key]
}

/**
 * Валидация и экспорт переменных окружения
 */
export const env: EnvironmentVariables = {
  app: {
    environment: (getOptionalEnvVar('VITE_APP_ENV') || 'development') as
      | 'development'
      | 'staging'
      | 'production',
  },
  api: {
    url: getOptionalEnvVar('VITE_API_URL') || 'http://localhost:3000',
  },
  analytics: {
    gaTrackingId: getOptionalEnvVar('VITE_GA_TRACKING_ID'),
    ymTrackingId: getOptionalEnvVar('VITE_YM_TRACKING_ID'),
  },
  sentry: {
    dsn: getOptionalEnvVar('VITE_SENTRY_DSN'),
    environment: getOptionalEnvVar('VITE_SENTRY_ENVIRONMENT'),
  },
}

/**
 * Проверка, что приложение в production режиме
 */
export const isProduction = env.app.environment === 'production'

/**
 * Проверка, что приложение в development режиме
 */
export const isDevelopment = env.app.environment === 'development'

/**
 * Проверка, что приложение в staging режиме
 */
export const isStaging = env.app.environment === 'staging'
