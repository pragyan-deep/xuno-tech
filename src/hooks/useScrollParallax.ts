import { useEffect, useState, RefObject } from 'react'

// Configuration for parallax effects
export interface ParallaxConfig {
  speed?: number // Multiplier for scroll speed (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down' | 'left' | 'right'
  disabled?: boolean
}

// Default configuration
const DEFAULT_PARALLAX_CONFIG: Required<ParallaxConfig> = {
  speed: 0.5,
  direction: 'up',
  disabled: false
}

// Hook for parallax scroll effects
export function useScrollParallax(config: ParallaxConfig = {}): [RefObject<HTMLElement | null>, { transform: string }] {
  const [elementRef] = useState<RefObject<HTMLElement | null>>({ current: null })
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')

  const finalConfig = { ...DEFAULT_PARALLAX_CONFIG, ...config }
  const { speed, direction, disabled } = finalConfig

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (disabled || prefersReducedMotion) {
      setTransform('translate3d(0, 0, 0)')
      return
    }

    const handleScroll = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const scrollY = window.pageYOffset
      const elementTop = rect.top + scrollY
      const elementHeight = element.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate if element is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0

      if (!isInViewport) return

      // Calculate parallax offset
      const scrollProgress = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight)
      const parallaxOffset = (scrollProgress - 0.5) * speed * 100

      let transformValue = 'translate3d(0, 0, 0)'

      switch (direction) {
        case 'up':
          transformValue = `translate3d(0, ${-parallaxOffset}px, 0)`
          break
        case 'down':
          transformValue = `translate3d(0, ${parallaxOffset}px, 0)`
          break
        case 'left':
          transformValue = `translate3d(${-parallaxOffset}px, 0, 0)`
          break
        case 'right':
          transformValue = `translate3d(${parallaxOffset}px, 0, 0)`
          break
      }

      setTransform(transformValue)
    }

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Calculate initial position

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [speed, direction, disabled, elementRef])

  return [elementRef, { transform }]
}

// Simplified hook for basic vertical parallax
export function useParallax(speed: number = 0.5): [RefObject<HTMLElement | null>, { transform: string }] {
  return useScrollParallax({ speed, direction: 'up' })
} 