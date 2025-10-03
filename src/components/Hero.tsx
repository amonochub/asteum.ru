import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useMagneticEffect } from '@/hooks/use-magnetic-effect'
import { TextReveal } from '@/components/TextReveal'
import { useState, useEffect } from 'react'

export const Hero = () => {
  const [showText, setShowText] = useState(false)
  const button1Ref = useMagneticEffect<HTMLButtonElement>({ strength: 0.2 })
  const button2Ref = useMagneticEffect<HTMLButtonElement>({ strength: 0.2 })

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  // Trigger text reveal after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-transparent'>
      <div className='container mx-auto px-4 sm:px-6 py-20 sm:py-32 md:py-40 relative z-10'>
        <div className='flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-6xl mx-auto'>
          {/* Main heading - Apple style large and bold with text reveal animation */}
          <h1 className='font-unbounded text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] sm:leading-[0.95]'>
            {showText ? (
              <>
                <span className='block'>
                  <TextReveal text='Автоматизация' delay={0} duration={80} />
                </span>
                <span className='block mt-1 sm:mt-2 text-foreground/90'>
                  <TextReveal
                    text='нового поколения'
                    delay={800}
                    duration={60}
                  />
                </span>
              </>
            ) : (
              <span className='block opacity-0'>Автоматизация</span>
            )}
          </h1>

          {/* Subheading with delayed animation */}
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-normal mt-4 sm:mt-6 opacity-0 animate-fade-in-up [animation-delay:400ms] px-4 break-words'>
            Революционная платформа для автоматизации бизнес-процессов.
          </p>

          {/* CTA Buttons with magnetic effect */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 sm:pt-12 opacity-0 animate-scale-in [animation-delay:2000ms] w-full sm:w-auto px-4'>
            <Button
              ref={button1Ref}
              variant='default'
              size='lg'
              className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium transition-transform duration-200 ease-out w-full sm:w-auto'
              onClick={() => {
                toast({
                  title: 'Добро пожаловать!',
                  description: 'Начните работу с Asteum прямо сейчас',
                })
                scrollToSection('automation')
              }}
            >
              Начать работу
            </Button>
            <Button
              ref={button2Ref}
              variant='outline'
              size='lg'
              className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium transition-transform duration-200 ease-out w-full sm:w-auto'
              onClick={() => scrollToSection('features')}
            >
              Узнать больше
            </Button>
          </div>

          {/* Feature highlights - minimal style with staggered animation */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-16 sm:pt-24 w-full max-w-5xl px-4'>
            <div className='space-y-2 sm:space-y-3 opacity-0 animate-slide-up [animation-delay:800ms] hover-lift cursor-default transition-all'>
              <div className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground break-words'>
                10x
              </div>
              <div className='text-base sm:text-lg text-muted-foreground break-words'>
                Быстрее обработка
              </div>
            </div>
            <div className='space-y-2 sm:space-y-3 opacity-0 animate-slide-up [animation-delay:1000ms] hover-lift cursor-default transition-all'>
              <div className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground break-words'>
                99.9%
              </div>
              <div className='text-base sm:text-lg text-muted-foreground break-words'>
                Надежность системы
              </div>
            </div>
            <div className='space-y-2 sm:space-y-3 opacity-0 animate-slide-up [animation-delay:1200ms] hover-lift cursor-default transition-all'>
              <div className='text-4xl sm:text-5xl md:text-6xl font-bold text-foreground break-words'>
                24/7
              </div>
              <div className='text-base sm:text-lg text-muted-foreground break-words'>
                Поддержка клиентов
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
