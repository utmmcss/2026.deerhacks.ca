import { Code, Rocket, Trophy, Users } from 'lucide-react'

const features = [
  {
    icon: Rocket,
    title: 'Launch Ideas',
    description: 'Transform your wildest ideas into reality in just 36 hours of intense building.',
  },
  {
    icon: Code,
    title: 'Build & Learn',
    description: 'Access workshops, mentors, and resources to level up your skills.',
  },
  {
    icon: Users,
    title: 'Connect',
    description: 'Network with fellow innovators, industry professionals, and sponsors.',
  },
  {
    icon: Trophy,
    title: 'Win Prizes',
    description: 'Compete for amazing prizes and recognition for your creative solutions.',
  },
]

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Navigate</span> the Cosmos
          </h2>
          <p className="text-lg text-muted-foreground">
            DeerHacks is the University of Toronto Mississauga&apos;s premier hackathon, bringing
            together the brightest minds to explore, create, and innovate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-2xl border border-border/60 hover:border-primary/60 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '36', label: 'Hours' },
            { value: '500+', label: 'Hackers' },
            { value: '$10K+', label: 'In Prizes' },
            { value: '50+', label: 'Projects' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
