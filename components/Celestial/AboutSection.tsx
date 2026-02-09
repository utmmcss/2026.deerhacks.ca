import { Code, Heart, Rocket, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Launch Ideas',
    description: 'Transform your wildest ideas into reality in just 36 hours of intense building.',
  },
  {
    icon: Code,
    title: 'Build & Learn',
    description: 'Access workshops, mentors, and cutting-edge resources to level up your skills.',
  },
  {
    icon: Users,
    title: 'Connect',
    description: 'Network with fellow innovators, industry professionals, and top sponsors.',
  },
]

const stats: Array<{ value: string; label: string; suffix: string; prefix?: string }> = [
  { value: '36', label: 'Hours', suffix: '' },
  { value: '500', label: 'Hackers', suffix: '+' },
  { value: '50', label: 'Projects', suffix: '+' },
]

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">What is DeerHacks?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Navigate</span> the Cosmos
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DeerHacks is the University of Toronto Mississauga&apos;s premier hackathon, bringing
            together the brightest minds to explore, create, and innovate. Whether you&apos;re a
            first-time hacker or a seasoned developer, there&apos;s a place for you here.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-2xl border border-border/60 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all border border-primary/20">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="relative">
          <div className="glass-card rounded-3xl border border-border/60 p-8 sm:p-12">
            {/* Decorative gradient */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-space-nebula/10 blur-[60px]" />
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient mb-2">
                    {stat.prefix ?? ''}{stat.value}
                    <span className="text-primary/70">{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community note */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Heart className="w-4 h-4 text-primary" />
            <span>Proudly supported by the UTM community since 2019</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
