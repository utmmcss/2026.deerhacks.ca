import NextLink from 'next/link'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { MapPin, Sparkles, Users } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'
import DeerConstellation from './DeerConstellation'

const HeroSection = () => {
  const { toggles } = useFeatureToggle()
  const applyLabel = 'Apply Now'
  const applyEnabled = toggles.dashboard
  const applyClassName = getButtonClassName(
    'hero',
    'xl',
    applyEnabled ? '' : 'pointer-events-none opacity-50'
  )
  const secondaryClassName = getButtonClassName('constellation', 'xl')

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--gradient-hero)' }} />

<<<<<<< HEAD
      {/* Nebula effects - Three-layer background atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] left-[-5%] w-[1000px] h-[1000px] rounded-full opacity-[0.25]" 
          style={{ background: 'radial-gradient(circle, hsl(var(--nebula-purple)) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute top-[0%] right-[-10%] w-[1100px] h-[1100px] rounded-full opacity-[0.22]" 
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[900px] h-[900px] rounded-full opacity-[0.15]" 
          style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }} 
        />
=======
      {/* Nebula effects - Restored subtle background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] left-[-15%] w-[1000px] h-[1000px] rounded-full opacity-[0.015]" 
          style={{ background: 'radial-gradient(circle, hsl(var(--nebula-purple)) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute top-[0%] right-[-20%] w-[1100px] h-[1100px] rounded-full opacity-[0.012]" 
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }} 
        />
>>>>>>> 96ce90b2640b104e5216dc1d54ef5ad13526387c
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow flex flex-col pt-24 pb-12">
        <div className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Deer Constellation - Made more prominent */}
          <div
            className="mb-8 sm:mb-12 opacity-0 animate-fade-in relative"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Glow effect behind constellation */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] scale-150" />
            <DeerConstellation />
          </div>

          {/* Event badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">February 27 - March 1, 2026</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-gradient">DeerHacks</span>
          </h1>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-display font-light text-foreground/90 mb-6 opacity-0 animate-fade-in-up tracking-wide"
            style={{ animationDelay: '0.5s' }}
          >
            UTM&apos;s Premier Hackathon
          </p>

          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl opacity-0 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: '0.6s' }}
          >
            Join 500+ innovators for 36 hours of building, learning, and creating.
            Explore the universe of possibilities.
          </p>

          {/* Event details */}
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">University of Toronto Mississauga</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">500+ Hackers</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.9s' }}
          >
            {applyEnabled ? (
              <NextLink href="/login" className={`${applyClassName} no-underline`}>
                {applyLabel}
              </NextLink>
            ) : (
              <span className={applyClassName} aria-disabled="true">
                {applyLabel}
              </span>
            )}
            <a href="#about" className={`${secondaryClassName} no-underline`}>
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator - Improved spacing and visibility */}
        <div
          className="mt-8 sm:mt-12 flex justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: '1.5s' }}
        >
          <a href="#about" className="block group" aria-label="Scroll to learn more">
            <div className="w-6 h-10 border-2 border-primary/30 group-hover:border-primary/60 rounded-full flex justify-center transition-all duration-300 bg-primary/5">
              <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
