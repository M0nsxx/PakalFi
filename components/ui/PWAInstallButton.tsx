'use client'

import { usePWAInstall } from '@/hooks/usePWAInstall'
import { Download, CheckCircle, Smartphone, Apple } from 'lucide-react'
import { motion } from 'framer-motion'

interface PWAInstallButtonProps {
  className?: string
}

export function PWAInstallButton({ className = '' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, installPWA, isIOS } = usePWAInstall()
  
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
        <span>App Instalada</span>
      </motion.button>
    )
  }

  if (!shouldShow) {
    return null
  }

  const getIcon = () => {
    if (isIOS) return <Apple className="w-3 h-3" />
    return <Download className="w-3 h-3" />
  }

  const getText = () => {
    if (isDevelopment) return 'Instalar PWA (Dev)'
    if (isIOS) return 'Agregar a Inicio'
    return 'Instalar App'
  }

  const getColors = () => {
    if (isDevelopment) return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-orange-500/25'
    if (isIOS) return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-500/25'
    return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-500/25'
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isDevelopment ? () => console.log('PWA install clicked in development') : installPWA}
      className={`flex items-center space-x-2 ${getColors()} text-white px-3 py-2 rounded-full font-medium hover:shadow-lg transition-all text-sm ${className}`}
      title={isIOS ? 'Agregar PakalFi a la pantalla de inicio' : 'Instalar PakalFi como aplicación'}
    >
      {getIcon()}
      <span>{getText()}</span>
    </motion.button>
  )
}
