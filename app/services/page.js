'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Wrench, Zap, Car, Disc, Wind, ClipboardList, Droplets, Shield, ArrowRight, Search, ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import { serviceCategories, masters, autoservices } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

const iconMap = { Wrench, Zap, Car, Disc, Wind, ClipboardList, Droplets, Shield }

const catMeta = {
  1: { glow: '#3b82f6', gradient: 'from-blue-500 to-blue-700',    light: 'from-blue-50 to-blue-100/60',     border: 'border-blue-100',    badge: 'bg-blue-50 text-blue-600'    },
  2: { glow: '#f97316', gradient: 'from-yellow-400 to-orange-500',light: 'from-yellow-50 to-orange-50',      border: 'border-orange-100',  badge: 'bg-orange-50 text-orange-600' },
  3: { glow: '#10b981', gradient: 'from-green-500 to-emerald-600',light: 'from-green-50 to-emerald-50',      border: 'border-green-100',   badge: 'bg-green-50 text-green-600'  },
  4: { glow: '#8b5cf6', gradient: 'from-purple-500 to-purple-700',light: 'from-purple-50 to-purple-100/60',  border: 'border-purple-100',  badge: 'bg-purple-50 text-purple-600' },
  5: { glow: '#ef4444', gradient: 'from-red-500 to-rose-600',     light: 'from-red-50 to-rose-50',           border: 'border-red-100',     badge: 'bg-red-50 text-red-600'      },
  6: { glow: '#6366f1', gradient: 'from-indigo-500 to-indigo-700',light: 'from-indigo-50 to-indigo-100/60',  border: 'border-indigo-100',  badge: 'bg-indigo-50 text-indigo-600' },
  7: { glow: '#06b6d4', gradient: 'from-cyan-500 to-blue-500',    light: 'from-cyan-50 to-blue-50',          border: 'border-cyan-100',    badge: 'bg-cyan-50 text-cyan-600'    },
  8: { glow: '#64748b', gradient: 'from-slate-500 to-slate-700',  light: 'from-slate-50 to-slate-100/60',    border: 'border-slate-100',   badge: 'bg-slate-50 text-slate-600'  },
}

function CategoryCard({ cat, lang, t }) {
  const Icon = iconMap[cat.icon] || Wrench
  const meta = catMeta[cat.id] || catMeta[1]

  return (
    <Link
      href={`/masters?cat=${cat.id}`}
      className={`group relative overflow-hidden rounded-3xl border bg-white flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${meta.border}`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${meta.gradient}`} />

      {/* Hover glow */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none blur-3xl"
        style={{ background: meta.glow }}
      />

      {/* Subtle tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      <div className="relative p-6 flex flex-col gap-4 flex-1">
        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
            <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${meta.badge}`}>
            {cat.count}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-display font-700 text-gray-900 text-lg leading-snug mb-1 group-hover:text-gray-800">
            {cat.name[lang]}
          </h3>
          <p className="text-sm text-gray-400">
            {cat.count}&nbsp;
            {lang === 'az' ? 'usta / servis' : lang === 'ru' ? 'мастеров / сервисов' : 'masters / services'}
          </p>
        </div>

        {/* Footer link */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-800 transition-colors">
            {t.sections.viewAll}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ background: `${meta.glow}18`, color: meta.glow }}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function XidmetlerPage() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')

  const filtered = serviceCategories.filter(cat =>
    cat.name[lang].toLowerCase().includes(query.toLowerCase())
  )

  const totalCount = serviceCategories.reduce((s, c) => s + c.count, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-950 to-gray-950 pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* glow blobs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px] pointer-events-none" />
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-sm font-medium mb-6">
            <Wrench className="w-3.5 h-3.5" />
            {lang === 'az' ? 'Bütün xidmət kateqoriyaları' : lang === 'ru' ? 'Все категории услуг' : 'All service categories'}
          </div>

          <h1 className="font-display font-800 text-4xl lg:text-6xl text-white mb-4 tracking-tight">
            {t.sections.categories}
          </h1>
          <p className="text-brand-300 text-lg lg:text-xl mb-10 max-w-xl mx-auto">
            {t.sections.categoriesDesc}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 lg:gap-12 mb-10 flex-wrap">
            {[
              { n: serviceCategories.length, label: lang === 'az' ? 'Kateqoriya' : lang === 'ru' ? 'Категорий' : 'Categories' },
              { n: `${totalCount}+`,          label: lang === 'az' ? 'Usta & Servis' : lang === 'ru' ? 'Специалистов' : 'Specialists' },
              { n: '4.9★',                    label: lang === 'az' ? 'Orta reytinq' : lang === 'ru' ? 'Средний рейтинг' : 'Avg. rating' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white">{s.n}</div>
                <div className="text-sm text-brand-300/80 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={lang === 'az' ? 'Xidmət axtar...' : lang === 'ru' ? 'Поиск услуги...' : 'Search service...'}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-white placeholder-white/35 text-sm focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">
              {lang === 'az' ? 'Heç nə tapılmadı' : lang === 'ru' ? 'Ничего не найдено' : 'Nothing found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} lang={lang} t={t} />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 lg:p-12">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-20 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {lang === 'az' ? 'Biznesinizi platformaya əlavə edin' : lang === 'ru' ? 'Добавьте свой бизнес на платформу' : 'Add your business to the platform'}
              </h2>
              <p className="text-white/65 text-base max-w-md">
                {lang === 'az' ? 'Minlərlə potensial müştəriyə çatın, reytinq qazanın, böyüyün.' : lang === 'ru' ? 'Достигните тысяч клиентов, получайте рейтинг, растите.' : 'Reach thousands of potential customers, earn ratings, grow.'}
              </p>
            </div>
            <Link
              href="/business"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-brand-700 font-bold text-base hover:bg-brand-50 transition-colors shadow-xl whitespace-nowrap"
            >
              {lang === 'az' ? 'İndi qeydiyyatdan keç' : lang === 'ru' ? 'Зарегистрироваться' : 'Register now'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}