'use client'
import { createContext, useContext, useState } from 'react'
import { translations } from '@/lib/data'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('az')
  const t = translations[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
