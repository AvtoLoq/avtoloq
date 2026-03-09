'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Clock, Calendar, Share2, Bookmark, Play, Zap, Shield, Users, DollarSign } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import { HeroVideoDialog } from '@/components/ui/HeroVideoDialog'
import { ShareModal } from '@/components/ui/ShareModal'
import { blogPosts } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

const categoryMeta = {
  'Məsləhətlər':   { label: 'Məsləhət',     color: '#3b82f6' },
  'Советы':        { label: 'Советы',        color: '#3b82f6' },
  'Tips':          { label: 'Tips',          color: '#3b82f6' },
  'Texniki':       { label: 'Texniki',       color: '#8b5cf6' },
  'Технические':   { label: 'Техника',       color: '#8b5cf6' },
  'Technical':     { label: 'Technical',     color: '#8b5cf6' },
  'Trend':         { label: 'Trend',         color: '#f97316' },
  'Тренды':        { label: 'Тренды',        color: '#f97316' },
  'Trends':        { label: 'Trends',        color: '#f97316' },
  'Təhlükəsizlik': { label: 'Təhlükəsizlik', color: '#ef4444' },
  'Безопасность':  { label: 'Безопасность',  color: '#ef4444' },
  'Safety':        { label: 'Safety',        color: '#ef4444' },
}

function PostDate({ dateStr, lang }) {
  const [label, setLabel] = useState('')
  useEffect(() => {
    setLabel(new Date(dateStr).toLocaleDateString(
      lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' }
    ))
  }, [dateStr, lang])
  return <span>{label}</span>
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('article-body')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-transparent">
      <div className="h-full bg-gradient-to-r from-brand-500 to-blue-400 transition-all duration-75"
        style={{ width: `${progress}%` }} />
    </div>
  )
}

function ContentBlock({ block }) {
  if (block.type === 'heading') {
    return (
      <h2 className="flex items-center gap-3 text-xl font-bold text-white mt-10 mb-4">
        <span className="w-1 h-6 rounded-full flex-shrink-0"
          style={{ background: 'linear-gradient(to bottom, #3b82f6, #6366f1)' }} />
        {block.text}
      </h2>
    )
  }
  if (block.type === 'tip') {
    return (
      <div className="my-5 relative rounded-2xl overflow-hidden"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)' }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: 'linear-gradient(to bottom, #f59e0b, #f97316)' }} />
        <div className="flex items-start gap-3 p-4 pl-5">
          <span className="text-lg flex-shrink-0">💡</span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(253,230,138,0.85)' }}>{block.text}</p>
        </div>
      </div>
    )
  }
  return <p className="text-base leading-[1.85] mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>{block.text}</p>
}

/* ─── DESKTOP layout (unchanged) ─── */
function DesktopLayout({ post, lang, t, title, excerpt, category, content, catMeta, embedUrl, thumbnailUrl, saved, setSaved, copied, handleShare }) {
  return (
    <div className="hidden lg:block min-h-screen bg-gray-950 text-white">
      <ReadingProgress />
      <Header />
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-10 blur-[120px]"
            style={{ background: catMeta?.color || '#3b82f6' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-12 pb-0">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm mb-8 group transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Bloga qayıt
          </Link><br />
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border mb-5"
            style={{ background: `${catMeta?.color}18`, color: catMeta?.color, borderColor: `${catMeta?.color}30` }}>
            {category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">{title}</h1>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>{excerpt}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 py-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{post.author}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Müəllif</p>
                </div>
              </div>
              <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><PostDate dateStr={post.date} lang={lang} /></span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime} dəq</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSaved(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                {saved ? <Bookmark className="w-3.5 h-3.5 fill-blue-500" style={{ color: '#3b82f6' }} /> : <Bookmark className="w-3.5 h-3.5" />}
                {saved ? 'Saxlandı' : 'Saxla'}
              </button>
              <button onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                <Share2 className="w-3.5 h-3.5" />
                {copied ? 'Kopyalandı!' : 'Paylaş'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-10">
        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <HeroVideoDialog videoSrc={embedUrl} thumbnailSrc={thumbnailUrl} thumbnailAlt={title}
            animationStyle="from-center" className="absolute inset-0" />
        </div>
      </div>
      <div id="article-body" className="max-w-4xl mx-auto px-6 lg:px-8 mt-12 pb-24">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article>
            {content.map((block, i) => <ContentBlock key={i} block={block} />)}
            <div className="mt-12 pt-8 flex items-center justify-between flex-wrap gap-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Bu məqaləni faydalı tapdınız?</span>
              <div className="flex gap-2">
                <button onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: '#2563eb', color: '#fff' }}>
                  <Share2 className="w-4 h-4" />{copied ? 'Kopyalandı!' : 'Paylaş'}
                </button>
                <Link href="/blogs"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  <ChevronLeft className="w-4 h-4" />Bloga qayıt
                </Link>
              </div>
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Digər məqalələr</h3>
              {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(rp => (
                <Link key={rp.id} href={`/blogs/${rp.id}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-2">
                    <img src={`https://img.youtube.com/vi/${rp.videoId}/mqdefault.jpg`}
                      alt={rp.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.8)' }}>
                        <Play className="w-3 h-3 fill-gray-900 text-gray-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {rp.title[lang]}
                  </p>
                  <span className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <Clock className="w-3 h-3" />{rp.readTime} dəq
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      <MobileNav />
    </div>
  )
}

/* ─── MOBILE layout (drawer-style) ─── */
function MobileLayout({ post, lang, t, title, excerpt, category, content, catMeta, embedUrl, thumbnailUrl, saved, setSaved, copied, handleShare }) {
  return (
    <div className="lg:hidden min-h-screen" style={{ background: '#111111' }}>
      <ReadingProgress />

      {/* Full-screen hero thumbnail */}
      <div className="fixed top-0 left-0 right-0 h-[45vh] z-0">
        <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, #151515 100%)' }} />
      </div>

      {/* Back button — fixed top left */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
        <Link href="/blogs"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <button onClick={handleShare}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Scrollable card — slides up over the hero */}
      <div className="relative z-10 mt-[38vh]">
        <div className="min-h-screen rounded-t-[32px] relative overflow-hidden"
          style={{ background: '#151515', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

          {/* Drag handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)' }} />

          <div className="pt-8 px-4 pb-32 space-y-7">

            {/* Title block */}
            <div className="space-y-3 pt-2">
              {/* Category pill */}
              <div className="flex gap-2 flex-wrap">
                <div className="w-fit px-3 py-1 flex items-center rounded-full"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-[10px] uppercase tracking-wider font-semibold"
                    style={{ color: catMeta?.color || 'rgba(255,255,255,0.5)' }}>
                    {category}
                  </span>
                </div>
                <div className="w-fit px-3 py-1 flex items-center rounded-full"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-[10px] uppercase tracking-wider font-semibold"
                    style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {post.readTime} dəq
                  </span>
                </div>
              </div>

              {/* Gradient title */}
              <h1 className="text-[30px] leading-[1.1] font-bold tracking-tight"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #b5b5b5 0%, #b5b5b5 35%, #ffffff 50%, #b5b5b5 65%, #b5b5b5 100%)',
                  backgroundSize: '200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                {title}
              </h1>

              {/* Excerpt */}
              <p className="text-[15px] leading-[1.5]" style={{ color: 'rgba(255,255,255,0.6)' }}>{excerpt}</p>

              {/* Author + date row */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold">{post.author}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <PostDate dateStr={post.date} lang={lang} />
                  </p>
                </div>
                <button onClick={() => setSaved(v => !v)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all active:scale-95"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>
                  {saved ? <Bookmark className="w-3.5 h-3.5" style={{ color: '#3b82f6' }} /> : <Bookmark className="w-3.5 h-3.5" />}
                  {saved ? 'Saxlandı' : 'Saxla'}
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden aspect-video"
              style={{ border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
              <HeroVideoDialog videoSrc={embedUrl} thumbnailSrc={thumbnailUrl} thumbnailAlt={title}
                animationStyle="from-center" className="absolute inset-0" />
            </div>

            {/* Article content */}
            <div>
              <h3 className="text-[18px] font-bold text-white mb-4">Məqalə məzmunu</h3>
              <div id="article-body">
                {content.map((block, i) => <ContentBlock key={i} block={block} />)}
              </div>
            </div>

            {/* Related posts */}
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).length > 0 && (
              <div>
                <h3 className="text-[18px] font-bold text-white mb-4">Digər məqalələr</h3>
                <div className="space-y-3">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(rp => {
                    const rpCat = rp.category[lang]
                    const rpMeta = categoryMeta[rpCat]
                    return (
                      <Link key={rp.id} href={`/blogs/${rp.id}`}
                        className="flex gap-3 items-center p-3 rounded-2xl active:scale-[0.98] transition-all"
                        style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={`https://img.youtube.com/vi/${rp.videoId}/mqdefault.jpg`}
                            alt={rp.title[lang]} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.25)' }}>
                            <Play className="w-3 h-3 fill-white text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: rpMeta?.color || 'rgba(255,255,255,0.4)' }}>
                            {rpCat}
                          </span>
                          <p className="text-white text-[13px] font-semibold leading-snug line-clamp-2 mt-0.5">
                            {rp.title[lang]}
                          </p>
                          <span className="flex items-center gap-1 mt-1 text-[11px]"
                            style={{ color: 'rgba(255,255,255,0.35)' }}>
                            <Clock className="w-3 h-3" />{rp.readTime} dəq
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #151515 0%, rgba(21,21,21,0.9) 60%, transparent 100%)' }} />
        {/* <div className="relative flex items-center gap-3">
          <Link href="/blogs"
            className="flex-1 h-14 flex items-center justify-center rounded-2xl font-bold text-[14px] text-white active:scale-[0.98] transition-all"
            style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.08)' }}>
            Bağla
          </Link>
          <button onClick={handleShare}
            className="flex-[3] h-14 flex items-center justify-center gap-2 rounded-2xl font-bold text-[16px] text-white active:scale-[0.98] transition-all overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
            <Share2 className="w-4 h-4" />
            {copied ? 'Kopyalandı!' : 'Paylaş'}
          </button>
        </div> */}
      </div>

      <MobileNav />
    </div>
  )
}

/* ─── Main page ─── */
export default function BlogDetailPage({ params }) {
  const { id } = params
  const { lang, t } = useLang()
  const [saved, setSaved] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const post = blogPosts.find((p) => p.id === Number(id))

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Məqalə tapılmadı</p>
          <Link href="/blogs" className="text-blue-400 hover:text-blue-300 underline">Bloga qayıt</Link>
        </div>
      </div>
    )
  }

  const title      = post.title[lang]
  const excerpt    = post.excerpt[lang]
  const category   = post.category[lang]
  const content    = post.content?.[lang] ?? []
  const catMeta    = categoryMeta[category]
  const embedUrl   = `https://www.youtube.com/embed/${post.videoId}`
  const thumbnailUrl = `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`

  const handleShare = () => setShareOpen(true)

  const sharedProps = { post, lang, t, title, excerpt, category, content, catMeta, embedUrl, thumbnailUrl, saved, setSaved, copied: false, handleShare }

  return (
    <>
      <MobileLayout {...sharedProps} />
      <DesktopLayout {...sharedProps} />
      {shareOpen && (
        <ShareModal
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={title}
          onClose={() => setShareOpen(false)}
        />
      )}
    </>
  )
}