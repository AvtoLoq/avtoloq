'use client'
import ListingPage from '@/components/layout/ListingPage'
import { masters } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

export default function UstalarPage() {
  const { t } = useLang()
  return (
    <ListingPage
      title={t.nav.masters}
      subtitle={t.sections.featuredMastersDesc}
      items={masters}
    />
  )
}
