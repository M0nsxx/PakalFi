const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
              urlPattern: /^https:\/\/api\.pakalfi\.mx/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 // 24 hours
        }
      }
    }
  ]
})

module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['api.whatsapp.com', 'monad.xyz', 'images.unsplash.com'],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    // Add alias for missing Para SDK
    config.resolve.alias['@getpara/react-sdk'] = require.resolve('./lib/integrations/build-fixes.ts')
    
    return config
  },
  experimental: {
    // optimizeCss: true, // Temporalmente deshabilitado
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  // Optimizaciones para hidratación
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración para mejorar la hidratación
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
})
