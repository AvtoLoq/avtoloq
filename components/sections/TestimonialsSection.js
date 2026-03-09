'use client'
import { Star } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { testimonials } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'

export default function TestimonialsSection() {
  const { lang, t } = useLang()

  return (
    <section className="py-16 lg:py-24 bg-gray-950 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-800 text-3xl lg:text-4xl text-white mb-3">
            {t.sections.testimonials}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t.sections.testimonialsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-7 card-hover group"
            >
              {/* Quote mark */}
              <div className="absolute top-5 right-6 text-5xl font-display text-white/5 select-none leading-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 star-filled" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {item.text[lang]}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-display font-700 text-sm`}>
                  {item.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.role[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}