import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const benefits = [
  'Автоматизация повторяющихся задач',
  'Интеграция с существующими системами',
  'Аналитика и отчетность в реальном времени',
  'Настройка под любые бизнес-процессы',
]

export const Automation = () => {
  return (
    <section className='py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-transparent'>
      <div className='container mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center'>
          {/* Content */}
          <div className='space-y-6 sm:space-y-8'>
            <h2
              className='font-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight opacity-0 animate-fade-in-up break-words hyphens-auto'
              lang='ru'
            >
              Трансформируйте
              <span className='block text-foreground/90 opacity-0 animate-fade-in-up [animation-delay:200ms]'>
                ваш бизнес
              </span>
            </h2>

            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-normal opacity-0 animate-fade-in-up [animation-delay:400ms] break-words'>
              Asteum помогает компаниям автоматизировать процессы, повышать
              эффективность и масштабироваться без ограничений.
            </p>

            <ul className='space-y-4 sm:space-y-5 pt-4'>
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className='flex items-start gap-3 sm:gap-4 opacity-0 animate-fade-in-up'
                  style={{
                    animationDelay: `${600 + index * 100}ms`,
                  }}
                >
                  <CheckCircle className='h-5 w-5 sm:h-6 sm:w-6 text-foreground flex-shrink-0 mt-1' />
                  <span className='text-base sm:text-lg md:text-xl text-foreground/90 break-words'>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant='default'
              size='lg'
              className='mt-6 sm:mt-8 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium opacity-0 animate-scale-in [animation-delay:1000ms] hover-scale w-full sm:w-auto'
            >
              Запросить демо
            </Button>
          </div>

          {/* Visual element - minimal */}
          <div className='relative opacity-0 animate-scale-in [animation-delay:800ms] hidden lg:block'>
            <div className='aspect-square rounded-2xl sm:rounded-[3rem] bg-muted border border-border/50 flex items-center justify-center hover-lift transition-all'>
              <div className='text-center space-y-4 sm:space-y-6 p-8 sm:p-12'>
                <div className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground'>
                  AI
                </div>
                <div className='text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal'>
                  Powered Automation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
