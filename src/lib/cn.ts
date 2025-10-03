import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Утилита для объединения Tailwind классов с поддержкой условных классов
 * @param inputs - классы для объединения
 * @returns объединенная строка классов
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
