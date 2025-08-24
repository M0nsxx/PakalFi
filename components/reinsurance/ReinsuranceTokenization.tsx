'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  Target,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
  RefreshCw,
  PieChart,
  Activity,
  Calendar,
  Star,
  Users,
  Globe,
  Lock,
  Unlock,
  Award,
  TrendingDown
} from 'lucide-react'
import { getContracts } from '@/config/contracts'

interface ReinsurancePool {
  id: string
  name: string
  type: 'catastrophe' | 'excess_loss' | 'quota_share' | 'facultative'
  totalCapacity: number
  usedCapacity: number
  minInvestment: number
  maxInvestment: number
  apy: number
  risk: 'low' | 'medium' | 'high'
  coverage: string
  description: string
  features: string[]
  status: 'open' | 'closed' | 'full'
  participants: number
  totalInvested: number
  claimsPaid: number
  inceptionDate: Date
  maturityDate: Date
}

interface TokenizedPosition {
  id: string
  poolId: string
  tokens: number
  investment: number
  startDate: Date
  earned: number
  status: 'active' | 'matured' | 'liquidated'
  riskScore: number
  yieldRate: number
}

export function ReinsuranceTokenization() {
  const [activeTab, setActiveTab] = useState('pools')
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const [pools, setPools] = useState<ReinsurancePool[]>([])
  const [stats, setStats] = useState({
    totalValue: 0,
    totalParticipants: 0,
    averageYield: 0,
    activePools: 0
  })
  const [contracts, setContracts] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get deployed contracts
    const deployedContracts = getContracts(10143) // Monad testnet
    setContracts(deployedContracts)
    
    // Fetch reinsurance data
    fetchReinsuranceData()
  }, [])

  const fetchReinsuranceData = async () => {
    try {
      setLoading(true)
      
      // Fetch reinsurance pools from contract
      if (contracts?.reinsuranceToken) {
        const response = await fetch('/api/reinsurance/pools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reinsuranceToken: contracts.reinsuranceToken,
            insurancePool: contracts.insurancePool
          })
        })

        if (response.ok) {
          const data = await response.json()
          setPools(data.pools || [])
          setStats(data.stats || {})
        }
      }
    } catch (error) {
      console.error('Error fetching reinsurance data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      catastrophe: 'bg-red-500/20 text-red-400 border-red-500/30',
      excess_loss: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      quota_share: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      facultative: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'LATAM': return 'text-green-400'
      case 'AFRICA': return 'text-yellow-400'
      case 'SOUTHEAST_ASIA': return 'text-blue-400'
      case 'GLOBAL': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health': return <Shield className="w-5 h-5" />
      case 'climate': return <Zap className="w-5 h-5" />
      case 'security': return <Shield className="w-5 h-5" />
      case 'mobility': return <TrendingUp className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
  }

  const getRiskColor = (risk: string) => {
    const colors = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[risk as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const totalInvested = positions.reduce((sum, pos) => sum + pos.investment, 0)
  const totalEarned = positions.reduce((sum, pos) => sum + pos.earned, 0)
  const avgApy = pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length
  const totalCapacity = pools.reduce((sum, pool) => sum + pool.totalCapacity, 0)
  const usedCapacity = pools.reduce((sum, pool) => sum + pool.usedCapacity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Tokenización de Reaseguro</h1>
        <p className="text-gray-300">Participa en pools de reaseguro tokenizados y gana rendimientos superiores</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Invertido</p>
              <p className="text-3xl font-bold text-white">${totalInvested.toLocaleString()}</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +${totalEarned.toFixed(0)} ganado
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">APY Promedio</p>
              <p className="text-3xl font-bold text-white">{avgApy.toFixed(1)}%</p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Target className="w-4 h-4" />
                Meta: 15%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Capacidad Total</p>
              <p className="text-3xl font-bold text-white">${(totalCapacity / 1000000).toFixed(1)}M</p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {((usedCapacity / totalCapacity) * 100).toFixed(1)}% usado
              </p>
            </div>
            <Globe className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Posiciones Activas</p>
              <p className="text-3xl font-bold text-white">{positions.length}</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Diversificado
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'pools', label: 'Pools Disponibles', icon: Shield },
            { id: 'positions', label: 'Mis Posiciones', icon: BarChart3 },
            { id: 'analytics', label: 'Analytics', icon: PieChart }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'pools' && (
            <motion.div
              key="pools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {pools.map((pool) => (
                <motion.div
                  key={pool.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(pool.type)}</span>
                        <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getTypeColor(pool.type)}`}>
                          {pool.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{pool.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {pool.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">{pool.apy}%</div>
                      <div className="text-gray-400 text-sm">APY</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Capacidad utilizada</span>
                      <span className="text-white">{((pool.usedCapacity / pool.totalCapacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(pool.usedCapacity / pool.totalCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">${pool.minInvestment.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Mínimo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{pool.participants}</div>
                      <div className="text-gray-400 text-sm">Participantes</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getRiskColor(pool.risk)}`}>
                      Riesgo {pool.risk}
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${
                      pool.status === 'open' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {pool.status === 'open' ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPool(pool.id)
                        setShowDetailsModal(true)
                      }}
                      className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPool(pool.id)
                        setShowInvestModal(true)
                      }}
                      disabled={pool.status !== 'open'}
                      className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Participar
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'positions' && (
            <motion.div
              key="positions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {positions.map((position) => {
                const pool = pools.find(p => p.id === position.poolId)
                if (!pool) return null

                const daysInvested = Math.floor((Date.now() - position.startDate.getTime()) / (1000 * 60 * 60 * 24))
                const projectedEarnings = (position.investment * position.yieldRate / 100) * (daysInvested / 365)

                return (
                  <motion.div
                    key={position.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(pool.type)}</span>
                          <h3 className="text-xl font-bold text-white">{pool.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getTypeColor(pool.type)}`}>
                            {pool.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-300">Posición tokenizada activa</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">${position.investment.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Invertido</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{position.tokens.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Tokens</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">${position.earned.toFixed(0)}</div>
                        <div className="text-gray-400 text-sm">Ganado</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{position.yieldRate}%</div>
                        <div className="text-gray-400 text-sm">APY</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">${projectedEarnings.toFixed(0)}</div>
                        <div className="text-gray-400 text-sm">Proyectado</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {position.startDate.toLocaleDateString('es-MX')} - {pool.maturityDate.toLocaleDateString('es-MX')}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Reinvertir
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                          Retirar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Pool Performance */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Rendimiento por Pool
                </h3>
                <div className="space-y-4">
                  {pools.map((pool) => {
                    const poolPosition = positions.find(pos => pos.poolId === pool.id)
                    const amount = poolPosition?.investment || 0
                    const percentage = totalInvested > 0 ? (amount / totalInvested) * 100 : 0
                    
                    return (
                      <div key={pool.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium">{pool.name}</span>
                            <span className="text-gray-400 text-sm">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">${amount.toLocaleString()}</div>
                          <div className="text-green-400 text-sm">{pool.apy}% APY</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Risk Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Riesgo Promedio:</span>
                    <span className="text-yellow-400 font-bold">Medium-High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Diversificación:</span>
                    <span className="text-green-400 font-bold">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Liquidez:</span>
                    <span className="text-blue-400 font-bold">Alta</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Claims Ratio:</span>
                    <span className="text-green-400 font-bold">12.5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Invest Modal */}
      <AnimatePresence>
        {showInvestModal && selectedPool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Participar en Pool</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">
                    {pools.find(p => p.id === selectedPool)?.name}
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">APY:</span>
                    <span className="text-green-400 font-bold">
                      {pools.find(p => p.id === selectedPool)?.apy}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Riesgo:</span>
                    <span className="text-yellow-400 font-bold">
                      {pools.find(p => p.id === selectedPool)?.risk}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Cantidad a invertir (MXN)</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowInvestModal(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Confirmar Participación
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedPool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const pool = pools.find(p => p.id === selectedPool)
                if (!pool) return null

                return (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">Detalles del Pool</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Información General</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tipo:</span>
                              <span className="text-white">{pool.type.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">APY:</span>
                              <span className="text-green-400">{pool.apy}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Riesgo:</span>
                              <span className="text-yellow-400">{pool.risk}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Participantes:</span>
                              <span className="text-white">{pool.participants}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Capacidad</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Total:</span>
                              <span className="text-white">${pool.totalCapacity.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Usado:</span>
                              <span className="text-white">${pool.usedCapacity.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Disponible:</span>
                              <span className="text-green-400">${(pool.totalCapacity - pool.usedCapacity).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Claims Pagados:</span>
                              <span className="text-red-400">${pool.claimsPaid.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-2">Coverage</h4>
                        <p className="text-gray-300 text-sm">{pool.coverage}</p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">Características</h4>
                        <div className="flex flex-wrap gap-2">
                          {pool.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowDetailsModal(false)}
                          className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                          Cerrar
                        </button>
                        <button
                          onClick={() => {
                            setShowDetailsModal(false)
                            setShowInvestModal(true)
                          }}
                          className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Participar Ahora
                        </button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
