import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { ArrowLeft, Menu, X } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const navLinks = [
  { label: 'Code of Conduct', href: '/code' },
]

const CelestialNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggles } = useFeatureToggle()
  const router = useRouter()

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left side: Back button + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
              type="button"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="w-px h-6 bg-border/50 hidden sm:block" />
            <NextLink href="/" className="flex items-center gap-2 group no-underline">
              <Image
                src="/icons/192.png"
                alt="DeerHacks Logo"
                width={40}
                height={40}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-lg sm:text-xl font-display font-bold text-gradient">
                DeerHacks
              </span>
            </NextLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NextLink
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide no-underline transition-colors duration-200 ${router.pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* Right side: Apply button */}
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="flex flex-col p-4 gap-4">
              <NextLink
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground py-2 font-medium no-underline"
              >
                Home
              </NextLink>
              {navLinks.map((link) => (
                <NextLink
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 font-medium no-underline ${router.pathname === link.href ? 'text-primary' : 'text-foreground'
                    }`}
                >
                  {link.label}
                </NextLink>
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

export default CelestialNavbar
