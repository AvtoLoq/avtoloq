'use client'
import ListingPage from '@/components/layout/ListingPage'
import { shops } from '@/lib/data'
import { useLang } from '@/lib/LangContext'

export default function MagazalarPage() {
  const { t } = useLang()
  return (
    <ListingPage
      title={t.nav.shops}
      subtitle="Yoxlanılmış avto hissə mağazaları"
      items={shops}
    />
  )
}
