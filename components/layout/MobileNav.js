'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wrench, Settings, ShoppingBag, BookOpen } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function MobileNav() {
  const { t } = useLang()
  const pathname = usePathname()

  const items = [
    { href: '/',              icon: Home,        label: 'Əsas' },
    { href: '/masters',       icon: Wrench,      label: t.nav.masters },
    { href: '/autoservices', icon: Settings,    label: t.nav.services },
    { href: '/shops',     icon: ShoppingBag, label: t.nav.shops },
    { href: '/blogs',          icon: BookOpen,    label: t.nav.blog },
  ]

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-0.5 px-4 py-1.5 bg-gray-900/80 backdrop-blur-2xl rounded-full shadow-2xl shadow-black/30 border border-white/10">
        {items.map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-full transition-all duration-300 ${
                active ? 'bg-white/15' : 'hover:bg-white/8'
              }`}
            >
              {/* Icon with active indicator dot on top-right */}
              <div className="relative">
                <Icon
                  className={`w-[18px] h-[18px] transition-all duration-300 ${
                    active ? 'text-white scale-110' : 'text-white/40'
                  }`}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {active && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand-400 ring-1 ring-gray-900" />
                )}
              </div>
              <span
                className={`text-[9px] font-semibold tracking-tight leading-none transition-all duration-200 ${
                  active ? 'text-white' : 'text-white/35'
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}