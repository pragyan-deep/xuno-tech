// Contact form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

// Service types
export interface Service {
  id: string
  category: string
  title: string
  description: string
  icon: string
}

// Portfolio types
export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
}

// Technology types  
export interface Technology {
  id: string
  name: string
  logo: string
  category: string
}

// Industry types
export interface Industry {
  id: string
  name: string
  description: string
  icon: string
}

// Environment variables types
export interface EnvironmentConfig {
  APPS_SCRIPT_URL: string
  NEXT_PUBLIC_SITE_URL: string
} 