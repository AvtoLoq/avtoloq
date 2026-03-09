'use client'
import { useLang } from '@/lib/LangContext'
import { masters, autoservices } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'
import BusinessCard from '@/components/ui/BusinessCard'

export function FeaturedMastersSection() {
  const { t } = useLang()
  const featured = masters.slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.sections.featuredMasters}
          subtitle={t.sections.featuredMastersDesc}
          href="/masters"
        />
        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {featured.map((item) => (
            <BusinessCard key={item.id} item={item} type="master" />
          ))}
        </div>
      </div>
      {/* Mobile slider — full width outside container */}
      <div className="lg:hidden w-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
        <div className="flex w-max">
          {featured.map((item) => (
            <div key={item.id} className="w-[100vw] px-4 snap-center">
              <BusinessCard item={item} type="master" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedServicesSection() {
  const { t } = useLang()
  const featured = autoservices.slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t.sections.featuredServices}
          subtitle={t.sections.featuredServicesDesc}
          href="/services"
        />
        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {featured.map((item) => (
            <BusinessCard key={item.id} item={item} type="service" />
          ))}
        </div>
      </div>
      {/* Mobile slider */}
      <div className="lg:hidden w-full overflow-x-auto snap-x snap-mandatory scroll-smooth">
        <div className="flex w-max">
          {featured.map((item) => (
            <div key={item.id} className="w-[100vw] px-4 snap-center">
              <BusinessCard item={item} type="service" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}