// Contact Form Validation
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  message?: string
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
} 