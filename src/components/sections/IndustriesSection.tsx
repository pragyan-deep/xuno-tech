'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface IndustriesSectionProps {
  className?: string
}

// Comprehensive industries data with solutions and metrics
const industries = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Digital transformation for healthcare providers, improving patient care and operational efficiency',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2v2m0-2h2m-2 0H10" />
      </svg>
    ),
    color: 'from-red-500 to-pink-600',
    category: 'Essential Services',
    projects: 15,
    avgImprovement: '85%',
    solutions: [
      'Electronic Health Records (EHR)',
      'Telemedicine Platforms',
      'Patient Management Systems',
      'Medical Device Integration',
      'HIPAA Compliance Solutions',
      'Healthcare Analytics'
    ],
    painPoints: [
      'Patient data scattered across systems',
      'Inefficient appointment scheduling',
      'Lack of real-time patient monitoring',
      'Compliance and security concerns'
    ],
    results: {
      metric1: { label: 'Patient Satisfaction', value: '94%' },
      metric2: { label: 'Operational Efficiency', value: '+75%' },
      metric3: { label: 'Cost Reduction', value: '40%' }
    },
    caseStudy: 'Developed a comprehensive telemedicine platform serving 25K+ patients with 96% consultation success rate.'
  },
  {
    id: 'fintech',
    name: 'FinTech',
    description: 'Secure financial technology solutions for banks, startups, and investment firms',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-600',
    category: 'Financial Services',
    projects: 12,
    avgImprovement: '92%',
    solutions: [
      'Payment Processing Systems',
      'Digital Banking Platforms',
      'Cryptocurrency Integration',
      'Fraud Detection AI',
      'KYC/AML Compliance',
      'Trading Platform Development'
    ],
    painPoints: [
      'Security vulnerabilities in transactions',
      'Slow payment processing',
      'Complex regulatory compliance',
      'Legacy system integration'
    ],
    results: {
      metric1: { label: 'Transaction Volume', value: '$50M+' },
      metric2: { label: 'Fraud Detection', value: '99.8%' },
      metric3: { label: 'Processing Speed', value: '3x faster' }
    },
    caseStudy: 'Built an enterprise-grade payment platform processing $50M+ transactions with 99.8% fraud detection accuracy.'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Scalable online retail solutions driving sales growth and customer engagement',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-600',
    category: 'Retail & Commerce',
    projects: 20,
    avgImprovement: '78%',
    solutions: [
      'Custom E-commerce Platforms',
      'Inventory Management Systems',
      'AI Product Recommendations',
      'Multi-channel Integration',
      'Payment Gateway Solutions',
      'Analytics and Reporting'
    ],
    painPoints: [
      'Poor website performance',
      'Low conversion rates',
      'Inventory management challenges',
      'Limited customer insights'
    ],
    results: {
      metric1: { label: 'Revenue Growth', value: '340%' },
      metric2: { label: 'Conversion Rate', value: '8.4%' },
      metric3: { label: 'Page Load Speed', value: '2.1s' }
    },
    caseStudy: 'Created an AI-powered e-commerce platform that increased client revenue by 340% through personalized recommendations.'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'EdTech solutions empowering educational institutions and online learning platforms',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'from-purple-500 to-violet-600',
    category: 'Education & Training',
    projects: 10,
    avgImprovement: '89%',
    solutions: [
      'Learning Management Systems (LMS)',
      'Virtual Classroom Platforms',
      'Student Information Systems',
      'AI-Powered Assessment Tools',
      'Content Management Solutions',
      'Mobile Learning Apps'
    ],
    painPoints: [
      'Outdated learning management systems',
      'Poor student engagement',
      'Limited remote learning capabilities',
      'Difficulty tracking student progress'
    ],
    results: {
      metric1: { label: 'Student Engagement', value: '+150%' },
      metric2: { label: 'Learning Outcomes', value: '+65%' },
      metric3: { label: 'Administrative Efficiency', value: '70%' }
    },
    caseStudy: 'Developed a comprehensive LMS platform serving 10K+ students with 150% improved engagement rates.'
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Smart supply chain and transportation management solutions',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
      </svg>
    ),
    color: 'from-orange-500 to-red-600',
    category: 'Supply Chain',
    projects: 8,
    avgImprovement: '82%',
    solutions: [
      'Route Optimization Systems',
      'Fleet Management Platforms',
      'Warehouse Management Systems',
      'IoT Tracking Solutions',
      'Predictive Maintenance',
      'Supply Chain Analytics'
    ],
    painPoints: [
      'Inefficient route planning',
      'Poor visibility in supply chain',
      'High fuel and operational costs',
      'Manual tracking processes'
    ],
    results: {
      metric1: { label: 'Delivery Efficiency', value: '+45%' },
      metric2: { label: 'Fuel Savings', value: '30%' },
      metric3: { label: 'Customer Satisfaction', value: '98%' }
    },
    caseStudy: 'Implemented smart logistics system improving delivery efficiency by 45% and reducing fuel costs by 30%.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Industry 4.0 solutions for smart manufacturing and production optimization',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'from-gray-600 to-gray-800',
    category: 'Industrial',
    projects: 6,
    avgImprovement: '76%',
    solutions: [
      'Industrial IoT Platforms',
      'Production Management Systems',
      'Quality Control Automation',
      'Predictive Maintenance',
      'Digital Twin Technology',
      'Real-time Monitoring Dashboards'
    ],
    painPoints: [
      'Equipment downtime',
      'Quality control issues',
      'Inefficient production processes',
      'Lack of real-time visibility'
    ],
    results: {
      metric1: { label: 'Production Efficiency', value: '+60%' },
      metric2: { label: 'Downtime Reduction', value: '50%' },
      metric3: { label: 'Quality Improvement', value: '85%' }
    },
    caseStudy: 'Deployed IoT-enabled manufacturing system increasing production efficiency by 60% and reducing downtime by 50%.'
  }
]

const categories = ['All Industries', 'Essential Services', 'Financial Services', 'Retail & Commerce', 'Education & Training', 'Supply Chain', 'Industrial']

export function IndustriesSection({ className }: IndustriesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All Industries')
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null)

  // Filter industries based on active category
  const filteredIndustries = useMemo(() => {
    if (activeCategory === 'All Industries') return industries
    return industries.filter(industry => industry.category === activeCategory)
  }, [activeCategory])

  return (
    <section 
      id="industries" 
      className={cn(
        "py-24 bg-muted/30 relative overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Industries We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Transforming Businesses 
              <span className="gradient-text block">Across Industries</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              From healthcare to finance, education to manufacturing - we deliver 
              tailored technology solutions that drive real business results.
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
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
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

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredIndustries.map((industry, index) => (
            <div
              key={industry.id}
              className={cn(
                "group glass-effect rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                "hover:scale-105 hover:shadow-glow animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedIndustry(industry)}
            >
              {/* Industry Header */}
              <div className={cn(
                "p-6 bg-gradient-to-br", industry.color,
                "text-white relative overflow-hidden"
              )}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                <div className="relative z-10 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{industry.name}</h3>
                    <div className="text-white/80 text-sm">{industry.category}</div>
                  </div>
                </div>
              </div>

              {/* Industry Content */}
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {industry.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{industry.results.metric1.value}</div>
                    <div className="text-xs text-muted-foreground">{industry.results.metric1.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{industry.results.metric2.value}</div>
                    <div className="text-xs text-muted-foreground">{industry.results.metric2.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-info">{industry.results.metric3.value}</div>
                    <div className="text-xs text-muted-foreground">{industry.results.metric3.label}</div>
                  </div>
                </div>

                {/* Projects & Success Rate */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground border-t border-border/50 pt-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{industry.projects} Projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{industry.avgImprovement} Avg Improvement</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full text-primary font-medium text-sm hover:text-primary/80 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>View Industry Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up [animation-delay:400ms]">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{industries.length}+</div>
            <div className="text-sm text-muted-foreground">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {industries.reduce((acc, ind) => acc + ind.projects, 0)}+
            </div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-info mb-2">
              {Math.round(industries.reduce((acc, ind) => acc + parseFloat(ind.avgImprovement), 0) / industries.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Improvement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="animate-fade-in-up [animation-delay:600ms]">
          <div className="glass-effect rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Don&apos;t See Your Industry?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We work with businesses across all sectors. Every industry has unique challenges, 
              and we&apos;re experts at crafting custom solutions that fit your specific needs.
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
                Discuss Your Industry
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
                View Case Studies
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Detail Modal */}
      {selectedIndustry && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndustry(null)}
        >
          <div 
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={cn(
              "p-6 bg-gradient-to-br", selectedIndustry.color,
              "text-white relative overflow-hidden"
            )}>
              <div className="absolute inset-0 opacity-10">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    {selectedIndustry.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedIndustry.name}</h3>
                    <p className="text-white/90">{selectedIndustry.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedIndustry(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Case Study */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Success Story</h4>
                <p className="text-muted-foreground bg-muted/30 rounded-lg p-4">
                  {selectedIndustry.caseStudy}
                </p>
              </div>

              {/* Key Results */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Key Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-muted/30 rounded-xl">
                    <div className="text-2xl font-bold text-primary mb-2">{selectedIndustry.results.metric1.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedIndustry.results.metric1.label}</div>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-xl">
                    <div className="text-2xl font-bold text-success mb-2">{selectedIndustry.results.metric2.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedIndustry.results.metric2.label}</div>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-xl">
                    <div className="text-2xl font-bold text-info mb-2">{selectedIndustry.results.metric3.value}</div>
                    <div className="text-sm text-muted-foreground">{selectedIndustry.results.metric3.label}</div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Our Solutions</h4>
                  <ul className="space-y-3">
                    {selectedIndustry.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-muted-foreground">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Pain Points We Solve</h4>
                  <ul className="space-y-3">
                    {selectedIndustry.painPoints.map((pain, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-destructive/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg className="w-3 h-3 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-muted-foreground">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                <button 
                  className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  onClick={() => {
                    setSelectedIndustry(null)
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  Start Your {selectedIndustry.name} Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                  className="flex-1 inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-base font-medium shadow-soft transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  onClick={() => {
                    setSelectedIndustry(null)
                    document.getElementById('services')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 