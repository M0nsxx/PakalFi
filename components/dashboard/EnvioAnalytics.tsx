'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap,
  Globe,
  Users,
  DollarSign,
  Shield
} from 'lucide-react'

interface EnvioData {
  totalTransactions: number
  userActivity: any[]
  riskMetrics: {
    score: number
    factors: string[]
  }
  partnerData: {
    [key: string]: any
  }
  realTimeMetrics: {
    tps: number
    activeUsers: number
    totalVolume: number
  }
}

interface EnvioAnalyticsProps {
  address: string
}

export function EnvioAnalytics({ address }: EnvioAnalyticsProps) {
  const [envioData, setEnvioData] = useState<EnvioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEnvioData()
  }, [address])

  const fetchEnvioData = async () => {
    try {
      setLoading(true)
      
      // Simular datos de Envio - en producción esto sería una llamada real a la API
      const mockData: EnvioData = {
        totalTransactions: 15,
        userActivity: [
          { type: 'policy_creation', count: 3, timestamp: Date.now() - 86400000 },
          { type: 'claim_filing', count: 1, timestamp: Date.now() - 172800000 },
          { type: 'payment_processing', count: 5, timestamp: Date.now() - 259200000 }
        ],
        riskMetrics: {
          score: 78,
          factors: ['Low claim frequency', 'Regular payments', 'Good coverage', 'Positive community feedback']
        },
        partnerData: {
          para: { connected: true, policies: 2 },
          sdg: { connected: true, impact: 'High' },
          ox: { connected: true, volume: 15000 }
        },
        realTimeMetrics: {
          tps: 8190,
          activeUsers: 1250,
          totalVolume: 45000
        }
      }

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setEnvioData(mockData)
    } catch (error) {
      console.error('Error fetching Envio data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!envioData) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Envio Analytics</h2>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm">TPS</span>
          </div>
          <p className="text-2xl font-bold text-white">{envioData.realTimeMetrics.tps.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Active Users</span>
          </div>
          <p className="text-2xl font-bold text-white">{envioData.realTimeMetrics.activeUsers.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">Volume</span>
          </div>
          <p className="text-2xl font-bold text-white">${envioData.realTimeMetrics.totalVolume.toLocaleString()}</p>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Risk Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{envioData.riskMetrics.score}</p>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300 text-sm">Partners</span>
          </div>
          <p className="text-2xl font-bold text-white">{Object.keys(envioData.partnerData).length}</p>
        </div>
      </div>

      {/* Risk Assessment and Partner Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Risk Assessment</h3>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300">Risk Score</span>
              <span className="text-2xl font-bold text-white">{envioData.riskMetrics.score}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full"
                style={{ width: `${envioData.riskMetrics.score}%` }}
              ></div>
            </div>
            <div className="space-y-1">
              {envioData.riskMetrics.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300 text-sm">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Integrations */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Partner Integrations</h3>
          <div className="space-y-2">
            {Object.entries(envioData.partnerData).map(([partner, data]) => (
              <div key={partner} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium capitalize">{partner}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${data.connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-gray-300 text-sm">
                    {data.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Envio Attribution */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span>Powered by</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="font-medium">Envio</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
