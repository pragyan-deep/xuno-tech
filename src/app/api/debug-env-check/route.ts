import { NextResponse } from 'next/server'

export async function GET() {
  // Only allow this in development or with a special header for security
  const isDev = process.env.NODE_ENV === 'development'
  
  // For production debugging, we'll allow it but with limited info
  const envData = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
    APPS_SCRIPT_URL_EXISTS: process.env.APPS_SCRIPT_URL ? 'YES' : 'NO',
    APPS_SCRIPT_URL_LENGTH: process.env.APPS_SCRIPT_URL?.length || 0,
    APPS_SCRIPT_URL_STARTS_WITH: process.env.APPS_SCRIPT_URL 
      ? process.env.APPS_SCRIPT_URL.substring(0, 50) + '...' 
      : 'MISSING',
    TIMESTAMP: new Date().toISOString()
  }

  return NextResponse.json(envData)
} 