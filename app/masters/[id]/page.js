'use client'
import { masters } from '@/lib/data'
import BusinessDetailPage from '@/components/ui/BusinessDetailPage'

export default function MasterDetailPage({ params }) {
  const item = masters.find(m => m.id === Number(params.id))
  return <BusinessDetailPage item={item} type="master" />
}