'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PortfolioSectionProps {
  className?: string
}

// Portfolio project data with comprehensive case studies
const projects = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with AI-powered recommendations and real-time inventory management',
    shortDescription: 'Full-stack e-commerce platform with advanced features',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'AI-powered product recommendations',
      'Real-time inventory management',
      'Multi-payment gateway integration',
      'Advanced analytics dashboard',
      'Mobile-responsive design',
      'SEO optimization'
    ],
    results: {
      metric1: { label: 'Revenue Increase', value: '340%' },
      metric2: { label: 'Page Load Speed', value: '2.1s' },
      metric3: { label: 'Conversion Rate', value: '8.4%' }
    },
    timeline: '3 months',
    client: 'TechMart Inc.',
    year: '2024',
    status: 'live',
    liveUrl: 'https://demo-ecommerce.xunotech.com',
    caseStudy: 'Built a comprehensive e-commerce platform that increased client revenue by 340% through AI-driven personalization and optimized user experience.'
  },
  {
    id: 'healthcare-app',
    title: 'HealthConnect Mobile App',
    category: 'Mobile Development',
    description: 'Healthcare management app connecting patients, doctors, and medical facilities with telemedicine capabilities',
    shortDescription: 'Comprehensive healthcare management mobile application',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'Firebase', 'AWS'],
    features: [
      'Telemedicine video consultations',
      'Appointment scheduling system',
      'Medical records management',
      'Prescription tracking',
      'Health monitoring dashboard',
      'HIPAA compliant security'
    ],
    results: {
      metric1: { label: 'Active Users', value: '25K+' },
      metric2: { label: 'App Store Rating', value: '4.9/5' },
      metric3: { label: 'Consultation Success', value: '96%' }
    },
    timeline: '5 months',
    client: 'MedCore Solutions',
    year: '2024',
    status: 'live',
    liveUrl: 'https://apps.apple.com/healthconnect',
    caseStudy: 'Developed a HIPAA-compliant healthcare app that revolutionized patient care delivery, serving 25K+ active users with 96% consultation success rate.'
  },
  {
    id: 'ai-analytics-dashboard',
    title: 'AI Analytics Dashboard',
    category: 'AI/ML Solutions',
    description: 'Machine learning powered business intelligence dashboard with predictive analytics and real-time insights',
    shortDescription: 'AI-powered business intelligence and analytics platform',
    image: '/api/placeholder/600/400',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    features: [
      'Predictive analytics engine',
      'Real-time data visualization',
      'Custom ML model deployment',
      'Automated report generation',
      'Advanced data filtering',
      'API integration framework'
    ],
    results: {
      metric1: { label: 'Prediction Accuracy', value: '94%' },
      metric2: { label: 'Data Processing', value: '10M+ records/day' },
      metric3: { label: 'Decision Speed', value: '5x faster' }
    },
    timeline: '4 months',
    client: 'DataFlow Corp',
    year: '2023',
    status: 'live',
    liveUrl: 'https://analytics.dataflow.com',
    caseStudy: 'Created an AI-powered analytics dashboard that processes 10M+ records daily with 94% prediction accuracy, enabling 5x faster business decisions.'
  },
  {
    id: 'fintech-platform',
    title: 'FinTech Payment Platform',
    category: 'Web Development',
    description: 'Secure payment processing platform with cryptocurrency support and advanced fraud detection',
    shortDescription: 'Next-generation payment processing platform',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Blockchain', 'AWS'],
    features: [
      'Multi-currency payment processing',
      'Cryptocurrency integration',
      'AI fraud detection',
      'KYC/AML compliance',
      'Real-time transaction monitoring',
      'Developer API ecosystem'
    ],
    results: {
      metric1: { label: 'Transaction Volume', value: '$50M+' },
      metric2: { label: 'Fraud Detection', value: '99.8%' },
      metric3: { label: 'Uptime', value: '99.99%' }
    },
    timeline: '6 months',
    client: 'SecurePay Solutions',
    year: '2023',
    status: 'live',
    liveUrl: 'https://platform.securepay.com',
    caseStudy: 'Built a enterprise-grade FinTech platform processing $50M+ in transactions with 99.8% fraud detection accuracy and 99.99% uptime.'
  },
  {
    id: 'smart-logistics',
    title: 'Smart Logistics System',
    category: 'Cloud Solutions',
    description: 'IoT-enabled logistics management system with real-time tracking and route optimization',
    shortDescription: 'Intelligent logistics and supply chain management',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Python', 'AWS IoT', 'PostgreSQL', 'Docker', 'Kubernetes'],
    features: [
      'Real-time GPS tracking',
      'AI route optimization',
      'IoT sensor integration',
      'Predictive maintenance',
      'Automated scheduling',
      'Performance analytics'
    ],
    results: {
      metric1: { label: 'Delivery Efficiency', value: '45%' },
      metric2: { label: 'Fuel Savings', value: '30%' },
      metric3: { label: 'Customer Satisfaction', value: '98%' }
    },
    timeline: '4 months',
    client: 'LogiTech Global',
    year: '2024',
    status: 'live',
    liveUrl: 'https://logistics.logitech-global.com',
    caseStudy: 'Implemented a smart logistics system that improved delivery efficiency by 45% and reduced fuel costs by 30% through AI-powered optimization.'
  },
  {
    id: 'design-system',
    title: 'Enterprise Design System',
    category: 'UI/UX Design',
    description: 'Comprehensive design system and component library for a Fortune 500 company',
    shortDescription: 'Scalable design system and component library',
    image: '/api/placeholder/600/400',
    technologies: ['Figma', 'React', 'Storybook', 'TypeScript', 'Tailwind CSS', 'Jest'],
    features: [
      'Comprehensive component library',
      'Design tokens system',
      'Accessibility compliance',
      'Multi-brand theming',
      'Interactive documentation',
      'Automated testing suite'
    ],
    results: {
      metric1: { label: 'Development Speed', value: '60% faster' },
      metric2: { label: 'Design Consistency', value: '95%' },
      metric3: { label: 'Team Adoption', value: '100%' }
    },
    timeline: '3 months',
    client: 'Enterprise Corp',
    year: '2023',
    status: 'live',
    liveUrl: 'https://design-system.enterprise.com',
    caseStudy: 'Created a comprehensive design system that accelerated development by 60% and achieved 95% design consistency across 50+ products.'
  }
]

const categories = ['All', 'Web Development', 'Mobile Development', 'AI/ML Solutions', 'Cloud Solutions', 'UI/UX Design']

export function PortfolioSection({ className }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter(project => project.category === activeCategory)
  }, [activeCategory])

  return (
    <section 
      id="portfolio" 
      className={cn(
        "py-24 bg-muted/30 relative overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Portfolio of 
              <span className="gradient-text block">Excellence</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Discover how we&apos;ve helped businesses transform their digital presence 
              and achieve remarkable results through innovative technology solutions.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up [animation-delay:200ms]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-background/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group glass-effect rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                "hover:scale-105 hover:shadow-glow animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{project.category}</div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    project.status === 'live' 
                      ? "bg-success/20 text-success border border-success/20"
                      : "bg-warning/20 text-warning border border-warning/20"
                  )}>
                    {project.status === 'live' ? '✓ Live' : 'In Development'}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    View Case Study
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    {project.year}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                {/* Key Metrics Preview */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{project.results.metric1.value}</div>
                    <div className="text-xs text-muted-foreground">{project.results.metric1.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{project.results.metric2.value}</div>
                    <div className="text-xs text-muted-foreground">{project.results.metric2.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-info">{project.results.metric3.value}</div>
                    <div className="text-xs text-muted-foreground">{project.results.metric3.label}</div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs font-medium rounded-md">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{project.timeline}</span>
                  </div>
                  <div className="text-primary font-medium">View Details →</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="animate-fade-in-up [animation-delay:600ms]">
          <div className="glass-effect rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve similar results and transform 
              your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Start Your Project
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button 
                className="group inline-flex items-center justify-center rounded-xl border border-input bg-background px-8 py-4 text-base font-medium shadow-soft transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                View Our Services
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal (Simple overlay - can be enhanced) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedProject.title}</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Case Study */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Case Study</h4>
                <p className="text-muted-foreground">{selectedProject.caseStudy}</p>
              </div>

              {/* Key Results */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Results</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{selectedProject.results.metric1.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedProject.results.metric1.label}</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">{selectedProject.results.metric2.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedProject.results.metric2.label}</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-info mb-1">{selectedProject.results.metric3.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedProject.results.metric3.label}</div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {selectedProject.status === 'live' && (
                  <button className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90">
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Project
                  </button>
                )}
                <button 
                  className="flex-1 inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-soft transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    setSelectedProject(null)
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  Start Similar Project
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 