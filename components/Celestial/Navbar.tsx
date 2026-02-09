import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { Menu, X } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggles } = useFeatureToggle()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const applyLabel = 'Apply Now'
  const applyEnabled = toggles.dashboard
  const applyClassName = getButtonClassName(
    'hero',
    'default',
    applyEnabled ? '' : 'pointer-events-none opacity-50'
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 group no-underline shrink-0">
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient whitespace-nowrap">
              DeerHacks
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm tracking-wide no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            {applyEnabled ? (
              <NextLink href="/login" className={`${applyClassName} no-underline`}>
                {applyLabel}
              </NextLink>
            ) : (
              <span className={applyClassName} aria-disabled="true">
                {applyLabel}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-primary hover:bg-primary/20 rounded-xl transition-all border border-primary/30 bg-primary/10 active:scale-90 shadow-lg shadow-primary/10"
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/80 backdrop-blur-2xl border-b border-border/50 animate-fade-in">
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-primary py-3 font-medium no-underline transition-all text-lg tracking-wide flex items-center justify-between group px-2 rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                  <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <div className="pt-2">
                {applyEnabled ? (
                  <NextLink href="/login" className={`${applyClassName} w-full text-center no-underline`}>
                    {applyLabel}
                  </NextLink>
                ) : (
                  <span className={`${applyClassName} w-full text-center`} aria-disabled="true">
                    {applyLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
