import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import HeroSection from '@/components/sections/HeroSection'
import BrandsMarquee from '@/components/sections/BrandsMarquee'
import CategoriesSection from '@/components/sections/CategoriesSection'
import { FeaturedMastersSection, FeaturedServicesSection } from '@/components/sections/FeaturedSections'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="page-enter">
        <HeroSection />
        <BrandsMarquee />
        <CategoriesSection />
        <FeaturedMastersSection />
        <HowItWorksSection />
        <FeaturedServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <MobileNav />
      {/* Bottom padding for mobile nav */}
      {/* <div className="h-20 lg:hidden" /> */}
    </div>
  )
}