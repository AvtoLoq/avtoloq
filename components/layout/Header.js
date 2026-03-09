'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe, ChevronDown, Car, LogIn } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/masters', label: t.nav.masters },
    { href: '/autoservices', label: t.nav.services },
    { href: '/services', label: t.nav.categories },
    { href: '/shops', label: t.nav.shops },
    { href: '/blogs', label: t.nav.blog },
  ]

  const langs = [
    { code: 'az', label: 'AZ', full: 'Azərbaycan' },
    { code: 'ru', label: 'RU', full: 'Русский' },
    { code: 'en', label: 'EN', full: 'English' },
  ]

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/65 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-brand-500/30 transition-shadow">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className={`font-display font-800 text-xl tracking-tight ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Avto<span className="text-brand-400">Loq</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-600 bg-brand-50'
                      : scrolled
                        ? 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    scrolled
                      ? 'text-gray-600 hover:bg-gray-100'
                      : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          lang === l.code
                            ? 'bg-brand-50 text-brand-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-bold text-xs w-7">{l.label}</span>
                        <span>{l.full}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Login button — desktop only */}
              <Link
                href="/giris"
                className={`hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all border-2 ${
                  scrolled
                    ? 'border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white'
                    : 'border-white/50 text-white hover:bg-white/10'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Giriş et
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Click outside to close lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </>
  )
}