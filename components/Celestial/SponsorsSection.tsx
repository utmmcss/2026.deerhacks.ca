import Image from 'next/image'

import { Mail, Sparkles } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const currentSponsors = [
  { name: 'Featherless AI', logo: '/events/featherless-full-original.svg', width: 220, height: 40 },
  { name: 'Deloitte', logo: '/events/deloitte.png', width: 200, height: 50 },
]

const previousSponsors = [
  { name: 'Uber' },
  { name: 'University of Toronto' },
  { name: 'iCube UTM' },
  { name: 'Major League Hacking' },
  { name: 'AWS' },
  { name: 'echo3D' },
  { name: 'BIGDataAIHub @ IMI' },
  { name: 'StandOut Stickers' },
  { name: 'Silver Spoon' },
  { name: 'Thirstea' },
]

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-24 sm:py-32 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Current Sponsors */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Sponsors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Backed by <span className="text-gradient">the Best</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A huge thank you to our sponsors for making DeerHacks 2026 possible.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-24">
          {currentSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center rounded-2xl bg-white opacity-75 border border-border/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 px-10 py-6 sm:px-14 sm:py-8"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Divider between sections */}
        <div className="w-[60%] max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-24" />

        {/* Previous Sponsors */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Previously <span className="text-gradient">Sponsored</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;re grateful to these organizations for their past support of DeerHacks.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {previousSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="glass-card flex items-center justify-center border border-border/60 transition-all duration-300 group hover:-translate-y-1 w-40 sm:w-52 h-20 sm:h-24 rounded-xl"
            >
              <span className="font-display text-muted-foreground group-hover:text-foreground transition-colors text-sm sm:text-base text-center px-3">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card inline-block rounded-2xl p-8 border border-border/60">
            <p className="text-foreground font-display font-medium mb-2">
              Interested in sponsoring DeerHacks?
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              Partner with us to reach 500+ talented developers.
            </p>
            <a
              href="mailto:mcss@utmsu.ca"
              className={`${getButtonClassName('constellation', 'lg')} no-underline inline-flex`}
            >
              <Mail className="w-4 h-4" />
              <span>Become a Sponsor</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
