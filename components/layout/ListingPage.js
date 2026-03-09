'use client'
import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import BusinessCard from '@/components/ui/BusinessCard'

export default function ListingPage({ title, subtitle, items, filterOptions = [] }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = items.filter((item) => {
    const name = item.name.toLowerCase()
    const matchesQuery = !query || name.includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'open' && item.isOpen) ||
      (activeFilter === 'top' && item.rating >= 4.8)
    return matchesQuery && matchesFilter
  })

  const filters = [
    { id: 'all', label: 'Hamısı' },
    { id: 'open', label: 'Açıqdır' },
    { id: 'top', label: 'Top Reytinq' },
    ...filterOptions,
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page hero */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-950 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-800 text-3xl lg:text-5xl text-white mb-3">{title}</h1>
          <p className="text-brand-300 text-base lg:text-lg">{subtitle}</p>

          {/* Search */}
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtar..."
              className="search-input w-full pl-12 pr-10 py-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl text-sm font-medium shadow-xl"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-700 text-xl text-gray-700 mb-2">Nəticə tapılmadı</h3>
            <p className="text-gray-400">Axtarış meyarlarını dəyişdirməyə cəhd edin</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              <span className="font-bold text-gray-900">{filtered.length}</span> nəticə tapıldı
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((item) => (
                <BusinessCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
      <MobileNav />
      {/* <div className="h-20 lg:hidden" /> */}
    </div>
  )
}
