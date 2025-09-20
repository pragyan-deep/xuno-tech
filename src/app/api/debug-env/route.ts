import { NextResponse } from 'next/server'

export async function GET() {
  // Only allow in development or if a debug token is provided
  const isDev = process.env.NODE_ENV === 'development'
  
  if (!isDev) {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }
  
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    APPS_SCRIPT_URL: process.env.APPS_SCRIPT_URL ? 'SET' : 'MISSING',
    APPS_SCRIPT_URL_VALUE: process.env.APPS_SCRIPT_URL?.substring(0, 50) + '...',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    timestamp: new Date().toISOString()
  })
} 