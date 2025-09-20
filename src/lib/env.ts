// Environment Variable Validation and Type Safety

interface EnvironmentVariables {
  // Google Apps Script
  APPS_SCRIPT_URL: string
  
  // Next.js Public Variables
  NEXT_PUBLIC_SITE_URL: string
  
  // Node Environment
  NODE_ENV: 'development' | 'production' | 'test'
}

class EnvironmentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvironmentError'
  }
}

function validateEnvironmentVariable(
  key: keyof EnvironmentVariables,
  value: string | undefined
): string {
  if (!value || value.trim() === '') {
    throw new EnvironmentError(
      `Missing required environment variable: ${key}\n` +
      `Please check your .env.local file or environment configuration.`
    )
  }
  
  // URL validation for URL-type variables
  if (key.includes('URL') || key.includes('_URL')) {
    try {
      new URL(value)
    } catch {
      throw new EnvironmentError(
        `Invalid URL format for environment variable: ${key}\n` +
        `Received: ${value}\n` +
        `Expected: A valid URL (e.g., https://example.com)`
      )
    }
  }
  
  return value.trim()
}

function loadEnvironmentVariables(): EnvironmentVariables {
  const nodeEnv = (process.env.NODE_ENV as EnvironmentVariables['NODE_ENV']) || 'development'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // APPS_SCRIPT_URL is optional in development but required in production
  let appsScriptUrl = process.env.APPS_SCRIPT_URL
  
  if (!appsScriptUrl) {
    if (nodeEnv === 'production') {
      throw new EnvironmentError(
        'Missing required environment variable: APPS_SCRIPT_URL\n' +
        'This is required for the contact form to work in production.\n' +
        'Please set APPS_SCRIPT_URL to your Google Apps Script Web App URL.'
      )
    } else {
      // Use placeholder for development
      appsScriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
      console.warn('⚠️  APPS_SCRIPT_URL not set. Using placeholder for development.')
    }
  }

  try {
    return {
      APPS_SCRIPT_URL: appsScriptUrl,
      NEXT_PUBLIC_SITE_URL: siteUrl,
      NODE_ENV: nodeEnv,
    }
  } catch (error) {
    if (error instanceof EnvironmentError) {
      console.error(`\n🚨 Environment Configuration Error:\n${error.message}\n`)
      
      if (nodeEnv === 'development') {
        console.log('💡 For development, create a .env.local file with:')
        console.log('APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
        console.log('NEXT_PUBLIC_SITE_URL=http://localhost:3000\n')
      }
    }
    
    throw error
  }
}

// Export validated environment variables (lazy loaded)
let _env: EnvironmentVariables | null = null
export const env = () => {
  if (!_env) {
    _env = loadEnvironmentVariables()
  }
  return _env
}

// Helper function to check if running in production
export const isProduction = () => env().NODE_ENV === 'production'

// Helper function to check if running in development
export const isDevelopment = () => env().NODE_ENV === 'development'

// Helper function to get the site URL with fallback
export const getSiteUrl = () => {
  // For build time, use environment variable directly
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }
  return env().NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
} 