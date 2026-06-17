import { Header } from '@/components/Header'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CardFlutuante } from '@/components/CardFlutuante'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
      </main>
      <CardFlutuante />
      <ThemeToggle />
    </>
  )
}
