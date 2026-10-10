import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INFINOS Tech — Intelligent Temperature-Controlled Transport',
  description:
    'INFINOS Tech develops smart thermal transport systems: controlled cooling and heating, sensor monitoring, and telemetry for temperature-sensitive products.',
}

export const viewport: Viewport = {
  themeColor: '#0a0b0e',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
