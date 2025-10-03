import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export const TextReveal = ({
  text,
  className,
  delay = 0,
  duration = 50,
  as: Component = 'span',
}: TextRevealProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, duration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay, duration])

  return (
    <Component className={cn(className)}>
      {displayedText}
      {!isComplete && <span className='animate-pulse'>|</span>}
    </Component>
  )
}
