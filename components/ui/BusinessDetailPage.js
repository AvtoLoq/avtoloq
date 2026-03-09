'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronLeft, Star, MapPin, Phone, Clock, Share2,
  Bookmark, Award, Wrench, CheckCircle2, Play
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import { HeroVideoDialog } from '@/components/ui/HeroVideoDialog'
import { ShareModal } from '@/components/ui/ShareModal'
import { useLang } from '@/lib/LangContext'

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
      ))}
    </div>
  )
}

function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = document.getElementById('detail-body')
    const onScroll = () => {
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      setP(total > 0 ? Math.min(100, Math.max(0, (-el.getBoundingClientRect().top / total) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px]">
      <div className="h-full bg-gradient-to-r from-brand-500 to-blue-400 transition-all duration-75"
        style={{ width: `${p}%` }} />
    </div>
  )
}

/* DESKTOP */
function DesktopLayout({ item, type, name, address, categories, bio, lang, t, saved, setSaved, setShareOpen }) {
  const embedUrl     = item.videoId ? `https://www.youtube.com/embed/${item.videoId}` : null
  const thumbnailUrl = item.videoId ? `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg` : null
  const backHref     = type === 'master' ? '/masters' : '/autoservices'
  const experience   = item.experience

  return (
    <div className="hidden lg:block min-h-screen bg-[#0d0d0d] text-white">
      <ReadingProgress />
      <Header />

      <div className="relative min-h-[92vh] flex pt-20">

        {/* LEFT: sticky image — diagonal clip for sharp geometric split */}
        <div className="sticky top-0 h-screen w-[44%] flex-shrink-0 relative">
          {/* Clipped image layer */}
          <div className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 87% 0, 100% 100%, 0 100%)' }}>
            <img src={item.image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            {/* Top + bottom vignette — no side gradient needed with clip */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 28%, transparent 52%, rgba(0,0,0,0.7) 100%)' }} />
          </div>

          {/* Open badge — outside clip so it renders fully */}
          <div className={`absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            item.isOpen
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-black/40 text-gray-400 border border-white/10'
          }`} style={{ backdropFilter: 'blur(8px)' }}>
            <span className={`w-2 h-2 rounded-full ${item.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
            {item.isOpen ? t.cards.open : t.cards.closed}
          </div>

          {/* Bottom: rating + experience */}
          <div className="absolute bottom-0 left-0 right-20 px-8 pb-8 pt-24 z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Stars rating={item.rating} />
                  <span className="text-amber-300 font-bold text-lg">{item.rating}</span>
                </div>
                <p className="text-white/50 text-sm">
                  {item.reviews} {lang === 'az' ? 'rəy' : lang === 'ru' ? 'отзывов' : 'reviews'}
                </p>
              </div>
              {experience && (
                <div className="text-right">
                  <div className="text-4xl font-black text-white leading-none">{experience}</div>
                  <div className="text-white/50 text-sm mt-1">
                    {lang === 'az' ? 'il təcrübə' : lang === 'ru' ? 'лет опыта' : 'yrs exp.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: scrollable */}
        <div id="detail-body" className="flex-1 min-h-screen px-14 py-10 relative">

          {/* TOP ROW — back on left, save+share on right, same line */}
          <div className="flex items-center justify-between mb-10">
            <Link href={backHref}
              className="inline-flex items-center gap-2 text-sm group transition-colors"
              style={{ color: 'rgba(255,255,255,0.38)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {lang === 'az' ? 'Geri qayıt' : lang === 'ru' ? 'Назад' : 'Go back'}
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => setSaved(v => !v)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
                {saved
                  ? <Bookmark className="w-4 h-4 text-brand-400" />
                  : <Bookmark className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />}
              </button>
              <button onClick={() => setShareOpen(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <Share2 className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
              </button>
            </div>
          </div>

          {/* Type badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 border"
            style={{ background: 'rgba(37,99,235,0.12)', color: '#60a5fa', borderColor: 'rgba(37,99,235,0.25)' }}>
            <Wrench className="w-3 h-3" />
            {type === 'master'
              ? (lang === 'az' ? 'Peşəkar Usta' : lang === 'ru' ? 'Мастер' : 'Master')
              : (lang === 'az' ? 'Avtoservis' : lang === 'ru' ? 'Автосервис' : 'Auto Service')}
          </div>

          <h1 className="text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
            {name}
          </h1>

          <div className="flex items-center gap-2 text-white/50 mb-6">
            <MapPin className="w-4 h-4 text-brand-400" />
            <span>{address}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {cat}
              </span>
            ))}
          </div>

          {bio && (
            <div className="mb-10">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-brand-500 flex-shrink-0" />
                {lang === 'az' ? 'Haqqında' : lang === 'ru' ? 'О нас' : 'About'}
              </h2>
              <p className="text-base leading-[1.85]" style={{ color: 'rgba(255,255,255,0.6)' }}>{bio}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: Star, value: item.rating, label: lang === 'az' ? 'Reytinq' : lang === 'ru' ? 'Рейтинг' : 'Rating', color: '#f59e0b' },
              { icon: Award, value: `${item.reviews}+`, label: lang === 'az' ? 'Rəy' : lang === 'ru' ? 'Отзывов' : 'Reviews', color: '#8b5cf6' },
              { icon: CheckCircle2, value: experience ? `${experience}+` : '✓', label: lang === 'az' ? (experience ? 'İl' : 'Zəmanət') : lang === 'ru' ? (experience ? 'Лет' : 'Гарантия') : (experience ? 'Years' : 'Warranty'), color: '#10b981' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {embedUrl && (
            <div className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-brand-500 flex-shrink-0" />
                {lang === 'az' ? 'Video' : 'Видео'}
              </h2>
              <div className="relative rounded-2xl overflow-hidden aspect-video"
                style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <HeroVideoDialog videoSrc={embedUrl} thumbnailSrc={thumbnailUrl}
                  thumbnailAlt={name} animationStyle="from-center" className="absolute inset-0" />
              </div>
            </div>
          )}

          <a href={`tel:${item.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: '#fff', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
            <Phone className="w-5 h-5" />
            {item.phone}
          </a>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}

/* MOBILE */
function MobileLayout({ item, type, name, address, categories, bio, lang, t, saved, setSaved, setShareOpen }) {
  const embedUrl     = item.videoId ? `https://www.youtube.com/embed/${item.videoId}` : null
  const thumbnailUrl = item.videoId ? `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg` : null
  const backHref     = type === 'master' ? '/masters' : '/autoservices'

  return (
    <div className="lg:hidden min-h-screen" style={{ background: '#111111' }}>
      <ReadingProgress />

      <div className="fixed top-0 left-0 right-0 h-[45vh] z-0">
        <img src={item.image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, #151515 100%)' }} />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <Link href={backHref}
          className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setSaved(v => !v)}
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {saved ? <Bookmark className="w-5 h-5 text-brand-400" /> : <Bookmark className="w-5 h-5 text-white" />}
          </button>
          <button onClick={() => setShareOpen(true)}
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-[38vh]">
        <div className="min-h-screen rounded-t-[32px] relative overflow-hidden"
          style={{ background: '#151515', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)' }} />

          <div id="detail-body" className="pt-8 px-4 pb-32 space-y-6">
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 flex-wrap">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                  item.isOpen
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                    : 'bg-white/5 text-white/40 border-white/10'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                  {item.isOpen ? t.cards.open : t.cards.closed}
                </div>
                <div className="px-3 py-1 rounded-full text-[11px] font-bold border"
                  style={{ background: 'rgba(37,99,235,0.12)', color: '#60a5fa', borderColor: 'rgba(37,99,235,0.25)' }}>
                  {type === 'master'
                    ? (lang === 'az' ? 'Usta' : lang === 'ru' ? 'Мастер' : 'Master')
                    : (lang === 'az' ? 'Servis' : 'Сервис')}
                </div>
              </div>

              <h1 className="text-[30px] leading-[1.1] font-black tracking-tight"
                style={{
                  backgroundImage: 'linear-gradient(120deg,#b5b5b5 0%,#b5b5b5 35%,#ffffff 50%,#b5b5b5 65%,#b5b5b5 100%)',
                  backgroundSize: '200%', backgroundClip: 'text',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                {name}
              </h1>

              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <span>{address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Stars rating={item.rating} />
                <span className="text-amber-300 font-bold">{item.rating}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  ({item.reviews} {lang === 'az' ? 'rəy' : lang === 'ru' ? 'отзывов' : 'reviews'})
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {categories.map((cat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: Star, value: item.rating, label: lang === 'az' ? 'Reytinq' : 'Рейтинг', color: '#f59e0b' },
                { icon: Award, value: `${item.reviews}+`, label: lang === 'az' ? 'Rəy' : 'Отзывов', color: '#8b5cf6' },
                { icon: CheckCircle2, value: item.experience ? `${item.experience}+` : '✓', label: lang === 'az' ? (item.experience ? 'İl' : 'Zəmanət') : (item.experience ? 'Лет' : 'Гарантия'), color: '#10b981' },
              ].map((s, i) => (
                <div key={i} className="p-3.5 rounded-2xl flex flex-col gap-1.5"
                  style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {bio && (
              <div>
                <h3 className="text-[18px] font-bold text-white mb-3">
                  {lang === 'az' ? 'Haqqında' : lang === 'ru' ? 'О нас' : 'About'}
                </h3>
                <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.6)' }}>{bio}</p>
              </div>
            )}

            {embedUrl && (
              <div>
                <h3 className="text-[18px] font-bold text-white mb-3">Video</h3>
                <div className="relative rounded-2xl overflow-hidden aspect-video"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                  <HeroVideoDialog videoSrc={embedUrl} thumbnailSrc={thumbnailUrl}
                    thumbnailAlt={name} animationStyle="from-center" className="absolute inset-0" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top,#151515,rgba(21,21,21,0.9) 60%,transparent)' }} />
        <div className="relative flex items-center gap-3">
          <Link href={backHref}
            className="flex-1 h-14 flex items-center justify-center rounded-2xl font-bold text-[14px] text-white active:scale-[0.98] transition-all"
            style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.08)' }}>
            {lang === 'az' ? 'Geri' : lang === 'ru' ? 'Назад' : 'Back'}
          </Link>
          <a href={`tel:${item.phone}`}
            className="flex-[3] h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-[16px] text-white active:scale-[0.98] transition-all"
            style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
            <Phone className="w-4 h-4" />
            {t.cards.call}
          </a>
        </div>
      </div>

    </div>
  )
}

/* MAIN */
export default function BusinessDetailPage({ item, type }) {
  const { lang, t } = useLang()
  const [saved, setSaved] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  if (!item) {
    const backHref = type === 'master' ? '/masters' : '/autoservices'
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">
            {lang === 'az' ? 'Tapılmadı' : lang === 'ru' ? 'Не найдено' : 'Not found'}
          </p>
          <Link href={backHref} className="text-blue-400 underline">
            {lang === 'az' ? 'Geri qayıt' : 'Назад'}
          </Link>
        </div>
      </div>
    )
  }

  const name       = lang === 'az' ? item.name : lang === 'ru' ? (item.nameRu || item.name) : (item.nameEn || item.name)
  const address    = item.address?.[lang] || item.address?.az || ''
  const categories = item.categories?.[lang] || []
  const bio        = (item.bio || item.description)?.[lang] || null

  const sharedProps = { item, type, name, address, categories, bio, lang, t, saved, setSaved, setShareOpen }

  return (
    <>
      <MobileLayout {...sharedProps} />
      <DesktopLayout {...sharedProps} />
      {shareOpen && (
        <ShareModal
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={name}
          onClose={() => setShareOpen(false)}
        />
      )}
    </>
  )
}