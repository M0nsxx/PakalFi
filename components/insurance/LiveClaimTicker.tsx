'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle, TrendingUp } from 'lucide-react'

interface Claim {
  id: string
  type: string
  amount: number
  location: string
  timestamp: Date
  status: 'processing' | 'completed'
}

export function LiveClaimTicker() {
  const [isMounted, setIsMounted] = useState(false)
  const [claims, setClaims] = useState<Claim[]>([])
  const [totalProcessed, setTotalProcessed] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  
  useEffect(() => {
    setIsMounted(true)
    
    // Simulate real-time claims
    const interval = setInterval(() => {
      const claimTypes = [
        { name: 'Health', icon: '🏥', color: 'green' },
        { name: 'Clima', icon: '🌧️', color: 'blue' },
        { name: 'Seguridad', icon: '🛡️', color: 'red' },
        { name: 'Movilidad', icon: '🚗', color: 'amber' }
      ]
      
      const locations = ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Mérida']
      
      const randomType = claimTypes[Math.floor(Math.random() * claimTypes.length)]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      const randomAmount = Math.floor(Math.random() * 15000) + 500
      
      if (randomType && randomLocation) {
        const newClaim: Claim = {
          id: Math.random().toString(),
          type: randomType.name,
          amount: randomAmount,
          location: randomLocation,
          timestamp: new Date(),
          status: 'processing'
        }
        
        setClaims(prev => {
          const updated = [newClaim, ...prev.slice(0, 4)]
          return updated
        })
        
        setTotalProcessed(prev => prev + 1)
        setTotalAmount(prev => prev + randomAmount)
        
        // Mark claim as completed after 2 seconds
        setTimeout(() => {
          setClaims(prev => 
            prev.map(claim => 
              claim.id === newClaim.id 
                ? { ...claim, status: 'completed' }
                : claim
            )
          )
        }, 2000)
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Health': return 'text-green-400'
      case 'Clima': return 'text-blue-400'
      case 'Seguridad': return 'text-red-400'
      case 'Movilidad': return 'text-amber-400'
      default: return 'text-white'
    }
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Health': return '🏥'
      case 'Clima': return '🌧️'
      case 'Seguridad': return '🛡️'
      case 'Movilidad': return '🚗'
      default: return '📋'
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
                {isMounted ? `${totalProcessed.toLocaleString()} claims` : '0 claims'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span suppressHydrationWarning>
                {isMounted ? `$${(totalAmount / 1000000).toFixed(1)}M paid` : '$0.0M paid'}
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
                      {isMounted ? claim.timestamp.toLocaleTimeString() : '00:00:00'}
                    </span>
                    
                    <motion.div
                      animate={claim.status === 'processing' ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4"
                    >
                      {claim.status === 'processing' ? (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </motion.div>
                    
                    <span className="text-lg">{getTypeIcon(claim.type)}</span>
                    
                    <span className={`font-medium ${getTypeColor(claim.type)}`}>
                      {claim.type}
                    </span>
                    
                    <span className="text-green-400 font-bold" suppressHydrationWarning>
                      {isMounted ? `$${claim.amount.toLocaleString()}` : '$0'}
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
