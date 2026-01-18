import AboutSection from '@/components/Celestial/AboutSection'
import FAQSection from '@/components/Celestial/FAQSection'
import Footer from '@/components/Celestial/Footer'
import HeroSection from '@/components/Celestial/HeroSection'
import Navbar from '@/components/Celestial/Navbar'
import ScheduleSection from '@/components/Celestial/ScheduleSection'
import SponsorsSection from '@/components/Celestial/SponsorsSection'
import Starfield from '@/components/Celestial/Starfield'

const HomePage = () => {
  return (
    <main className="celestial-theme relative min-h-screen bg-background overflow-x-hidden">
      <Starfield />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <SponsorsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}

export default HomePage
