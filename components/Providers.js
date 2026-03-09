'use client'
import { LangProvider } from '@/lib/LangContext'

export default function Providers({ children }) {
  return <LangProvider>{children}</LangProvider>
}