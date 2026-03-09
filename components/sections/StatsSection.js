'use client'
import { useEffect, useRef, useState } from 'react'
import { Users, Wrench, Building2, ShoppingBag } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { statsData } from '@/lib/data'

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

function StatCard({ icon: Icon, value, label, color, delay }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(value, 2000, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center text-center p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl card-hover overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />

      {/* Icon */}
      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      {/* Number + plus inline */}
      <div className="relative flex items-baseline gap-0.5 mb-1">
        <span className="stat-number font-display font-800 text-4xl lg:text-5xl text-white leading-none">
          {count.toLocaleString()}+
        </span>

      </div>

      <div className="relative text-gray-400 text-sm font-medium">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  const { t } = useLang()

  const stats = [
    { icon: Users,       value: statsData.users,    label: t.stats.users,    color: 'from-brand-500 to-brand-600',    delay: 0 },
    { icon: Wrench,      value: statsData.masters,  label: t.stats.masters,  color: 'from-violet-500 to-violet-600',  delay: 100 },
    { icon: Building2,   value: statsData.services, label: t.stats.services, color: 'from-emerald-500 to-emerald-600',delay: 200 },
    { icon: ShoppingBag, value: statsData.shops,    label: t.stats.shops,    color: 'from-orange-500 to-orange-600',  delay: 300 },
  ]

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-brand-950 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}