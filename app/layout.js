import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Top Mais Top - Crédito Consignado Inteligente',
  description:
    'Conectamos você às melhores ofertas de crédito consignado do mercado. Processo 100% digital, seguro e transparente. Aprovação rápida em até 24 horas.',
  keywords:
    'crédito consignado, empréstimo, fintech, crédito pessoal, taxas baixas, aprovação rápida',
  authors: [{ name: 'Top Mais Top' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Top Mais Top - Crédito Consignado Inteligente',
    description:
      'Conectamos você às melhores ofertas de crédito consignado do mercado. Processo 100% digital, seguro e transparente.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
