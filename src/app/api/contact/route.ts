import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'

// Type definitions
interface ContactFormData {
  name: string
  email: string
  message: string
}

interface GoogleSheetsPayload {
  name: string
  email: string
  message: string
  timestamp: string
  userAgent: string
  ipAddress: string
}

// Validation function
function validateContactData(data: unknown): data is ContactFormData {
  if (!data || typeof data !== 'object') return false
  
  const { name, email, message } = data as Record<string, unknown>
  
  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return false
  }
  
  // Email validation
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false
  
  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return false
  }
  
  return true
}

// Sanitize input data
function sanitizeData(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim().replace(/[<>]/g, ''),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim().replace(/[<>]/g, '')
  }
}

// Send data to Google Sheets via Apps Script
async function sendToGoogleSheets(data: GoogleSheetsPayload): Promise<void> {
  const appsScriptUrl = env().APPS_SCRIPT_URL
  
  if (!appsScriptUrl || appsScriptUrl.includes('YOUR_SCRIPT_ID')) {
    throw new Error('Google Apps Script URL not configured')
  }

  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`)
  }

  const result = await response.json()
  if (result.error) {
    throw new Error(`Google Sheets processing error: ${result.error}`)
  }
}

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const key = ip
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Clean up expired rate limit records
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Clean up every minute

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // Parse request body
    let body: unknown
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body.',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    // Validate data
    if (!validateContactData(body)) {
      return NextResponse.json(
        { 
          error: 'Invalid or missing required fields. Please check name (min 2 chars), email format, and message (min 10 chars).',
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    // Sanitize data
    const sanitizedData = sanitizeData(body)

    // Prepare payload for Google Sheets
    const sheetsPayload: GoogleSheetsPayload = {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ipAddress: ip
    }

    // Send to Google Sheets
    try {
      await sendToGoogleSheets(sheetsPayload)
    } catch (error) {
      console.error('Google Sheets integration error:', error)
      
      // Return different error messages based on environment
      if (env().NODE_ENV === 'development') {
        return NextResponse.json(
          { 
            error: `Google Sheets integration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            code: 'SHEETS_INTEGRATION_ERROR'
          },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { 
            error: 'Message could not be sent. Please try again or contact us directly.',
            code: 'INTEGRATION_ERROR'
          },
          { status: 500 }
        )
      }
    }

    // Success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Your message has been sent successfully. We\'ll get back to you soon!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact API error:', error)
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact forms.' },
    { status: 405 }
  )
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact forms.' },
    { status: 405 }
  )
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact forms.' },
    { status: 405 }
  )
} 