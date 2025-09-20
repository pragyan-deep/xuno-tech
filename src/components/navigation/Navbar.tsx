'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NAVIGATION_LINKS, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/hooks/useActiveSection'

// Menu icon components with performance optimization
const MenuIcon = React.memo(({ isOpen }: { isOpen: boolean }) => (
  <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1">
    <span
      className={cn(
        "block h-0.5 w-6 bg-current transition-all duration-300 ease-out will-change-transform",
        isOpen && "rotate-45 translate-y-1.5"
      )}
    />
    <span
      className={cn(
        "block h-0.5 w-6 bg-current transition-all duration-300 ease-out",
        isOpen && "opacity-0"
      )}
    />
    <span
      className={cn(
        "block h-0.5 w-6 bg-current transition-all duration-300 ease-out will-change-transform",
        isOpen && "-rotate-45 -translate-y-1.5"
      )}
    />
  </div>
))

MenuIcon.displayName = 'MenuIcon'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Use active section hook
  const activeSection = useActiveSection({
    sectionIds: NAVIGATION_LINKS.map(link => link.href.slice(1)), // Remove # from href
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0.3
  })

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10
    setIsScrolled(scrolled)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const throttledScrollHandler = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10) // 10ms throttle
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  // Handle escape key and outside clicks for mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Close mobile menu when clicking on a link
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Handle smooth scrolling to sections with performance optimization
  const handleLinkClick = useCallback((href: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault()
    closeMobileMenu()
    
    // If it's a hash link, handle smooth scrolling
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        })
        
        // Update URL without triggering navigation
        window.history.pushState(null, '', href)
      }
    }
  }, [closeMobileMenu])

  // Handle keyboard navigation for menu items
  const handleKeyDown = useCallback((event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLinkClick(href)
    }
  }, [handleLinkClick])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out will-change-transform",
        // Dynamic styling based on scroll state with better performance
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-transparent",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      ref={menuRef}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-3 font-bold text-xl text-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
              onClick={() => handleLinkClick('/')}
              aria-label={`${SITE_CONFIG.name} - Go to homepage`}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/images/xuno-tech-logo.png"
                  alt="Xuno Tech Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40px, 48px"
                  priority
                  onError={(e) => {
                    // Fallback to a simple gradient logo if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg';
                    fallback.textContent = 'XT';
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <span className="hidden sm:block text-foreground">{SITE_CONFIG.name}</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8" role="menubar">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.name}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-md",
                    "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
                    "will-change-auto", // Optimize for transitions
                    // Active link styling
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name}
                </button>
              )
            })}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle variant="ghost" size="md" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle variant="ghost" size="sm" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={`${isMenuOpen ? 'Close' : 'Open'} main menu`}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out border-t border-border/50 will-change-auto",
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    "hover:text-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  )}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 