'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function SectionHeader({ title, subtitle, href, center = false }) {
  const { t } = useLang()
  console.log("title", title);
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 ${center ? 'text-center sm:text-left' : ''}`}>
      <div>
        <h2 className={`section-title font-display font-800 text-3xl lg:text-4xl text-gray-900 ${center ? 'section-title-center' : ''}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-gray-500 text-base max-w-lg">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-200 text-brand-700 text-sm font-semibold rounded-xl hover:bg-brand-50 transition-colors shrink-0 group"
        >
          {t.sections.viewAll}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
