import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='border-t border-border bg-card/50'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h3 className='font-semibold mb-4'>О компании</h3>
            <p className='text-sm text-muted-foreground break-words'>
              ООО "Астеум"
              <br />
              ИНН: 1234567890
              <br />
              ОГРН: 1234567890123
            </p>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Контакты</h3>
            <p className='text-sm text-muted-foreground break-words'>
              Email: info@asteum.ru
              <br />
              Адрес: Россия, г. Москва
            </p>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Правовая информация</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link
                  to='/privacy'
                  className='hover:text-primary transition-colors'
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  to='/terms'
                  className='hover:text-primary transition-colors'
                >
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link
                  to='/cookies'
                  className='hover:text-primary transition-colors'
                >
                  Политика использования cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-border pt-8'>
          <div className='text-center text-sm text-muted-foreground'>
            <p className='break-words'>© 2024 Asteum. Все права защищены.</p>
            <p className='mt-2 break-words px-4'>
              Информация на сайте не является публичной офертой. Характеристики
              и комплектация услуг могут быть изменены без предварительного
              уведомления.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
