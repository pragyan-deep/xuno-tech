import { useEffect, useState } from 'react'

interface UseActiveSectionOptions {
  sectionIds: string[]
  rootMargin?: string
  threshold?: number
}

export function useActiveSection({
  sectionIds,
  rootMargin = '-20% 0px -35% 0px',
  threshold = 0.3
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    // Get all section elements
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sectionElements.length === 0) {
      return
    }

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting sections
        const intersectingSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target.id)
          .filter(id => id !== '')

        if (intersectingSections.length > 0) {
          // If multiple sections are intersecting, choose the first one
          // or implement more sophisticated logic based on intersection ratio
          const sortedEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => {
              // Sort by intersection ratio (descending) and then by position
              const ratioDiff = b.intersectionRatio - a.intersectionRatio
              if (Math.abs(ratioDiff) > 0.1) {
                return ratioDiff
              }
              // If ratios are similar, prefer the one higher on the page
              return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
            })

          if (sortedEntries.length > 0) {
            const mostRelevantSection = sortedEntries[0].target.id
            setActiveSection(mostRelevantSection)
          }
        } else {
          // No sections intersecting - determine closest section
          const viewportCenter = window.innerHeight / 2
          let closestSection = ''
          let closestDistance = Infinity

          sectionElements.forEach(element => {
            const rect = element.getBoundingClientRect()
            const sectionCenter = rect.top + rect.height / 2
            const distance = Math.abs(sectionCenter - viewportCenter)

            if (distance < closestDistance) {
              closestDistance = distance
              closestSection = element.id
            }
          })

          if (closestSection) {
            setActiveSection(closestSection)
          }
        }
      },
      {
        rootMargin,
        threshold: [0, threshold, 0.5, 0.8, 1.0]
      }
    )

    // Observe all sections
    sectionElements.forEach(element => {
      observer.observe(element)
    })

    // Set initial active section
    const checkInitialSection = () => {
      const hash = window.location.hash.slice(1)
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash)
      } else {
        // Find the section closest to the top of the viewport
        let topSection = ''
        let minDistance = Infinity

        sectionElements.forEach(element => {
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top)

          if (distance < minDistance && rect.top <= window.innerHeight / 2) {
            minDistance = distance
            topSection = element.id
          }
        })

        if (topSection) {
          setActiveSection(topSection)
        } else if (sectionElements.length > 0) {
          // Default to first section if no section is prominently visible
          setActiveSection(sectionElements[0].id)
        }
      }
    }

    // Check initial section after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkInitialSection, 100)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [sectionIds, rootMargin, threshold])

  return activeSection
} 