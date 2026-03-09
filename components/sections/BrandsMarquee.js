'use client'
import { useLang } from '@/lib/LangContext'

const brands = [
  { name: 'BMW',        svg: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { name: 'Mercedes',   svg: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'Toyota',     svg: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28Red%29.svg' },
  { name: 'Honda',      svg: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg' },
  { name: 'Hyundai',    svg: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Hyundai_Motor_Company_logo_%28en%29.svg' },
  { name: 'Kia',        svg: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.svg' },
  { name: 'Volkswagen', svg: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
  { name: 'Audi',       svg: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { name: 'Ford',       svg: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg' },
  { name: 'Nissan',     svg: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg' },
  { name: 'Lexus',      svg: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Lexus_division_wordmark.svg' },
  { name: 'Chevrolet',  svg: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Chevrolet_logo.svg' },
]




const doubled = [...brands, ...brands]

export default function BrandsMarquee() {
  const { t } = useLang()

  return (
    <section className="py-12 bg-stone-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      {/* Label */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.2em]">
          {t.sections.brandsTitle}
        </span>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-100 to-transparent z-10 pointer-events-none" />

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {doubled.map((brand, i) => (
              <BrandItem key={`${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandItem({ brand }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-2 mx-3">
      <div className="flex items-center justify-center w-[100px] h-[56px] rounded-xl bg-white border border-stone-200 group-hover:border-stone-300 group-hover:shadow-md transition-all duration-300 px-4">
        <img
          src={brand.svg}
          alt={brand.name}
          className="h-7 w-auto max-w-[72px] object-contain"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'block'
          }}
        />
        <span className="font-display font-800 text-sm text-stone-600 hidden" style={{ display: 'none' }}>
          {brand.name}
        </span>
      </div>
      <span className="text-[10px] font-semibold text-stone-400 group-hover:text-stone-600 transition-colors tracking-wide">
        {brand.name}
      </span>
    </div>
  )
}