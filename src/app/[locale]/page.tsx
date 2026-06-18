import { Header } from '@/components/Header'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CardFlutuante } from '@/components/CardFlutuante'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <FeaturedProjects />
        <TestimonialsSection />
        <FaqSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <CardFlutuante />
      <ThemeToggle />
    </>
  )
}
