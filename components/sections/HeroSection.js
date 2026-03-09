'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, Shield, Star, MapPin, Zap, Wrench, Building2, ShoppingBag, BookOpen, LogIn, Users } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { statsData } from '@/lib/data'

// ── Count-up hook ──
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatItem({ icon: Icon, value, label, color }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
      </div>
      <div>
        <div className="flex items-center gap-0.5 leading-none">
          <span className="font-display font-800 text-3xl text-white">
            {count.toLocaleString()}
          </span>
          <span className="font-display font-800 text-base text-brand-400">+</span>
        </div>
        <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { t } = useLang()
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/masters?q=${encodeURIComponent(query)}`)
    }
  }

  const quickLinks = [
    { label: t.nav.masters,  href: '/masters',    icon: Wrench     },
    { label: t.nav.services, href: '/services',   icon: Building2  },
    { label: t.nav.shops,    href: '/shops',      icon: ShoppingBag },
    { label: t.nav.blog,     href: '/blog',       icon: BookOpen   },
  ]

  const stats = [
    { icon: Users,       value: statsData.users,    label: t.stats.users,    color: 'from-brand-500 to-brand-600'     },
    { icon: Wrench,      value: statsData.masters,  label: t.stats.masters,  color: 'from-violet-500 to-violet-600'   },
    { icon: Building2,   value: statsData.services, label: t.stats.services, color: 'from-emerald-500 to-emerald-600' },
    { icon: ShoppingBag, value: statsData.shops,    label: t.stats.shops,    color: 'from-orange-500 to-orange-600'   },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1800&q=80"
          alt="Auto service"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl float-3 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl float-1 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 w-full">
        <div className="max-w-3xl">

          {/* Badge + Login */}
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20">
              <Zap className="w-4 h-4 text-brand-300" />
              <span className="text-sm font-semibold text-white/90">{t.hero.badge}</span>
            </div>
            <Link
              href="/login"
              className="lg:hidden flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-white/20 text-white/90 text-sm font-semibold hover:bg-white/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Giriş et
            </Link>
          </div>

          {/* Title */}
          <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white mb-5">
            {t.hero.title}{' '}
            <span className="gradient-text block sm:inline">{t.hero.titleHighlight}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 leading-relaxed mb-10 max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative flex gap-2 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.hero.search}
                className="search-input w-full pl-12 pr-4 py-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl text-base font-medium shadow-xl"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">{t.hero.searchBtn}</span>
            </button>
          </form>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickLinks.map((ql) => (
              <a
                key={ql.href}
                href={ql.href}
                className="flex items-center justify-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-semibold text-white/90 hover:bg-white/20 transition-all hover:scale-105"
              >
                <ql.icon className="w-4 h-4 text-brand-300 shrink-0" />
                <span className="truncate">{ql.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-4 glass hover:bg-white/5 transition-colors">
                <StatItem {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle opacity-60">
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}