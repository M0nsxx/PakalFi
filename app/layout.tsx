import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { AIChat } from '@/components/ui/AIChat'
import ContextProvider from '@/context'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MicroInsurance - Parametric Insurance from $10 MXN',
  description: 'Smart micro-insurance that pays automatically. No paperwork, no rejections, 100% transparent. Protect your family from $10 pesos per month.',
  keywords: 'microinsurance, parametric insurance, automatic insurance, insurance mexico, health insurance, climate insurance',
  authors: [{ name: 'MicroInsurance Team' }],
  creator: 'MicroInsurance',
  publisher: 'MicroInsurance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://microseguro.mx'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MicroInsurance - Parametric Insurance from $10 MXN',
    description: 'Smart micro-insurance that pays automatically. No paperwork, no rejections, 100% transparent.',
    url: 'https://microseguro.mx',
    siteName: 'MicroInsurance',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MicroInsurance - Parametric Insurance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MicroInsurance - Parametric Insurance from $10 MXN',
    description: 'Smart micro-insurance that pays automatically. No paperwork, no rejections, 100% transparent.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cinzel:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* PWA Configuration */}
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MicroInsurance" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        
        {/* PWA Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icon-57x57.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Splash Screens */}
        <link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1290x2796.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1179x2556.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1284x2778.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1170x2532.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1125x2436.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1242x2688.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="/splash-828x1792.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/splash-1125x2436.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/splash-750x1334.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/splash-640x1136.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "MicroInsurance",
              "description": "Smart parametric micro-insurance that pays automatically",
              "url": "https://microseguro.mx",
              "logo": "https://microseguro.mx/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MX",
                "addressLocality": "Mexico City"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52-55-1234-5678",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "priceRange": "$10-$150 MXN",
              "areaServed": "MX",
              "serviceType": "Insurance"
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ContextProvider cookies={cookies}>
          <Navbar />
          <div id="root">
            {children}
          </div>
          <Footer />
          <AIChat />
        </ContextProvider>
        
        {/* Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              ga('create', 'GA_MEASUREMENT_ID', 'auto');
              ga('send', 'pageview');
            `,
          }}
        />
      </body>
    </html>
  )
}
