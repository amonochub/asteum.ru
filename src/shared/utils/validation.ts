/**
 * Утилиты для валидации данных
 */

/**
 * Проверяет является ли строка валидным email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Проверяет является ли строка валидным URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Проверяет является ли строка валидным номером телефона (базовая проверка)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Проверяет силу пароля
 */
export const getPasswordStrength = (
  password: string
): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) {
    return 'weak'
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const strength = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
  ].filter(Boolean).length

  if (strength >= 3 && password.length >= 12) {
    return 'strong'
  }
  if (strength >= 2 && password.length >= 8) {
    return 'medium'
  }
  return 'weak'
}

/**
 * Проверяет является ли значение пустым
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim().length === 0
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}
