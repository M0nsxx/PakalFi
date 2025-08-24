'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Globe, Shield, Heart, Zap, Star } from 'lucide-react'
import { getContracts } from '@/config/contracts'

interface CommunityMetric {
  id: string
  name: string
  value: number
  change: number
  icon: React.ReactNode
  color: string
}

export function CommunityStats() {
  const [metrics, setMetrics] = useState<CommunityMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [contracts, setContracts] = useState<any>(null)

  useEffect(() => {
    // Get deployed contracts
    const deployedContracts = getContracts(10143) // Monad testnet
    setContracts(deployedContracts)
    
    // Fetch community stats
    fetchCommunityStats()
  }, [])

  const fetchCommunityStats = async () => {
    try {
      setLoading(true)
      
      // Fetch community stats from contracts
      if (contracts) {
        const response = await fetch('/api/community/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            insurancePool: contracts.insurancePool,
            policyNFT: contracts.policyNFT,
            reinsuranceToken: contracts.reinsuranceToken,
            gaslessPaymentHandler: contracts.gaslessPaymentHandler,
            savingsGoalHandler: contracts.savingsGoalHandler
          })
        })

        if (response.ok) {
          const data = await response.json()
          setMetrics(data.metrics || [])
        }
      }
    } catch (error) {
      console.error('Error fetching community stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingUp className="w-4 h-4 transform rotate-180" />
    return <TrendingUp className="w-4 h-4 opacity-50" />
  }

  const testimonials = [
    {
      name: 'María González',
      location: 'CDMX',
      rating: 5,
              text: 'PakalFi me salvó cuando tuve un accidente. El pago llegó en segundos, sin papeleos.',
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Mendoza',
      location: 'Guadalajara',
      rating: 5,
      text: 'Como agricultor, el seguro de clima es perfecto. Me protege automáticamente cuando hay sequía.',
      avatar: '👨‍🌾'
    },
    {
      name: 'Ana Rodríguez',
      location: 'Monterrey',
      rating: 5,
      text: 'El seguro de salud es súper accesible. Single $30 al mes y me cubre emergencias.',
      avatar: '👩‍⚕️'
    }
  ]
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-white mb-12"
      >
        Nuestra Community
      </motion.h2>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center"
        >
          <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'totalUsers')?.value.toLocaleString()}+`}
          </div>
          <div className="text-gray-300">Usuarios Registrados</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'activePolicies')?.value.toLocaleString()}+`}
          </div>
          <div className="text-gray-300">Policys Activas</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center"
        >
          <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'totalClaims')?.value.toLocaleString()}+`}
          </div>
          <div className="text-gray-300">Processed Claims</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur border border-yellow-500/30 rounded-2xl p-6 text-center"
        >
          <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'satisfactionRate')?.value}%`}
          </div>
          <div className="text-gray-300">Satisfaction</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur border border-red-500/30 rounded-2xl p-6 text-center"
        >
          <Globe className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'citiesCovered')?.value}+`}
          </div>
          <div className="text-gray-300">Ciudades Cubiertas</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur border border-pink-500/30 rounded-2xl p-6 text-center"
        >
          <Zap className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2" suppressHydrationWarning>
            {loading ? 'Cargando...' : `${metrics.find(m => m.id === 'averageRating')?.value.toFixed(1)}`}
          </div>
          <div className="text-gray-300">Average Rating</div>
        </motion.div>
      </div>
      
      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{testimonial.avatar}</div>
              <div>
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.location}</div>
              </div>
            </div>
            
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              "{testimonial.text}"
            </p>
          </motion.div>
        ))}
      </div>
      
      {/* Community Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur border border-white/20 rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Coverage Nacional</h3>
          <p className="text-gray-300">Protegiendo familias en todo México</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Mérida',
            'Cancún', 'Querétaro', 'León', 'San Luis Potosí', 'Aguascalientes', 'Morelia'
          ].map((city, index) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 rounded-lg p-3 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-white font-medium text-sm">{city}</div>
              <div className="text-green-400 text-xs" suppressHydrationWarning>
                {loading ? 'Cargando...' : `${Math.floor(Math.random() * 1000) + 100} familias`}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
