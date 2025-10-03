import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export const CTA = () => {
  const handleFreeTrial = () => {
    toast({
      title: 'Отлично!',
      description:
        'Мы свяжемся с вами для настройки бесплатного пробного периода',
    })
  }

  const handleContact = () => {
    toast({
      title: 'Связаться с нами',
      description: 'Наша команда скоро с вами свяжется',
    })
  }

  return (
    <section className='py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-transparent'>
      <div className='container mx-auto max-w-6xl'>
        <div className='relative rounded-2xl sm:rounded-[3rem] bg-muted border border-border/50 overflow-hidden hover-lift hover-glow transition-all'>
          <div className='px-6 sm:px-8 md:px-16 py-16 sm:py-20 md:py-24 lg:py-32 text-center space-y-6 sm:space-y-8'>
            <h2 className='font-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight break-words'>
              Готовы начать
              <span className='block text-foreground/90 mt-2'>
                автоматизацию?
              </span>
            </h2>

            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed px-4 break-words'>
              Присоединяйтесь к тысячам компаний, которые уже используют Asteum
              для оптимизации своих процессов
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-4'>
              <Button
                variant='default'
                size='lg'
                className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium hover-scale w-full sm:w-auto'
                onClick={handleFreeTrial}
              >
                Попробовать бесплатно
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium hover-scale w-full sm:w-auto'
                onClick={handleContact}
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
