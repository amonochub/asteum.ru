/**
 * Общие типы используемые во всем приложении
 */

/**
 * Статус загрузки данных
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Обобщенный результат API запроса
 */
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: LoadingState
}

/**
 * Пагинация
 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/**
 * Пагинированный ответ
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

/**
 * Обобщенный тип для ID
 */
export type ID = string | number

/**
 * Nullable тип
 */
export type Nullable<T> = T | null

/**
 * Optional тип
 */
export type Optional<T> = T | undefined
