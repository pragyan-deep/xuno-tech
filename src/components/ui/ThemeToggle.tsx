'use client'

import React from 'react'
import { useTheme } from '@/hooks/useTheme'

// Simple icons as SVG components
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
)

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({ 
  variant = 'ghost',
  size = 'md',
  showLabel = false,
  className = ''
}: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme()

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  }

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <SystemIcon />
    return resolvedTheme === 'light' ? <SunIcon /> : <MoonIcon />
  }

  const getThemeLabel = () => {
    if (theme === 'system') return 'System'
    return resolvedTheme === 'light' ? 'Light' : 'Dark'
  }

  const handleClick = () => {
    // Simple toggle for now - can be enhanced to cycle through all three
    toggleTheme()
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleClick}
        className={`
          inline-flex items-center justify-center rounded-md font-medium 
          transition-all duration-200 ease-in-out
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50
          hover:scale-105 active:scale-95
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`}
        title={`Current theme: ${getThemeLabel()}. Click to toggle.`}
      >
        <span className="transition-transform duration-200 ease-in-out transform hover:rotate-12">
          {getThemeIcon()}
        </span>
        {showLabel && (
          <span className="ml-2 text-sm font-medium">
            {getThemeLabel()}
          </span>
        )}
      </button>
      
      {/* Advanced toggle with dropdown - commented for now
      <div className="relative">
        <button
          className="flex items-center space-x-1 text-sm"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Theme</span>
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-2 w-32 bg-popover border rounded-md shadow-lg">
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('system')}>System</button>
          </div>
        )}
      </div>
      */}
    </div>
  )
} 