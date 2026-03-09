'use client'
import Link from 'next/link'
import { Wrench, Zap, Car, Disc, Wind, ClipboardList, Droplets, Shield, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { serviceCategories } from '@/lib/data'

const iconMap = { Wrench, Zap, Car, Disc, Wind, ClipboardList, Droplets, Shield }

export default function CategoriesSection() {
  const { lang, t } = useLang()

  return (
    <section className="py-20 lg:py-15 bg-gray-950 relative overflow-hidden">
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 12px)`
        }}
      />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">
              Xidmətlər
            </span>
            <h2 className="font-display font-800 text-3xl lg:text-4xl text-white">
              {t.sections.categories}
            </h2>
            <p className="mt-2 text-white/35 text-sm max-w-sm">{t.sections.categoriesDesc}</p>
          </div>
          <Link href="/services" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors group">
            Hamısına bax
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {serviceCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench
            return (
              <Link
                key={cat.id}
                href={`/services?cat=${cat.id}`}
                className="group relative flex flex-col gap-4 p-5 lg:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                <div className="relative">
                  <h3 className="font-display font-700 text-white text-sm leading-snug">
                    {cat.name[lang]}
                  </h3>
                  <p className="text-[11px] text-white/25 mt-1">{cat.count} yer</p>
                </div>

                <ArrowRight className="absolute bottom-4 right-4 w-3.5 h-3.5 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            )
          })}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors">
            Hamısına bax <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}