import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Xuno Tech - Technology Solutions',
    template: '%s | Xuno Tech'
  },
  description: 'Professional technology services including development, cloud solutions, security, and digital growth services.',
  keywords: ['technology', 'web development', 'cloud services', 'security', 'digital solutions'],
  authors: [{ name: 'Xuno Tech' }],
  creator: 'Xuno Tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xuno-tech.vercel.app',
    siteName: 'Xuno Tech',
    title: 'Xuno Tech - Technology Solutions',
    description: 'Professional technology services including development, cloud solutions, security, and digital growth services.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xuno Tech - Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xuno Tech - Technology Solutions',
    description: 'Professional technology services including development, cloud solutions, security, and digital growth services.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
} 