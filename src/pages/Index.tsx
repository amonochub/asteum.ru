import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Automation } from '@/components/Automation'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { useScrollBackground } from '@/hooks/use-scroll-background'
import { useEffect, useState } from 'react'

const Index = () => {
  const {
    backgroundColor,
    backgroundColorDark,
    backgroundGradient,
    backgroundGradientDark,
  } = useScrollBackground()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
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
    <div className='min-h-screen relative'>
      <div
        className='fixed inset-0 -z-10 pointer-events-none'
        style={{
          backgroundImage: isDark ? backgroundGradientDark : backgroundGradient,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          willChange: 'opacity',
        }}
      />
      <Navbar />
      <Hero />
      <div id='features'>
        <Features />
      </div>
      <div id='automation'>
        <Automation />
      </div>
      <div id='pricing'>
        <CTA />
      </div>

      <Footer />
      <Toaster />
    </div>
  )
}

export default Index
