import { getButtonClassName } from './buttonStyles'

const sponsors = {
  platinum: [
    { name: 'TechCorp', placeholder: true },
    { name: 'InnovateLab', placeholder: true },
  ],
  gold: [
    { name: 'CodeStream', placeholder: true },
    { name: 'DataFlow', placeholder: true },
    { name: 'CloudNine', placeholder: true },
  ],
  silver: [
    { name: 'StartupHub', placeholder: true },
    { name: 'DevTools', placeholder: true },
    { name: 'APIFirst', placeholder: true },
    { name: 'ScaleUp', placeholder: true },
  ],
}

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-gradient">Stellar</span> Partners
          </h2>
          <p className="text-lg text-muted-foreground">
            These amazing organizations make DeerHacks possible.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-center text-sm uppercase tracking-widest text-primary mb-8 font-display">
              Platinum Sponsors
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {sponsors.platinum.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="glass-card w-64 h-32 rounded-2xl flex items-center justify-center border border-border/60 hover:border-primary/60 transition-all group"
                >
                  <span className="text-xl font-display text-muted-foreground group-hover:text-foreground transition-colors">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-center text-sm uppercase tracking-widest text-accent mb-8 font-display">
              Gold Sponsors
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {sponsors.gold.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="glass-card w-48 h-24 rounded-xl flex items-center justify-center border border-border/60 hover:border-primary/60 transition-all group"
                >
                  <span className="text-lg font-display text-muted-foreground group-hover:text-foreground transition-colors">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8 font-display">
              Silver Sponsors
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {sponsors.silver.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="glass-card w-40 h-20 rounded-lg flex items-center justify-center border border-border/60 hover:border-primary/60 transition-all group"
                >
                  <span className="text-base font-display text-muted-foreground group-hover:text-foreground transition-colors">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Interested in sponsoring DeerHacks?</p>
          <button type="button" className={getButtonClassName('constellation', 'lg')}>
            Become a Sponsor
          </button>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
