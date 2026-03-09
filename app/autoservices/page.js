'use client'
import ListingPage from '@/components/layout/ListingPage'
import { autoservices } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

export default function AvtoservislerPage() {
  const { t } = useLang()
  return (
    <ListingPage
      title={t.nav.services}
      subtitle={t.sections.featuredServicesDesc}
      items={autoservices}
    />
  )
}
