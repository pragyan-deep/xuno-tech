import { getSiteUrl } from './env'

// Contact Information
export const CONTACT_INFO = {
  email: 'xunotech@gmail.com',
  phone: '8700227245',
  responseTime: 'Within 24 hours',
  location: 'Remote & On-site',
} as const

// Site Configuration
export const SITE_CONFIG = {
  name: 'Xuno Tech',
  description: 'Professional technology services including development, cloud solutions, security, and digital growth services.',
  url: getSiteUrl(),
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/xunotech',
    github: 'https://github.com/xunotech',
    linkedin: 'https://linkedin.com/company/xunotech',
  },
}

// API Configuration
export const API_CONFIG = {
  contactEndpoint: '/api/contact',
}

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
]

// Services Data
export const SERVICES = [
  {
    id: 'development',
    title: 'Development',
    description: 'Custom web and mobile application development using modern technologies',
    icon: '💻',
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description: 'Cloud infrastructure setup, migration, and management services',
    icon: '☁️',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Comprehensive security audits and implementation of security best practices',
    icon: '🔒',
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Tech',
    description: 'AI/ML, IoT, and other cutting-edge technology solutions',
    icon: '🚀',
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth',
    description: 'SEO, digital marketing, and growth strategy consulting',
    icon: '📈',
  },
  {
    id: 'qa-testing',
    title: 'QA & Testing',
    description: 'Comprehensive testing strategies and quality assurance services',
    icon: '✅',
  },
  {
    id: 'support',
    title: 'Support & Maintenance',
    description: 'Ongoing technical support and maintenance services',
    icon: '🛠️',
  },
]

// Technologies Data
export const TECHNOLOGIES = [
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python', category: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
  { id: 'docker', name: 'Docker', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops' },
  { id: 'aws', name: 'AWS', category: 'cloud' },
  { id: 'azure', name: 'Azure', category: 'cloud' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud' },
]

// Industries Data
export const INDUSTRIES = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'HIPAA-compliant solutions for medical practices and health systems',
    icon: '🏥',
  },
  {
    id: 'edtech',
    name: 'EdTech',
    description: 'Educational technology platforms and learning management systems',
    icon: '🎓',
  },
  {
    id: 'fintech',
    name: 'FinTech',
    description: 'Secure financial technology solutions and payment processing',
    icon: '💰',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online retail platforms and marketplace solutions',
    icon: '🛒',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property management and real estate platform development',
    icon: '🏠',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Supply chain management and logistics optimization systems',
    icon: '📦',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Media streaming and entertainment platform development',
    icon: '🎬',
  },
] 