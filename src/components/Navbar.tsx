import { Button } from '@/components/ui/button'
import astemLogo from '@/assets/asteum-logo.png'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useNavigate, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleStart = () => {
    navigate('/dashboard')
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/50 transition-colors'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-14 sm:h-16 md:h-20'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <a href='/' className='hover:opacity-70 transition-opacity'>
              <img
                src={astemLogo}
                alt='Asteum'
                className='h-6 sm:h-7 md:h-8 w-auto'
              />
            </a>
          </div>

          {/* Navigation links */}
          <div className='hidden md:flex items-center gap-6 lg:gap-10'>
            <button
              onClick={() => scrollToSection('features')}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
            >
              Возможности
            </button>
            <button
              onClick={() => scrollToSection('automation')}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
            >
              Автоматизация
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
            >
              Dashboard
            </button>
            <a
              href='/edu'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
            >
              Образование
            </a>
            <button
              onClick={() => scrollToSection('pricing')}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
            >
              Цены
            </button>
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
            <ThemeToggle />
            <Button
              variant='default'
              size='sm'
              className='rounded-full h-9 sm:h-10 px-4 sm:px-6 text-sm font-medium hover-scale'
              onClick={handleStart}
            >
              Начать
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
