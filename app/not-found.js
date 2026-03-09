import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🚗</div>
        <h1 className="font-display font-800 text-6xl text-brand-600 mb-3">404</h1>
        <h2 className="font-display font-700 text-2xl text-gray-800 mb-4">Səhifə tapılmadı</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Axtardığınız səhifə mövcud deyil. Ana səhifəyə qayıdın.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
        >
          Ana Səhifəyə Qayıt
        </Link>
      </div>
    </div>
  )
}
