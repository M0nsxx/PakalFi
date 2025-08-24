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
    <div className="flex flex-col space-y-1">
      {/* Monad Status Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2 px-2.5 py-1 bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-full"
      >
        <div className={`w-1.5 h-1.5 rounded-full ${stats.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-white text-xs font-medium">Monad</span>
        <Zap className="w-2.5 h-2.5 text-yellow-400" />
        <span className="text-white text-xs">{formatNumber(stats.totalTransactions)}</span>
      </motion.div>

      {/* Connection Status and TPS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-2 px-2.5 py-1 bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-full"
      >
        <div className={`w-1.5 h-1.5 rounded-full ${stats.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-white text-xs font-medium">
          {stats.isConnected ? 'Connected' : 'Disconnected'}
        </span>
        <span className="text-white text-xs">{stats.tps.toLocaleString()} TPS</span>
      </motion.div>


    </div>
  )
}
