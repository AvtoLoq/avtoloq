'use client'
import Link from 'next/link'
import { Car, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function Footer() {
  const { t } = useLang()

  const links = [
    { href: '/masters',       label: t.nav.masters },
    { href: '/autoservices', label: t.nav.services },
    { href: '/services',     label: t.nav.categories },
    { href: '/shops',     label: t.nav.shops },
    { href: '/blogs',          label: t.nav.blog },
  ]

  return (
    <footer className="bg-gray-950 text-white">
      {/* Top wave */}
      <div className="h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-800 text-xl">
                Avto<span className="text-brand-400">Loq</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook,  href: '#' },
                { Icon: Youtube,   href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-600 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display font-700 text-sm text-gray-200 uppercase tracking-widest">
              {t.footer.links}
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-brand-500 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-700 text-sm text-gray-200 uppercase tracking-widest">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              {[
                { Icon: Mail,    text: 'info@avtoloq.az' },
                { Icon: Phone,   text: '+994 50 272 10 02' },
                { Icon: MapPin,  text: t.footer.address },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AutoServis. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
