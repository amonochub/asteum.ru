import { useRef, useEffect } from 'react'

interface MagneticEffectOptions {
  strength?: number
  disabled?: boolean
}

export const useMagneticEffect = <T extends HTMLElement>(
  options: MagneticEffectOptions = {}
) => {
  const { strength = 0.3, disabled = false } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    if (disabled) {
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, disabled])

  return ref
}
