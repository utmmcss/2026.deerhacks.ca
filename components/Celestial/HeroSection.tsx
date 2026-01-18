import NextLink from 'next/link'

import { Calendar, MapPin, Users } from 'lucide-react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'

import DeerConstellation from './DeerConstellation'
import { getButtonClassName } from './buttonStyles'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0" style={{ background: 'var(--gradient-hero)' }} />

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-space-nebula/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <DeerConstellation />
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="text-gradient">DeerHacks</span>
            <span className="block text-foreground mt-2">2025</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Explore the universe of possibilities. Build something extraordinary.
          </p>

          <div
            className="flex flex-wrap justify-center gap-6 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span>February 14-16, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>University of Toronto</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>500+ Hackers</span>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '1s' }}
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
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
