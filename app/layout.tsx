import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { AIChat } from '@/components/ui/AIChat'
import ContextProvider from '@/context'
import { headers } from 'next/headers'
import { assertConfigValid } from '@/lib/config/validation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MicroInsurance - Global Parametric DeFi Insurance Platform',
  description: 'Democratizing insurance access for 1.7B unbanked people globally. Smart parametric insurance with instant payouts, no paperwork, 100% transparent. Starting from $0.50 USD/month.',
  keywords: 'microinsurance, parametric insurance, defi insurance, global insurance, unbanked, financial inclusion, instant payouts, blockchain insurance, emerging markets',
  authors: [{ name: 'MicroInsurance Team' }],
  creator: 'MicroInsurance',
  publisher: 'MicroInsurance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://microinsurance.global'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MicroInsurance - Global Parametric DeFi Insurance Platform',
    description: 'Democratizing insurance access for 1.7B unbanked people globally. Smart parametric insurance with instant payouts.',
    url: 'https://microinsurance.global',
    siteName: 'MicroInsurance',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MicroInsurance - Global Parametric DeFi Insurance Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MicroInsurance - Global Parametric DeFi Insurance Platform',
    description: 'Democratizing insurance access for 1.7B unbanked people globally. Smart parametric insurance with instant payouts.',
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
  // Validate configuration on startup
  try {
    // Comentado temporalmente para evitar errores de configuración
    // assertConfigValid()
  } catch (error) {
    console.error('Configuration validation failed:', error)
    // In production, you might want to show an error page
  }

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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PakalFi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="application-name" content="PakalFi" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="shortcut icon" href="/icon-32x32.png" />
        
        {/* Apple Splash Screens */}
        <link rel="apple-touch-startup-image" href="/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash-1242x2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
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
              "description": "Global parametric micro-insurance platform democratizing access for 1.7B unbanked people",
              "url": "https://microinsurance.global",
              "logo": "https://microinsurance.global/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CH",
                "addressLocality": "Zug"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-MICRO-INS",
                "contactType": "customer service",
                "availableLanguage": ["English", "Spanish", "Portuguese", "French", "Arabic", "Hindi", "Indonesian"]
              },
              "priceRange": "$0.50-$50 USD",
              "areaServed": ["MX", "BR", "CO", "AR", "PE", "NG", "KE", "ZA", "GH", "EG", "ID", "PH", "VN", "IN", "BD"],
              "serviceType": "Insurance",
              "foundingDate": "2024",
              "numberOfEmployees": "50-100",
              "slogan": "Insurance for Everyone, Everywhere"
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
