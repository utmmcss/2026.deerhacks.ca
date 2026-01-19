import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import { Menu, X } from 'lucide-react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'

import { getButtonClassName } from './buttonStyles'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
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
    'lg',
    applyEnabled ? '' : 'pointer-events-none opacity-50'
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 group no-underline">
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient">
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
            className="md:hidden p-2 text-foreground"
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground py-2 font-medium no-underline"
                >
                  {link.label}
                </a>
              ))}
              {applyEnabled ? (
                <NextLink href="/login" className={`${applyClassName} mt-2 no-underline`}>
                  {applyLabel}
                </NextLink>
              ) : (
                <span className={`${applyClassName} mt-2`} aria-disabled="true">
                  {applyLabel}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
