import { Zap, Shield, Workflow, Clock } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Zap,
    title: 'Молниеносная скорость',
    description:
      'Обрабатывайте тысячи операций в секунду с минимальной задержкой',
  },
  {
    icon: Shield,
    title: 'Максимальная безопасность',
    description: 'Защита корпоративного уровня для ваших данных и процессов',
  },
  {
    icon: Workflow,
    title: 'Умная автоматизация',
    description: 'ИИ-powered решения для оптимизации ваших бизнес-процессов',
  },
  {
    icon: Clock,
    title: 'Экономия времени',
    description: 'Сократите время на рутинные задачи до 90%',
  },
]

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn(
        'group p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2rem] bg-background border border-border/50 hover:border-border transition-all duration-700 hover-lift hover-glow overflow-hidden',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Icon */}
      <div className='mb-6 sm:mb-8 inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted text-foreground'>
        <feature.icon className='h-6 w-6 sm:h-7 sm:w-7' />
      </div>

      {/* Content */}
      <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 tracking-tight break-words'>
        {feature.title}
      </h3>
      <p className='text-base sm:text-lg text-muted-foreground leading-relaxed break-words'>
        {feature.description}
      </p>
    </div>
  )
}

export const Features = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.3,
  })

  return (
    <section className='py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-transparent'>
      <div className='container mx-auto max-w-7xl'>
        <div
          ref={titleRef}
          className={cn(
            'text-center mb-12 sm:mb-20 space-y-4 sm:space-y-6 transition-all duration-700',
            titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
        >
          <h2 className='font-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4'>
            Почему <span className='text-foreground/90'>Asteum</span>
          </h2>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-normal px-4'>
            Передовые технологии для вашего бизнеса
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
