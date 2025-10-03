import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { IndexLazy, EduLazy, NotFoundLazy } from './App.lazy'

// Loading fallback component with skeleton
const LoadingFallback = () => (
  <div className='min-h-screen flex items-center justify-center'>
    <div className='w-full max-w-6xl px-4'>
      <div className='space-y-6'>
        {/* Header skeleton */}
        <div className='space-y-2'>
          <div className='h-12 w-[300px] animate-pulse rounded-md bg-muted' />
          <div className='h-4 w-[200px] animate-pulse rounded-md bg-muted' />
        </div>
        {/* Content skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <div key={i} className='rounded-lg border bg-card p-6 shadow-sm'>
              <div className='space-y-3'>
                <div className='h-4 w-full animate-pulse rounded-md bg-muted' />
                <div className='h-4 w-3/4 animate-pulse rounded-md bg-muted' />
                <div className='h-4 w-1/2 animate-pulse rounded-md bg-muted' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<IndexLazy />} />
            <Route path='/edu' element={<EduLazy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path='*' element={<NotFoundLazy />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
)

export default App
