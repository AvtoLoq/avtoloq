'use client'
import { useRef } from 'react'
import { ThumbsUp, Phone, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { AnimatedBeam } from '@/components/ui/AnimatedBeam'

function AIIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9">
      {/* Head */}
      <rect x="8" y="11" width="20" height="16" rx="4" stroke="white" strokeWidth="1.8" fill="none"/>
      {/* Eyes */}
      <circle cx="13.5" cy="18" r="2.5" fill="white"/>
      <circle cx="22.5" cy="18" r="2.5" fill="white"/>
      <circle cx="13.5" cy="18" r="1" fill="rgba(99,102,241,0.8)"/>
      <circle cx="22.5" cy="18" r="1" fill="rgba(99,102,241,0.8)"/>
      {/* Mouth */}
      <path d="M13 23 Q18 26 23 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Antenna */}
      <line x1="18" y1="11" x2="18" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="5" r="1.5" fill="white"/>
      {/* Ears */}
      <rect x="4" y="16" width="3" height="6" rx="1.5" fill="white" opacity="0.7"/>
      <rect x="29" y="16" width="3" height="6" rx="1.5" fill="white" opacity="0.7"/>
    </svg>
  )
}

export default function HowItWorksSection() {
  const { t, lang } = useLang()

  const containerRef = useRef(null)
  const step1Ref = useRef(null)
  const step2Ref = useRef(null)
  const step3Ref = useRef(null)

  const steps = [
    {
      ref: step1Ref,
      isAI: true,
      title: { az: 'AI Axtarış', ru: 'AI Поиск', en: 'AI Search' },
      desc: {
        az: 'AI Assistentimiz sizi dinləyir, ehtiyacınızı başa düşür və ən uyğun ustanı tövsiyə edir',
        ru: 'Наш AI Ассистент слушает вас, понимает потребность и рекомендует подходящего мастера',
        en: 'Our AI Assistant listens to you, understands your need and recommends the best master',
      },
      color: 'from-violet-600 via-brand-600 to-cyan-500',
      ringColor: 'ring-violet-300',
      labelColor: 'text-violet-700',
      bgAccent: 'bg-violet-50',
      borderAccent: 'border-violet-100',
      num: '1',
    },
    {
      ref: step2Ref,
      icon: ThumbsUp,
      title: { az: t.sections.step2Title, ru: t.sections.step2Title, en: t.sections.step2Title },
      desc: { az: t.sections.step2Desc, ru: t.sections.step2Desc, en: t.sections.step2Desc },
      color: 'from-brand-500 to-brand-700',
      ringColor: 'ring-brand-200',
      labelColor: 'text-brand-700',
      bgAccent: 'bg-brand-50',
      borderAccent: 'border-brand-100',
      num: '2',
    },
    {
      ref: step3Ref,
      icon: Phone,
      title: { az: t.sections.step3Title, ru: t.sections.step3Title, en: t.sections.step3Title },
      desc: { az: t.sections.step3Desc, ru: t.sections.step3Desc, en: t.sections.step3Desc },
      color: 'from-emerald-500 to-emerald-600',
      ringColor: 'ring-emerald-200',
      labelColor: 'text-emerald-700',
      bgAccent: 'bg-emerald-50',
      borderAccent: 'border-emerald-100',
      num: '3',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gray-950 overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
            Necə işləyir
          </span>
          {/* <h2 className="font-display font-800 text-3xl lg:text-4xl text-white">
            {t.sections.howItWorks}
          </h2> */}
          <p className="mt-3 text-white/40 max-w-md mx-auto text-sm leading-relaxed">{t.sections.howDesc}</p>
        </div>

        {/* Steps */}
        <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Animated beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step1Ref}
            toRef={step2Ref}
            curvature={-30}
            gradientStartColor="#7c3aed"
            gradientStopColor="#2563eb"
            pathColor="rgba(255,255,255,0.07)"
            pathWidth={1.5}
            duration={3.5}
            delay={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step2Ref}
            toRef={step3Ref}
            curvature={-30}
            gradientStartColor="#2563eb"
            gradientStopColor="#10b981"
            pathColor="rgba(255,255,255,0.07)"
            pathWidth={1.5}
            duration={3.5}
            delay={1.75}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center px-6 py-8"
            >
              {/* Icon */}
              <div
                ref={step.ref}
                className={`relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300 ${step.isAI ? 'ring-2 ring-offset-2 ring-offset-gray-950 ' + step.ringColor : ''}`}
              >
                {step.isAI && (
                  <span className="absolute inset-0 rounded-2xl animate-ping bg-violet-400 opacity-15" />
                )}
                {step.isAI ? <AIIcon /> : <step.icon className="w-8 h-8 text-white" strokeWidth={2} />}

                {/* Step number — icon top-right */}
                <div className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-gray-900 border border-white/10 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-bold text-white/60">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {step.isAI && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-violet-600 to-brand-600 rounded-full shadow-md">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                    <span className="text-[9px] font-bold text-white tracking-wide">AI</span>
                  </div>
                )}
              </div>

              <h3 className={`font-display font-700 text-lg mb-2 mt-1 text-white`}>
                {step.title[lang] || step.title.az}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                {step.desc[lang] || step.desc.az}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}