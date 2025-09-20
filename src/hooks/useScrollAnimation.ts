import { useEffect, useRef, useState, RefObject } from 'react'

// Animation configuration interface
export interface ScrollAnimationConfig {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  duration?: number
  disabled?: boolean
}

// Default configuration
const DEFAULT_CONFIG: Required<ScrollAnimationConfig> = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  triggerOnce: true,
  delay: 0,
  duration: 600,
  disabled: false
}

// Hook for single element animation
export function useScrollAnimation<T extends Element = Element>(
  config: ScrollAnimationConfig = {}
): [RefObject<T | null>, boolean] {
  const elementRef = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { threshold, rootMargin, triggerOnce, disabled } = finalConfig

  useEffect(() => {
    const element = elementRef.current
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!element || disabled || prefersReducedMotion) {
      // If animations are disabled, immediately show content
      if (!disabled && prefersReducedMotion) {
        setIsInView(true)
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            
            if (triggerOnce) {
              setHasTriggered(true)
              observer.unobserve(element)
            }
          } else if (!triggerOnce && !hasTriggered) {
            setIsInView(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, disabled, hasTriggered])

  return [elementRef, isInView]
}

// Hook for staggered animations (multiple elements)
export function useStaggeredScrollAnimation<T extends Element = Element>(
  itemCount: number,
  config: ScrollAnimationConfig & { staggerDelay?: number } = {}
): [RefObject<T | null>, boolean[]] {
  const containerRef = useRef<T>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  )
  const [hasTriggered, setHasTriggered] = useState(false)

  const finalConfig = { ...DEFAULT_CONFIG, staggerDelay: 100, ...config }
  const { threshold, rootMargin, triggerOnce, staggerDelay, disabled } = finalConfig

  useEffect(() => {
    const container = containerRef.current
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!container || disabled || prefersReducedMotion) {
      // If animations are disabled, immediately show all items
      if (!disabled && prefersReducedMotion) {
        setVisibleItems(new Array(itemCount).fill(true))
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            // Trigger staggered animation
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const updated = [...prev]
                  updated[i] = true
                  return updated
                })
              }, i * staggerDelay)
            }

            if (triggerOnce) {
              setHasTriggered(true)
              observer.unobserve(container)
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
      observer.disconnect()
    }
  }, [itemCount, threshold, rootMargin, triggerOnce, staggerDelay, disabled, hasTriggered])

  return [containerRef, visibleItems]
}

// Hook for scroll progress (useful for progress indicators)
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / documentHeight
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    const handleScroll = () => {
      requestAnimationFrame(calculateScrollProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    calculateScrollProgress() // Calculate initial progress

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollProgress
}

// Utility function to get animation classes
export function getAnimationClasses(
  isVisible: boolean,
  animationType: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' = 'fade-in-up'
): string {
  const baseClasses = 'transition-all duration-700 ease-out'
  
  if (!isVisible) {
    switch (animationType) {
      case 'fade-in':
        return `${baseClasses} opacity-0`
      case 'fade-in-up':
        return `${baseClasses} opacity-0 translate-y-8`
      case 'fade-in-down':
        return `${baseClasses} opacity-0 -translate-y-8`
      case 'fade-in-left':
        return `${baseClasses} opacity-0 -translate-x-8`
      case 'fade-in-right':
        return `${baseClasses} opacity-0 translate-x-8`
      case 'scale-in':
        return `${baseClasses} opacity-0 scale-95`
      default:
        return `${baseClasses} opacity-0 translate-y-8`
    }
  }
  
  return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`
}

// Utility for creating animation delay
export function getStaggerDelay(index: number, baseDelay = 100): number {
  return index * baseDelay
} 