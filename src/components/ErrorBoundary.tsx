import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary компонент для перехвата ошибок React
 * Предотвращает падение всего приложения при ошибке в дочерних компонентах
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Логирование ошибки в сервис мониторинга (Sentry, LogRocket, etc.)
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // TODO: Отправить ошибку в Sentry
    // if (env.sentry?.dsn) {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
          <div className='max-w-md w-full space-y-6 text-center'>
            <div className='flex justify-center'>
              <AlertCircle className='h-16 w-16 text-destructive' />
            </div>

            <div className='space-y-2'>
              <h1 className='text-2xl font-bold'>Что-то пошло не так</h1>
              <p className='text-muted-foreground'>
                Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить
                страницу.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className='text-left p-4 bg-muted rounded-lg overflow-auto max-h-48'>
                <p className='font-mono text-xs text-destructive'>
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className='font-mono text-xs mt-2 text-muted-foreground'>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className='flex gap-4 justify-center'>
              <Button onClick={this.handleReset} variant='default'>
                Попробовать снова
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant='outline'
              >
                Обновить страницу
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
