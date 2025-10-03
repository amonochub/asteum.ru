/**
 * Lazy loaded роуты для code splitting
 */
import { lazy } from 'react'

export const IndexLazy = lazy(() => import('./pages/Index'))
export const EduLazy = lazy(() => import('./pages/Edu'))
export const NotFoundLazy = lazy(() => import('./pages/NotFound'))
