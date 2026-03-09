'use client'
import Image from 'next/image'
import { Star, MapPin, Phone, ChevronRight } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import Link from 'next/link'

export default function BusinessCard({ item, type = 'master' }) {
  const { lang, t } = useLang()

  const name = lang === 'az' ? item.name
    : lang === 'ru' ? (item.nameRu || item.name)
    : (item.nameEn || item.name)

  const address = item.address?.[lang] || item.address?.az || ''
  const categories = item.categories?.[lang] || []
  const detailHref = type === 'master' ? `/masters/${item.id}` : `/autoservices/${item.id}`

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Open badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
          item.isOpen
            ? 'bg-emerald-500/90 text-white'
            : 'bg-black/50 text-gray-300'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.isOpen ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
          {item.isOpen ? t.cards.open : t.cards.closed}
        </div>

        {/* Rating — over image bottom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{item.rating}</span>
          <span className="text-[10px] text-white/60">({item.reviews})</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <h3 className="font-display font-700 text-gray-900 text-base leading-snug line-clamp-1">
          {name}
        </h3>

        {/* Address */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((cat, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-brand-50 text-brand-600 text-[11px] font-semibold rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href={`tel:${item.phone}`}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-600 hover:text-brand-700 text-sm font-semibold rounded-2xl transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            {t.cards.call}
          </a>
          <Link
            href={detailHref}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-2xl transition-colors"
          >
            {t.cards.details}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}




