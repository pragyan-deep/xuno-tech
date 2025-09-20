'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

// Input component with consistent styling
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error?: string
  }
>(({ className, label, error, ...props }, ref) => (
  <div className="space-y-2">
    <label 
      htmlFor={props.id}
      className="block text-sm font-medium text-foreground"
    >
      {label}
      {props.required && <span className="text-destructive ml-1">*</span>}
    </label>
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "transition-colors duration-200 ease-in-out",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
      {...props}
    />
    {error && (
      <p className="text-sm text-destructive animate-fade-in">{error}</p>
    )}
  </div>
))
Input.displayName = 'Input'

// Textarea component with consistent styling
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string
    error?: string
  }
>(({ className, label, error, ...props }, ref) => (
  <div className="space-y-2">
    <label 
      htmlFor={props.id}
      className="block text-sm font-medium text-foreground"
    >
      {label}
      {props.required && <span className="text-destructive ml-1">*</span>}
    </label>
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "transition-colors duration-200 ease-in-out",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
      {...props}
    />
    {error && (
      <p className="text-sm text-destructive animate-fade-in">{error}</p>
    )}
  </div>
))
Textarea.displayName = 'Textarea'

// Loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactFormProps {
  className?: string
  onSubmit?: (data: ContactFormData) => Promise<void>
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Handle input changes
  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    
    // Reset submit status when user modifies form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        // Use custom onSubmit handler if provided
        await onSubmit(formData)
      } else {
        // Make API call to contact endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send message')
        }

        console.log('Contact form submitted successfully:', result)
      }
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' }) // Reset form
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <Input
          id="contact-name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
          error={errors.name}
          disabled={isSubmitting}
        />

        {/* Email Field */}
        <Input
          id="contact-email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your.email@example.com"
          required
          error={errors.email}
          disabled={isSubmitting}
        />

        {/* Message Field */}
        <Textarea
          id="contact-message"
          label="Message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us about your project, questions, or how we can help you..."
          required
          error={errors.message}
          disabled={isSubmitting}
          rows={5}
        />

        {/* Submit Button */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full inline-flex items-center justify-center rounded-md px-6 py-3",
              "text-sm font-medium transition-all duration-200 ease-in-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isSubmitting
                ? "bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transform hover:scale-105 active:scale-95"
            )}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Sending Message...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </button>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="p-4 rounded-md bg-success/10 border border-success/20 animate-fade-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-success">Message sent successfully!</h3>
                  <p className="text-sm text-success/80 mt-1">
                    Thank you for contacting us. We&apos;ll get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 animate-fade-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-destructive">Message could not be sent</h3>
                  <p className="text-sm text-destructive/80 mt-1">
                    There was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
} 