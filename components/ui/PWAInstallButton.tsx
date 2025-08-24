'use client'

import { usePWAInstall } from '@/hooks/usePWAInstall'
import { Download, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface PWAInstallButtonProps {
  className?: string
}

export function PWAInstallButton({ className = '' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, installPWA } = usePWAInstall()
  
  // En desarrollo, siempre mostrar el botón para testing
  const isDevelopment = process.env.NODE_ENV === 'development'
  const shouldShow = isInstallable || isDevelopment

  if (isInstalled) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center space-x-2 text-green-400 px-3 py-2 rounded-full font-medium border border-green-400/30 bg-green-400/10 text-sm ${className}`}
        disabled
      >
        <CheckCircle className="w-3 h-3" />
        <span>Installed</span>
      </motion.button>
    )
  }

  if (!shouldShow) {
    return null // No mostrar el botón si no es instalable y no estamos en desarrollo
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isDevelopment ? () => console.log('PWA install clicked in development') : installPWA}
      className={`flex items-center space-x-2 ${
        isDevelopment 
          ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
          : 'bg-gradient-to-r from-purple-500 to-purple-600'
      } text-white px-3 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all text-sm ${className}`}
    >
      <Download className="w-3 h-3" />
      <span>{isDevelopment ? 'Install PWA (Dev)' : 'Install PWA'}</span>
    </motion.button>
  )
}
