/**
 * Утилиты для форматирования данных
 */

/**
 * Форматирует дату в локальном формате
 */
export const formatDate = (date: Date | string, locale = 'ru-RU'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Форматирует дату и время
 */
export const formatDateTime = (
  date: Date | string,
  locale = 'ru-RU'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Форматирует число с разделителями
 */
export const formatNumber = (num: number, locale = 'ru-RU'): string => {
  return num.toLocaleString(locale)
}

/**
 * Форматирует валюту
 */
export const formatCurrency = (
  amount: number,
  currency = 'RUB',
  locale = 'ru-RU'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Обрезает текст до указанной длины
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return `${text.slice(0, maxLength)}...`
}

/**
 * Форматирует размер файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
