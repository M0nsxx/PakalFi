'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, MapPin } from 'lucide-react'
import { getContracts } from '@/config/contracts'

interface ClaimEvent {
  id: string
  type: string
  amount: number
  location: string
  timestamp: string
  status: 'pending' | 'approved' | 'paid'
}

export function LiveClaimTicker() {
  const [claims, setClaims] = useState<ClaimEvent[]>([])
  const [stats, setStats] = useState({
    totalClaims: 0,
    totalAmount: 0,
    averageAmount: 0,
    activeUsers: 0
  })
  const [contracts, setContracts] = useState<any>(null)

  useEffect(() => {
    // Get deployed contracts
    const deployedContracts = getContracts(10143) // Monad testnet
    setContracts(deployedContracts)
    
    // Start live updates
    fetchLiveClaims()
    const interval = setInterval(fetchLiveClaims, 10000) // Update every 10 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchLiveClaims = async () => {
    try {
      // Fetch live claims from insurance pool contract
      if (contracts?.insurancePool) {
        const response = await fetch('/api/claims/live', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            insurancePool: contracts.insurancePool,
            policyNFT: contracts.policyNFT,
            oracle: contracts.oracle
          })
        })

        if (response.ok) {
          const data = await response.json()
          setClaims(data.claims || [])
          setStats(data.stats || {})
        }
      }
    } catch (error) {
      console.error('Error fetching live claims:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400'
      case 'approved': return 'text-yellow-400'
      case 'pending': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <TrendingUp className="w-4 h-4" />
      case 'approved': return <Clock className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }
  
  return (
    <div className="bg-black/50 backdrop-blur py-4 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6">
          {/* Live Indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm">EN VIVO</span>
          </motion.div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span suppressHydrationWarning>
                {stats.totalClaims} claims
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span suppressHydrationWarning>
                ${stats.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Claims Ticker */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence>
              <div className="flex gap-8">
                {claims.map((claim) => (
                  <motion.div
                    key={claim.id}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 text-white whitespace-nowrap"
                  >
                    <span className="text-gray-400 text-sm" suppressHydrationWarning>
                      {new Date(claim.timestamp).toLocaleTimeString()}
                    </span>
                    
                    <motion.div
                      animate={claim.status === 'pending' ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4"
                    >
                      {claim.status === 'pending' ? (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Clock className="w-4 h-4 text-green-400" />
                      )}
                    </motion.div>
                    
                    <span className="text-lg">{claim.type}</span>
                    
                    <span className={`font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                    
                    <span className="text-green-400 font-bold" suppressHydrationWarning>
                      ${claim.amount.toLocaleString()}
                    </span>
                    
                    <span className="text-gray-400">
                      en {claim.location}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
