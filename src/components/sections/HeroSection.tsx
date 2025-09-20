'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import { useScrollAnimation, getAnimationClasses } from '@/hooks/useScrollAnimation'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>({
    threshold: 0.3,
    rootMargin: '0px'
  })
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    delay: 600
  })

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className={cn(
        "relative min-h-screen pt-16 flex items-center justify-center",
        "bg-gradient-to-br from-background via-background to-muted/20",
        "overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow [animation-delay:1s]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <div className={cn(
            "mb-8",
            getAnimationClasses(heroVisible, 'fade-in-up')
          )}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6">
              <span className="block">
                Innovation Meets
              </span>
              <span className="block gradient-text">
                Excellence
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-muted-foreground mt-2">
                in Technology
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={cn(
            "mb-12",
            getAnimationClasses(heroVisible, 'fade-in-up')
          )} style={{ transitionDelay: '200ms' }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We craft cutting-edge technology solutions that transform businesses, 
              streamline processes, and drive sustainable growth in the digital age.
            </p>
          </div>

          {/* Key value propositions */}
          <div className={cn(
            "mb-12",
            getAnimationClasses(heroVisible, 'fade-in-up')
          )} style={{ transitionDelay: '400ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Rapid development and deployment with modern technologies</p>
              </div>

              <div className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Proven Reliable</h3>
                <p className="text-sm text-muted-foreground">Battle-tested solutions with enterprise-grade security</p>
              </div>

              <div className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Built with Care</h3>
                <p className="text-sm text-muted-foreground">Thoughtful design and user experience at every step</p>
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div 
            ref={ctaRef}
            className={cn(
              "mb-16",
              getAnimationClasses(ctaVisible, 'scale-in')
            )}
          >
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
                Explore Services
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Trust indicators / Stats */}
          <div className="animate-fade-in-up [animation-delay:800ms]">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span>Next.js 15 Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
                <span>TypeScript First</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse-slow"></div>
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse-slow"></div>
                <span>Enterprise Grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <button
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ 
              behavior: 'smooth' 
            })
          }}
          className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Scroll to About section"
        >
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
} 