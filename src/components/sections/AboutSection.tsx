'use client'

import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section 
      id="about" 
      className={cn(
        "py-24 bg-muted/30 relative overflow-hidden",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute top-1/4 -left-20 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              About {SITE_CONFIG.name}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Transforming Ideas Into 
              <span className="gradient-text block">Digital Reality</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              We are a forward-thinking technology company dedicated to delivering 
              innovative solutions that empower businesses to thrive in the digital landscape.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story Content */}
          <div className="space-y-8 animate-fade-in-up [animation-delay:200ms]">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe technology should serve humanity, not complicate it. Our mission is to 
                bridge the gap between complex technological possibilities and real-world business needs, 
                creating solutions that are both powerful and intuitive.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">What Sets Us Apart</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Human-Centered Design</h4>
                    <p className="text-sm text-muted-foreground">Every solution starts with understanding your users and their needs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cutting-Edge Technology</h4>
                    <p className="text-sm text-muted-foreground">We stay ahead of the curve with the latest frameworks and best practices.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Transparent Partnership</h4>
                    <p className="text-sm text-muted-foreground">Clear communication and collaboration throughout every project.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual/Stats Section */}
          <div className="animate-fade-in-up [animation-delay:400ms]">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-8 text-center">By the Numbers</h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              {/* Process Steps */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <h4 className="text-lg font-semibold text-foreground mb-6 text-center">Our Process</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Discovery & Planning</h5>
                      <p className="text-sm text-muted-foreground">Understanding your vision and requirements</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Design & Development</h5>
                      <p className="text-sm text-muted-foreground">Crafting solutions with precision and care</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">Launch & Support</h5>
                      <p className="text-sm text-muted-foreground">Deployment and ongoing maintenance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values/Culture Section */}
        <div className="animate-fade-in-up [animation-delay:600ms]">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Core Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m9-9H3" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">Pushing boundaries to create tomorrow&apos;s solutions today</p>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Quality</h4>
              <p className="text-sm text-muted-foreground">Excellence in every line of code and every interaction</p>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Collaboration</h4>
              <p className="text-sm text-muted-foreground">Working together to achieve extraordinary results</p>
            </div>

            <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Impact</h4>
              <p className="text-sm text-muted-foreground">Creating meaningful change that matters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 