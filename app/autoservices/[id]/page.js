'use client'
import { autoservices } from '@/lib/data'
import BusinessDetailPage from '@/components/ui/BusinessDetailPage'

export default function ServiceDetailPage({ params }) {
  const item = autoservices.find(s => s.id === Number(params.id))
  return <BusinessDetailPage item={item} type="service" />
}