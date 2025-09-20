'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useScrollAnimation, useStaggeredScrollAnimation, getAnimationClasses } from '@/hooks/useScrollAnimation'

interface ServicesSectionProps {
  className?: string
}

// Service data with enhanced details
const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: [
      'Next.js & React Applications',
      'Progressive Web Apps (PWA)',
      'E-commerce Solutions',
      'Custom CMS Development',
      'API Integration & Development'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
    pricing: 'Starting from $2,500',
    deliveryTime: '2-6 weeks'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'React Native Development',
      'iOS & Android Native Apps',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality'
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
    pricing: 'Starting from $5,000',
    deliveryTime: '3-8 weeks'
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps solutions for modern applications',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    features: [
      'AWS & Azure Deployment',
      'Docker Containerization',
      'CI/CD Pipeline Setup',
      'Database Management',
      'Auto-scaling Solutions'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    pricing: 'Starting from $1,500',
    deliveryTime: '1-4 weeks'
  },
  {
    id: 'ai-ml-solutions',
    title: 'AI/ML Solutions',
    description: 'Intelligent applications powered by artificial intelligence and machine learning',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      'Custom AI Model Development',
      'Data Analytics & Insights',
      'Computer Vision Solutions',
      'Natural Language Processing',
      'Predictive Analytics'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
    pricing: 'Starting from $7,500',
    deliveryTime: '4-12 weeks'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that create exceptional digital experiences',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 3v18h-6a4 4 0 01-4-4V3h10z" />
      </svg>
    ),
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Design System Creation',
      'Mobile-First Design',
      'Accessibility Compliance'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision'],
    pricing: 'Starting from $1,200',
    deliveryTime: '1-3 weeks'
  },
  {
    id: 'consulting',
    title: 'Technology Consulting',
    description: 'Strategic technology guidance to accelerate your digital transformation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    features: [
      'Technology Strategy',
      'Architecture Reviews',
      'Team Training & Mentoring',
      'Code Audits & Optimization',
      'Project Planning & Management'
    ],
    technologies: ['Agile', 'Scrum', 'DevOps', 'Microservices', 'Clean Architecture'],
    pricing: 'Starting from $500',
    deliveryTime: '1-2 weeks'
  }
]

export function ServicesSection({ className }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [headerRef, headerVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5
  })
  const [gridRef, gridVisible] = useStaggeredScrollAnimation<HTMLDivElement>(
    6, // Number of service cards
    { 
      staggerDelay: 150,
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  return (
    <section 
      id="services" 
      className={cn(
        "py-24 bg-background relative overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className={getAnimationClasses(headerVisible, 'fade-in-up')}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Comprehensive Technology 
              <span className="gradient-text block">Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              From concept to deployment, we provide end-to-end technology services 
              that drive business growth and digital transformation.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "group glass-effect rounded-2xl p-8 transition-all duration-300 cursor-pointer",
                "hover:scale-105 hover:shadow-glow",
                activeService === service.id && "ring-2 ring-primary/20 bg-primary/5",
                hoveredService === service.id && "bg-accent/5",
                getAnimationClasses(gridVisible[index], 'fade-in-up')
              )}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Service Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <div className="text-primary">
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Quick Info */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground border-t border-border/50 pt-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{service.pricing}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Indicator */}
              <div className="text-center">
                <div className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full bg-background/50 border border-border/50 transition-all duration-300",
                  activeService === service.id ? "rotate-180 bg-primary/10 border-primary/20" : "group-hover:bg-primary/10"
                )}>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              <div className={cn(
                "transition-all duration-500 overflow-hidden",
                activeService === service.id ? "max-h-[400px] opacity-100 mt-6" : "max-h-0 opacity-0"
              )}>
                <div className="border-t border-border/50 pt-6 space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <svg className="w-3 h-3 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button 
                    className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      document.getElementById('contact')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      })
                    }}
                  >
                    Get Started with {service.title}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="animate-fade-in-up [animation-delay:600ms]">
          <div className="glass-effect rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your requirements and create a custom solution 
              that perfectly fits your business needs.
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
                  document.getElementById('portfolio')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                View Our Work
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 