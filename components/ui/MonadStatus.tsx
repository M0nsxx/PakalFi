'use client'

import { useMonadStats } from '@/hooks/useMonadStats'
import { Zap, Wifi, WifiOff } from 'lucide-react'
import { motion } from 'framer-motion'

export function MonadStatus() {
  const { stats, loading } = useMonadStats()

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-full">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-2 px-2.5 py-1 bg-gray-800/60 backdrop-blur-sm border border-white/20 rounded-full text-xs"
    >
      {/* Connection Status */}
      <div className="flex items-center space-x-1">
        <div className={`w-1.5 h-1.5 rounded-full ${stats.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-white font-medium">Monad</span>
      </div>
      
      {/* Connection State */}
      <span className={`${stats.isConnected ? 'text-green-400' : 'text-red-400'} font-medium`}>
        {stats.isConnected ? 'Connected' : 'Disconnected'}
      </span>
      
      {/* Separator */}
      <div className="w-px h-3 bg-white/20"></div>
      
      {/* Network Stats */}
      <div className="flex items-center space-x-1">
        <Zap className="w-2.5 h-2.5 text-yellow-400" />
        <span className="text-white font-medium">{formatNumber(stats.totalTransactions)}</span>
        <span className="text-gray-400">TXs</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <span className="text-white font-medium">{stats.tps.toLocaleString()}</span>
        <span className="text-gray-400">TPS</span>
      </div>
    </motion.div>
  )
}
