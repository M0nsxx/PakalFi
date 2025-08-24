const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['api.whatsapp.com', 'monad.xyz', 'images.unsplash.com']
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.alias['@getpara/react-sdk'] = require.resolve('./lib/integrations/build-fixes.ts')
    return config
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
})
