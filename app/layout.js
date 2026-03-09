import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Avtoloq — Azərbaycanın №1 Avto Platforması',
  description: 'Ustalar, avtoservislər, ehtiyat hissə mağazaları — hamısı bir yerdə.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${dmSans.variable} font-sans antialiased bg-white text-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}