import { useEffect, useState } from 'react'

export const useScrollBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = Math.min(currentScroll / totalScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth the visual progress to avoid banding and jumps
  useEffect(() => {
    let af = 0
    const animate = () => {
      setDisplayProgress(prev => {
        const next = prev + (scrollProgress - prev) * 0.08 // inertia smoothing
        if (Math.abs(next - scrollProgress) < 0.001) {
          return scrollProgress
        }
        af = requestAnimationFrame(animate)
        return next
      })
    }
    af = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(af)
  }, [scrollProgress])

  // Smooth sunrise progression without stops — continuous curve (no seams)
  const getBackgroundColor = (progress: number) => {
    // Cosine ease for C1 continuity across the whole range
    const ease = (t: number) =>
      (1 - Math.cos(Math.PI * Math.min(Math.max(t, 0), 1))) / 2
    const t = ease(progress)

    // Continuous HSL drift from cool morning to warm daylight
    const h = 210 + (40 - 210) * t // 210 -> 40
    const s = 22 + (46 - 22) * t // 22  -> 46
    const l = 97 + (90 - 97) * t // 97  -> 90

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  const interpolateColor = (
    color1: { h: number; s: number; l: number },
    color2: { h: number; s: number; l: number },
    progress: number
  ) => {
    const h = color1.h + (color2.h - color1.h) * progress
    const s = color1.s + (color2.s - color1.s) * progress
    const l = color1.l + (color2.l - color1.l) * progress
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  // Dark mode — variable sunset gradient
  const getBackgroundColorDark = (_progress: number) => {
    // Warm sunset color tuned for dark UI
    return 'hsl(22, 62%, 11%)'
  }

  // Light theme: sunrise vertical gradient, smoothly evolving with scroll
  const getBackgroundGradient = (progress: number) => {
    const ease = (t: number) =>
      (1 - Math.cos(Math.PI * Math.min(Math.max(t, 0), 1))) / 2
    const t = ease(progress)

    // Top stays slightly cooler and brighter, bottom warms up as we scroll
    const hTop = 210 + (180 - 210) * t
    const sTop = 12 + (22 - 12) * t
    const lTop = 99 + (96 - 99) * t

    const hBottom = 210 + (40 - 210) * t
    const sBottom = 22 + (46 - 22) * t
    const lBottom = 97 + (90 - 97) * t

    return `linear-gradient(180deg, hsl(${hTop}, ${sTop}%, ${lTop}%) 0%, hsl(${hBottom}, ${sBottom}%, ${lBottom}%) 100%)`
  }

  // Dark theme: sunset gradient from deep night at top to warm horizon at bottom
  const getBackgroundGradientDark = (progress: number) => {
    const ease = (t: number) =>
      (1 - Math.cos(Math.PI * Math.min(Math.max(t, 0), 1))) / 2
    const t = ease(progress)

    // Top remains near-night; bottom gains warm sunset tint
    const hTop = 210 + (200 - 210) * t
    const sTop = 10 + (12 - 10) * t
    const lTop = 7 + (8 - 7) * t

    const hBottom = 22
    const sBottom = 62
    const lBottom = 11 + (14 - 11) * t

    return `linear-gradient(180deg, hsl(${hTop}, ${sTop}%, ${lTop}%) 0%, hsl(${hBottom}, ${sBottom}%, ${lBottom}%) 100%)`
  }

  return {
    scrollProgress,
    backgroundColor: getBackgroundColor(displayProgress),
    backgroundColorDark: getBackgroundColorDark(displayProgress),
    backgroundGradient: getBackgroundGradient(displayProgress),
    backgroundGradientDark: getBackgroundGradientDark(displayProgress),
  }
}
