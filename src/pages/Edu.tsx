import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  CheckCircle2,
  BarChart3,
  FileText,
  Users,
  Shield,
  Link2,
  MessageSquare,
  Bell,
  Presentation,
  TrendingUp,
  FileBarChart,
  Megaphone,
  Palette,
  Trophy,
  Newspaper,
  Shirt,
  Video,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useScrollBackground } from '@/hooks/use-scroll-background'

const Edu = () => {
  const {
    backgroundColor,
    backgroundColorDark,
    backgroundGradient,
    backgroundGradientDark,
  } = useScrollBackground()
  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    organization: '',
    role: '',
    schoolsCount: '',
    scenarios: '',
    integrations: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Спасибо!',
      description: 'Ответим в течение рабочего дня.',
    })
    setFormData({
      name: '',
      contact: '',
      organization: '',
      role: '',
      schoolsCount: '',
      scenarios: '',
      integrations: '',
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    document.title =
      'Asteum для образования — автоматизация, медиа и аналитика для школ'

    // Check theme on mount and listen for changes
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className='min-h-screen relative'>
        <div
          className='fixed inset-0 -z-10 pointer-events-none'
          style={{
            backgroundImage: isDark
              ? backgroundGradientDark
              : backgroundGradient,
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            willChange: 'opacity',
          }}
        />
        {/* Navigation */}
        <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/50 transition-colors'>
          <div className='container mx-auto px-4 sm:px-6'>
            <div className='flex items-center justify-between h-14 sm:h-16 md:h-20'>
              <a
                href='/'
                className='text-lg sm:text-xl font-semibold hover:opacity-70 transition-opacity'
              >
                Asteum
              </a>
              <div className='flex items-center gap-3 sm:gap-4 md:gap-6'>
                <button
                  onClick={() => scrollToSection('services')}
                  className='hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors font-normal'
                >
                  Услуги
                </button>
                <ThemeToggle />
                <Button
                  onClick={() => scrollToSection('brief')}
                  variant='default'
                  size='sm'
                  className='rounded-full h-9 sm:h-10 px-4 sm:px-6 text-sm font-medium hover-scale'
                >
                  Запросить пилот
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className='relative min-h-screen flex items-center justify-center bg-transparent px-4'>
          <div className='container mx-auto px-4 sm:px-6 py-20 sm:py-32 md:py-40 relative z-10'>
            <div className='flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-6xl mx-auto'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-unbounded font-extrabold tracking-tight leading-[1.1] sm:leading-[0.95] opacity-0 animate-fade-in-up break-words'>
                Комплексные решения для образования
              </h1>
              <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-normal mt-4 sm:mt-6 opacity-0 animate-fade-in-up [animation-delay:200ms] break-words'>
                Автоматизация процессов, медиа сопровождение, визуализация
                данных, контент для соцсетей.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8 sm:pt-12 opacity-0 animate-scale-in [animation-delay:400ms] w-full sm:w-auto'>
                <Button
                  onClick={() => scrollToSection('brief')}
                  variant='default'
                  size='lg'
                  className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium hover-scale w-full sm:w-auto'
                >
                  Запросить пилот
                </Button>
                <Button
                  onClick={() => scrollToSection('services')}
                  variant='outline'
                  size='lg'
                  className='rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium hover-scale w-full sm:w-auto'
                >
                  Посмотреть услуги
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className='py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-transparent'>
          <div className='container mx-auto max-w-7xl'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold tracking-tight mb-12 sm:mb-20 text-center opacity-0 animate-fade-in-up'>
              Кому это полезно
            </h2>
            <div className='grid md:grid-cols-2 gap-4 sm:gap-6'>
              {[
                {
                  icon: BarChart3,
                  title: 'Департамент образования',
                  desc: 'Аналитика, визуализация данных, презентации для отчётности',
                },
                {
                  icon: Users,
                  title: 'Администрации школ',
                  desc: 'Автоматизация процессов, медиа сопровождение, обращения',
                },
                {
                  icon: Megaphone,
                  title: 'Пресс-службы школ',
                  desc: 'Контент для соцсетей, пресс-релизы, оформление мероприятий',
                },
                {
                  icon: Video,
                  title: 'Медиа и маркетинг',
                  desc: 'Видео, фото, афиши, баннеры, брендинг',
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className='p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2rem] bg-background border border-border/50 hover:border-border transition-all opacity-0 animate-slide-up hover-lift hover-glow overflow-hidden'
                  style={{ animationDelay: `${200 + idx * 150}ms` }}
                >
                  <CardHeader className='p-0'>
                    <div className='flex items-start gap-3 sm:gap-4 mb-4'>
                      <div className='p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted flex-shrink-0'>
                        <item.icon className='w-5 h-5 sm:w-6 sm:h-6 text-foreground' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <CardTitle className='text-xl sm:text-2xl md:text-3xl tracking-tight break-words'>
                          {item.title}
                        </CardTitle>
                        <CardDescription className='text-base sm:text-lg mt-2 sm:mt-3 break-words'>
                          {item.desc}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Full Services Section */}
        <section id='services' className='py-20 sm:py-32 md:py-40 px-4 sm:px-6'>
          <div className='container mx-auto max-w-7xl'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold tracking-tight mb-6 sm:mb-8 text-center opacity-0 animate-fade-in-up'>
              Полный спектр услуг
            </h2>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 sm:mb-20 text-center max-w-4xl mx-auto font-normal opacity-0 animate-fade-in-up [animation-delay:200ms] px-4'>
              Комплексное решение всех задач: от автоматизации до брендинга
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {[
                {
                  icon: MessageSquare,
                  title: 'Автоматизация и боты',
                  items: [
                    'Telegram-боты для обращений',
                    'Единое окно заявок',
                    'Автоматизация рутинных процессов',
                    'Интеграция с учётными системами',
                  ],
                },
                {
                  icon: Megaphone,
                  title: 'Маркетинг и коммуникации',
                  items: [
                    'Ведение соцсетей (VK, Telegram)',
                    'Афиши, баннеры, рассылки',
                    'Пресс-релизы и тексты для сайта',
                    'Адаптация приказов для сотрудников',
                  ],
                },
                {
                  icon: Presentation,
                  title: 'Визуализация и презентации',
                  items: [
                    'Интерактивные дашборды',
                    'Презентации для руководства',
                    'Инфографика и отчёты',
                    'Автоматизация отчётности',
                  ],
                },
                {
                  icon: Trophy,
                  title: 'Образовательные проекты',
                  items: [
                    'Ведение конкурсных проектов',
                    'Методическая поддержка',
                    'Документация для конкурсов',
                    'Презентация достижений',
                  ],
                },
                {
                  icon: Video,
                  title: 'Медиа сопровождение',
                  items: [
                    'Комплексное медиа сопровождение школы',
                    'Видеопроизводство и монтаж',
                    'Фотосъёмка мероприятий',
                    'Контент для соцсетей',
                  ],
                },
                {
                  icon: Shirt,
                  title: 'Брендинг и мерч',
                  items: [
                    'Разработка фирменного стиля',
                    'Дизайн мерча и сувениров',
                    'Корпоративная символика',
                    'Брендированная продукция',
                  ],
                },
              ].map((service, idx) => (
                <Card
                  key={idx}
                  className='p-8 md:p-10 rounded-[2rem] bg-background border border-border/50 hover:border-border transition-all opacity-0 animate-slide-up hover-lift hover-glow overflow-hidden'
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <CardHeader className='p-0 mb-6'>
                    <div className='flex items-start gap-4 mb-2'>
                      <div className='w-14 h-14 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0'>
                        <service.icon className='w-7 h-7 text-foreground' />
                      </div>
                      <CardTitle className='text-2xl md:text-3xl tracking-tight break-words flex-1 font-semibold'>
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <ul className='space-y-4'>
                      {service.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className='flex items-start gap-3 text-base md:text-lg text-foreground/70'
                        >
                          <CheckCircle2 className='w-5 h-5 text-foreground mt-1 flex-shrink-0' />
                          <span className='break-words flex-1 leading-relaxed'>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className='mt-16 text-center opacity-0 animate-fade-in [animation-delay:1000ms]'>
              <p className='text-xl text-muted-foreground mb-8 font-normal'>
                Работаем как с отдельными направлениями, так и предоставляем
                комплексные решения
              </p>
              <Button
                onClick={() => scrollToSection('brief')}
                variant='default'
                size='lg'
                className='rounded-full px-8 h-14 text-lg font-medium'
              >
                Обсудить проект
              </Button>
            </div>
          </div>
        </section>

        {/* Pilot Program */}
        <section className='py-20 px-6'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center opacity-0 animate-fade-in-up'>
              Пилот за 4 месяца
            </h2>
            <div className='grid md:grid-cols-4 gap-6'>
              {[
                {
                  week: 'Месяц 1',
                  desc: 'Сценарии, роли, формы, согласование регламентов',
                },
                {
                  week: 'Месяц 2',
                  desc: 'Запуск в 3–5 школах, инструкции персоналу',
                },
                {
                  week: 'Месяц 3',
                  desc: 'Настройка напоминаний, эскалаций, шаблонов ответов',
                },
                {
                  week: 'Месяц 4',
                  desc: 'Отчёт с метриками (объём, темы, среднее время ответа, закрытия)',
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className='opacity-0 animate-scale-in hover-lift transition-all overflow-hidden rounded-2xl bg-background border border-border/50'
                  style={{ animationDelay: `${200 + idx * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className='text-xl md:text-2xl font-semibold text-foreground mb-2 break-words'>
                      {item.week}
                    </CardTitle>
                    <CardDescription className='text-base md:text-lg text-foreground/70 leading-relaxed break-words'>
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <p className='text-center text-muted-foreground mt-8 opacity-0 animate-fade-in [animation-delay:600ms]'>
              Далее — масштабирование шаблонов на всю сеть
            </p>
          </div>
        </section>

        {/* Features */}
        <section className='py-20 px-6 bg-transparent'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center opacity-0 animate-fade-in-up'>
              Функции, которые решают задачи
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {[
                {
                  icon: MessageSquare,
                  title: 'Обращения и заявки',
                  desc: 'Типы/категории, приоритеты, эскалация',
                },
                {
                  icon: Users,
                  title: 'Роли и права',
                  desc: 'Кто видит, кто назначает, кто закрывает',
                },
                {
                  icon: Bell,
                  title: 'Уведомления',
                  desc: 'Дедлайны, просрочки, ежедневные дайджесты',
                },
                {
                  icon: BarChart3,
                  title: 'Отчёты и фильтры',
                  desc: 'По школе, теме, срокам; выгрузки в XLSX/Sheets',
                },
                {
                  icon: FileText,
                  title: 'Информирование',
                  desc: 'Локальные новости, расписания, контакты',
                },
                {
                  icon: Shield,
                  title: 'Анонимная связь',
                  desc: 'По политике школы, с модерацией и журналом',
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className='rounded-2xl bg-background border border-border/50 opacity-0 animate-slide-up hover-lift hover-glow transition-all overflow-hidden'
                  style={{ animationDelay: `${200 + idx * 100}ms` }}
                >
                  <CardHeader className='p-6'>
                    <div className='flex items-center gap-3 mb-2'>
                      <item.icon className='w-6 h-6 text-primary flex-shrink-0' />
                      <CardTitle className='text-xl md:text-2xl font-semibold tracking-tight break-words flex-1'>
                        {item.title}
                      </CardTitle>
                    </div>
                    <CardDescription className='text-base md:text-lg text-foreground/70 leading-relaxed break-words mt-1'>
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className='py-20 px-6'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-6 text-center opacity-0 animate-fade-in-up'>
              Безопасность и обработка данных
            </h2>
            <Card className='max-w-4xl mx-auto opacity-0 animate-scale-in [animation-delay:200ms] hover-lift transition-all'>
              <CardContent className='pt-6'>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-primary mt-0.5 flex-shrink-0' />
                    <span className='break-words flex-1'>
                      Роли и разграничение доступа по уровням
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-primary mt-0.5 flex-shrink-0' />
                    <span className='break-words flex-1'>
                      Модерация контента и журнал действий
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-primary mt-0.5 flex-shrink-0' />
                    <span className='break-words flex-1'>
                      Хранение данных по политике заказчика (облако/на стороне
                      заказчика)
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-primary mt-0.5 flex-shrink-0' />
                    <span className='break-words flex-1'>
                      Сроки хранения/удаления — по согласованию с юристами
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Integrations */}
        <section className='py-20 px-6 bg-transparent'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-6 text-center opacity-0 animate-fade-in-up'>
              Интеграции — по мере готовности
            </h2>
            <div className='max-w-4xl mx-auto'>
              <Card className='opacity-0 animate-scale-in [animation-delay:200ms] hover-lift transition-all overflow-hidden'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 break-words'>
                    <Link2 className='w-6 h-6 text-primary flex-shrink-0' />
                    <span className='flex-1'>Доступные интеграции</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <h3 className='font-semibold mb-2 break-words'>
                        Из коробки:
                      </h3>
                      <ul className='space-y-1 text-muted-foreground'>
                        <li className='break-words'>
                          • Таблицы (Google Sheets, Excel)
                        </li>
                        <li className='break-words'>• Почта</li>
                        <li className='break-words'>• Веб-хуки</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='font-semibold mb-2 break-words'>
                        Опционально:
                      </h3>
                      <ul className='space-y-1 text-muted-foreground'>
                        <li className='break-words'>
                          • CRM/1С/учётные системы
                        </li>
                        <li className='break-words'>• Календарь</li>
                        <li className='break-words'>
                          • Экспорт отчётов в XLSX/Sheets
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section id='cases' className='py-20 px-6'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center opacity-0 animate-fade-in-up'>
              Кейсы
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              {[
                {
                  title: 'Школа №47',
                  desc: 'Единое окно заявок',
                  result: '↓ 40% время ответа\n↑ 85% доля закрытия в срок',
                },
                {
                  title: 'Медиацентр',
                  desc: 'Записи и ресурсы',
                  result: '↓ 60% накладок\n↑ 95% удовлетворённость',
                },
                {
                  title: 'Сервис-бот',
                  desc: 'Статусы и SLA',
                  result: '100% прозрачность\nПредсказуемые сроки',
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className='hover:shadow-lg transition-all opacity-0 animate-scale-in hover-lift hover-glow overflow-hidden'
                  style={{ animationDelay: `${200 + idx * 150}ms` }}
                >
                  <CardHeader>
                    <CardTitle className='text-xl mb-2 break-words'>
                      {item.title}
                    </CardTitle>
                    <CardDescription className='mb-4 break-words'>
                      {item.desc}
                    </CardDescription>
                    <div className='text-sm font-semibold text-primary whitespace-pre-line break-words'>
                      {item.result}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className='py-20 px-6 bg-transparent'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center opacity-0 animate-fade-in-up'>
              Частые вопросы
            </h2>
            <Accordion
              type='single'
              collapsible
              className='w-full opacity-0 animate-fade-in [animation-delay:200ms]'
            >
              {[
                {
                  q: 'Можно стартовать без интеграций?',
                  a: 'Да, достаточно таблиц и почты. Подключение учётных систем — позже.',
                },
                {
                  q: 'Кто видит обращения?',
                  a: 'Только назначенные роли. Анонимные сообщения — по политике школы.',
                },
                {
                  q: 'Сколько длится пилот?',
                  a: '30 дней: запуск, обучение, отчёт с метриками.',
                },
                {
                  q: 'Как масштабировать на весь округ/город?',
                  a: 'Через шаблоны сценариев и общие справочники на уровне округа/города.',
                },
                {
                  q: 'Можно без ИИ?',
                  a: 'Да. ИИ-слой подключается позже на базе ваших знаний.',
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className='text-left'>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground'>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Brief Form */}
        <section id='brief' className='py-20 px-6'>
          <div className='container mx-auto max-w-2xl'>
            <h2 className='text-3xl md:text-4xl font-unbounded font-bold mb-6 text-center opacity-0 animate-fade-in-up'>
              Запросить пилот
            </h2>
            <p className='text-center text-muted-foreground mb-10 opacity-0 animate-fade-in [animation-delay:200ms]'>
              Заполните форму, и мы свяжемся с вами в течение рабочего дня
            </p>
            <Card className='opacity-0 animate-scale-in [animation-delay:400ms] hover-lift transition-all'>
              <CardContent className='pt-6'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Имя
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={e =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Почта/Telegram
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.contact}
                      onChange={e =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Организация
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.organization}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Роль
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.role}
                      onChange={e =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Сколько школ пилотируем?
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.schoolsCount}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          schoolsCount: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Какие сценарии важны?
                    </label>
                    <textarea
                      required
                      value={formData.scenarios}
                      onChange={e =>
                        setFormData({ ...formData, scenarios: e.target.value })
                      }
                      rows={3}
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Нужны ли интеграции сейчас?
                    </label>
                    <textarea
                      value={formData.integrations}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          integrations: e.target.value,
                        })
                      }
                      rows={2}
                      className='w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>
                  <Button
                    type='submit'
                    variant='default'
                    size='lg'
                    className='w-full rounded-full h-14 text-lg font-medium'
                  >
                    Отправить заявку на пилот
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
        <Toaster />
      </div>
    </>
  )
}

export default Edu
