type ButtonVariant = 'default' | 'hero' | 'constellation'
type ButtonSize = 'default' | 'lg' | 'xl'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-display'

const variants: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 glow-gold',
  hero: 'bg-primary text-primary-foreground hover:bg-primary/90 glow-gold text-base rounded-xl font-semibold tracking-wide',
  constellation:
    'bg-transparent border-2 border-border text-foreground hover:bg-primary/10 hover:border-primary',
}

const sizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  lg: 'h-11 rounded-lg px-8',
  xl: 'h-14 rounded-xl px-10 text-base',
}

export const getButtonClassName = (
  variant: ButtonVariant = 'default',
  size: ButtonSize = 'default',
  className = ''
) => [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
