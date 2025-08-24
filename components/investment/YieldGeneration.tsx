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
  Star
} from 'lucide-react'

interface YieldStrategy {
  id: string
  name: string
  protocol: string
  type: 'lending' | 'liquidity' | 'staking' | 'yield_farming'
  apy: number
  risk: 'low' | 'medium' | 'high'
  minAmount: number
  maxAmount: number
  invested: number
  available: number
  description: string
  features: string[]
  status: 'active' | 'paused' | 'full'
}

interface Investment {
  id: string
  strategyId: string
  amount: number
  startDate: Date
  endDate: Date
  earned: number
  status: 'active' | 'withdrawn' | 'matured'
}

export function YieldGeneration() {
  const [activeTab, setActiveTab] = useState('strategies')
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const [strategies] = useState<YieldStrategy[]>([
    {
      id: 'aave-lending',
      name: 'Aave Lending Pool',
      protocol: 'Aave',
      type: 'lending',
      apy: 8.5,
      risk: 'low',
      minAmount: 1000,
      maxAmount: 100000,
      invested: 25000,
      available: 75000,
      description: 'Préstamos seguros con garantías colateralizadas en Aave',
      features: ['Garantías colateralizadas', 'Liquidación automática', 'APY estable'],
      status: 'active'
    },
    {
      id: 'uniswap-liquidity',
      name: 'Uniswap V3 Liquidity',
      protocol: 'Uniswap',
      type: 'liquidity',
      apy: 12.3,
      risk: 'medium',
      minAmount: 5000,
      maxAmount: 50000,
      invested: 15000,
      available: 35000,
      description: 'Provisión de liquidez en pools de Uniswap V3',
      features: ['Fees de trading', 'Posiciones concentradas', 'Gestión de riesgo'],
      status: 'active'
    },
    {
      id: 'compound-staking',
      name: 'Compound Staking',
      protocol: 'Compound',
      type: 'staking',
      apy: 6.8,
      risk: 'low',
      minAmount: 500,
      maxAmount: 25000,
      invested: 10000,
      available: 15000,
      description: 'Staking de tokens COMP con recompensas automáticas',
      features: ['Recompensas automáticas', 'Sin lock-up', 'APY compuesto'],
      status: 'active'
    },
    {
      id: 'curve-yield',
      name: 'Curve Yield Farming',
      protocol: 'Curve',
      type: 'yield_farming',
      apy: 15.2,
      risk: 'high',
      minAmount: 2000,
      maxAmount: 30000,
      invested: 8000,
      available: 22000,
      description: 'Yield farming en pools de Curve con tokens de gobernanza',
      features: ['Tokens de gobernanza', 'APY variable', 'Estrategia avanzada'],
      status: 'active'
    }
  ])

  const [investments] = useState<Investment[]>([
    {
      id: '1',
      strategyId: 'aave-lending',
      amount: 5000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      earned: 425,
      status: 'active'
    },
    {
      id: '2',
      strategyId: 'uniswap-liquidity',
      amount: 3000,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      earned: 369,
      status: 'active'
    }
  ])

  const getRiskColor = (risk: string) => {
    const colors = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[risk as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      lending: '💰',
      liquidity: '💧',
      staking: '🔒',
      yield_farming: '🌾'
    }
    return icons[type as keyof typeof icons] || '📊'
  }

  const getProtocolColor = (protocol: string) => {
    const colors = {
      'Aave': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Uniswap': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Compound': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Curve': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[protocol as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalEarned = investments.reduce((sum, inv) => sum + inv.earned, 0)
  const avgApy = strategies.reduce((sum, strat) => sum + strat.apy, 0) / strategies.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Generación de Yield</h1>
        <p className="text-gray-300">Invierte tus primas en protocolos DeFi para maximizar rendimientos</p>
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
                Meta: 10%
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
              <p className="text-gray-400 text-sm">Estrategias Activas</p>
              <p className="text-3xl font-bold text-white">{investments.length}</p>
              <p className="text-purple-400 text-sm flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Diversificado
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-400" />
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
              <p className="text-gray-400 text-sm">Rendimiento</p>
              <p className="text-3xl font-bold text-white">{(totalEarned / totalInvested * 100).toFixed(1)}%</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Este año
              </p>
            </div>
            <Activity className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'strategies', label: 'Estrategias', icon: Target },
            { id: 'investments', label: 'Mis Inversiones', icon: BarChart3 },
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
          {activeTab === 'strategies' && (
            <motion.div
              key="strategies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {strategies.map((strategy) => (
                <motion.div
                  key={strategy.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(strategy.type)}</span>
                        <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getProtocolColor(strategy.protocol)}`}>
                          {strategy.protocol}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{strategy.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {strategy.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">{strategy.apy}%</div>
                      <div className="text-gray-400 text-sm">APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">${strategy.minAmount.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Mínimo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">${strategy.available.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Disponible</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getRiskColor(strategy.risk)}`}>
                      Riesgo {strategy.risk}
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm border ${
                      strategy.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {strategy.status === 'active' ? 'Activo' : 'Pausado'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStrategy(strategy.id)
                      setShowInvestModal(true)
                    }}
                    disabled={strategy.status !== 'active'}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Invertir Ahora
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'investments' && (
            <motion.div
              key="investments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {investments.map((investment) => {
                const strategy = strategies.find(s => s.id === investment.strategyId)
                if (!strategy) return null

                const daysInvested = Math.floor((Date.now() - investment.startDate.getTime()) / (1000 * 60 * 60 * 24))
                const projectedEarnings = (investment.amount * strategy.apy / 100) * (daysInvested / 365)

                return (
                  <motion.div
                    key={investment.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(strategy.type)}</span>
                          <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getProtocolColor(strategy.protocol)}`}>
                            {strategy.protocol}
                          </span>
                        </div>
                        <p className="text-gray-300">Inversión activa con rendimientos automáticos</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">${investment.amount.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Invertido</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{strategy.apy}%</div>
                        <div className="text-gray-400 text-sm">APY</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">${investment.earned.toFixed(0)}</div>
                        <div className="text-gray-400 text-sm">Ganado</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{daysInvested}</div>
                        <div className="text-gray-400 text-sm">Días</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">${projectedEarnings.toFixed(0)}</div>
                        <div className="text-gray-400 text-sm">Proyectado</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {investment.startDate.toLocaleDateString('es-MX')} - {investment.endDate.toLocaleDateString('es-MX')}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Reinvertir
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedStrategy(strategy.id)
                            setShowWithdrawModal(true)
                          }}
                          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
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
              {/* Performance Chart */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Rendimiento por Estrategia
                </h3>
                <div className="space-y-4">
                  {strategies.map((strategy) => {
                    const strategyInvestment = investments.find(inv => inv.strategyId === strategy.id)
                    const amount = strategyInvestment?.amount || 0
                    const percentage = totalInvested > 0 ? (amount / totalInvested) * 100 : 0
                    
                    return (
                      <div key={strategy.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium">{strategy.name}</span>
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
                          <div className="text-green-400 text-sm">{strategy.apy}% APY</div>
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
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Diversificación:</span>
                    <span className="text-green-400 font-bold">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Liquidez:</span>
                    <span className="text-blue-400 font-bold">Alta</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Estabilidad:</span>
                    <span className="text-green-400 font-bold">Excellent</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Invest Modal */}
      <AnimatePresence>
        {showInvestModal && selectedStrategy && (
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
              <h3 className="text-xl font-bold text-white mb-4">Invertir en Estrategia</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">
                    {strategies.find(s => s.id === selectedStrategy)?.name}
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">APY:</span>
                    <span className="text-green-400 font-bold">
                      {strategies.find(s => s.id === selectedStrategy)?.apy}%
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
                    Confirmar Inversión
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && selectedStrategy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Retirar Inversión</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">
                    {strategies.find(s => s.id === selectedStrategy)?.name}
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ganado:</span>
                    <span className="text-green-400 font-bold">
                      ${investments.find(inv => inv.strategyId === selectedStrategy)?.earned.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Retirar Todo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
