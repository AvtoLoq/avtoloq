'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, Calendar } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import { HeroVideoDialog } from '@/components/ui/HeroVideoDialog'
import { blogPosts } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

const categoryColors = {
  'Məsləhətlər':   'bg-blue-100 text-blue-700',
  'Советы':        'bg-blue-100 text-blue-700',
  'Tips':          'bg-blue-100 text-blue-700',
  'Texniki':       'bg-purple-100 text-purple-700',
  'Технические':   'bg-purple-100 text-purple-700',
  'Technical':     'bg-purple-100 text-purple-700',
  'Trend':         'bg-orange-100 text-orange-700',
  'Тренды':        'bg-orange-100 text-orange-700',
  'Trends':        'bg-orange-100 text-orange-700',
  'Təhlükəsizlik': 'bg-red-100 text-red-700',
  'Безопасность':  'bg-red-100 text-red-700',
  'Safety':        'bg-red-100 text-red-700',
}

function PostDate({ dateStr, lang }) {
  const [label, setLabel] = useState('')
  useEffect(() => {
    setLabel(
      new Date(dateStr).toLocaleDateString(
        lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      )
    )
  }, [dateStr, lang])
  return <span>{label}</span>
}

function BlogCard({ post, featured = false }) {
  const { lang, t } = useLang()
  const title    = post.title[lang]
  const excerpt  = post.excerpt[lang]
  const category = post.category[lang]

  const embedUrl     = `https://www.youtube.com/embed/${post.videoId}`
  const thumbnailUrl = `https://img.youtube.com/vi/${post.videoId}/maxresdefault.jpg`

  if (featured) {
    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover lg:flex">
        <div className="relative lg:w-1/2 h-56 lg:h-72 overflow-hidden">
          <HeroVideoDialog
            videoSrc={embedUrl}
            thumbnailSrc={thumbnailUrl}
            thumbnailAlt={title}
            animationStyle="from-center"
            className="absolute inset-0"
          />
        </div>
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center gap-4">
          <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-bold ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
            {category}
          </span>
          <h2 className="font-display font-800 text-xl lg:text-2xl text-gray-900 leading-snug">{title}</h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <PostDate dateStr={post.date} lang={lang} />
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} dəq
              </span>
            </div>
            <Link href={`/blogs/${post.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all">
              {t.cards.readMore} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <HeroVideoDialog
          videoSrc={embedUrl}
          thumbnailSrc={thumbnailUrl}
          thumbnailAlt={title}
          animationStyle="from-center"
          className="absolute inset-0"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display font-700 text-gray-900 text-base leading-snug line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} dəq</span>
          </div>
          <Link href={`/blogs/${post.id}`} className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:gap-2 transition-all">
            {t.cards.readMore} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const { t, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all',    label: { az: 'Hamısı',       ru: 'Все',          en: 'All'       } },
    { id: 'tips',   label: { az: 'Məsləhətlər',  ru: 'Советы',       en: 'Tips'      } },
    { id: 'tech',   label: { az: 'Texniki',       ru: 'Технические',  en: 'Technical' } },
    { id: 'safety', label: { az: 'Təhlükəsizlik', ru: 'Безопасность', en: 'Safety'    } },
    { id: 'trends', label: { az: 'Trend',         ru: 'Тренды',       en: 'Trends'    } },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gradient-to-br from-brand-900 to-brand-950 pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-800 text-4xl lg:text-5xl text-white mb-3">{t.nav.blog}</h1>
          <p className="text-brand-300 text-lg">Avtomobil dünyasından son xəbərlər və məsləhətlər</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === c.id
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-6">
        <BlogCard post={blogPosts[0]} featured />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.slice(1).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}