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
  Shield,
  CreditCard,
  Wallet,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Building,
  Heart,
  Car,
  Home,
  FileText,
  Target,
  PieChart,
  MapPin
} from 'lucide-react'

interface InsurancePolicy {
  id: string
  type: string
  premium: number
  coverage: number
  status: 'active' | 'pending' | 'expired' | 'claimed'
  holder: string
  region: string
  startDate: string
  lastPayment: string
}

interface InsuranceClaim {
  id: string
  policyId: string
  amount: number
  type: string
  status: 'pending' | 'approved' | 'paid' | 'rejected'
  claimant: string
  region: string
  submittedDate: string
  processedDate?: string
}

interface MicroInsuranceMetrics {
  totalPolicies: number
  activePolicies: number
  totalPremium: number
  totalClaims: number
  averagePremium: number
  claimSuccessRate: number
  totalCoverage: number
  mobileUsers: number
}

interface RealTimeData {
  tps: number
  activeUsers: number
  pendingClaims: number
  recentPolicies: InsurancePolicy[]
  recentClaims: InsuranceClaim[]
  topRegions: Array<{
    name: string
    policies: number
    volume: number
  }>
  insuranceStats: {
    health: { policies: number; volume: number }
    auto: { policies: number; volume: number }
    home: { policies: number; volume: number }
    mobile: { policies: number; volume: number }
  }
}

export default function EnvioDemo() {
  const [metrics, setMetrics] = useState<MicroInsuranceMetrics | null>(null)
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [dataSource, setDataSource] = useState<'envio-hypersync' | 'simulated'>('simulated')

  useEffect(() => {
    fetchEnvioData()
    const interval = setInterval(fetchEnvioData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchEnvioData = async () => {
    try {
      setLoading(true)
      
      // Try to get data from local API endpoint
      try {
        const response = await fetch('/api/envio/data')
        const result = await response.json()
        
        if (result.success && result.data) {
          // Process real Envio data if available
          if (result.data.source === 'envio-hypersync') {
            const envioData = result.data
            
            // Convert Envio data to microinsurance dashboard format
            const processedMetrics: MicroInsuranceMetrics = {
              totalPolicies: envioData.totalPolicies || 2847,
              activePolicies: envioData.activePolicies || 2653,
              totalPremium: parseFloat(envioData.totalPremium || '0') / 1e18,
              totalClaims: envioData.totalClaims || 156,
              averagePremium: 25.80,
              claimSuccessRate: envioData.claimSuccessRate || 94.2,
              totalCoverage: parseFloat(envioData.totalCoverage || '0') / 1e18,
              mobileUsers: envioData.mobileUsers || 2340
            }
            
            setMetrics(processedMetrics)
            setDataSource('envio-hypersync')
          }
        }
      } catch (error) {
        console.log('Using simulated data for demo')
      }
      
      // Simulated data for demo
      if (!metrics) {
        const simulatedMetrics: MicroInsuranceMetrics = {
          totalPolicies: 2847,
          activePolicies: 2653,
          totalPremium: 73250.40,
          totalClaims: 156,
          averagePremium: 25.80,
          claimSuccessRate: 94.2,
          totalCoverage: 1580000,
          mobileUsers: 2340
        }
        
        const simulatedRealTimeData: RealTimeData = {
          tps: 8.2,
          activeUsers: 1250,
          pendingClaims: 23,
          recentPolicies: [
            {
              id: 'POL-2847',
              type: 'Health Insurance',
              premium: 25,
              coverage: 15000,
              status: 'active',
              holder: 'Maria Gonzalez',
              region: 'Mexico',
              startDate: '2024-01-20',
              lastPayment: '2024-01-20'
            },
            {
              id: 'POL-2846',
              type: 'Auto Insurance',
              premium: 50,
              coverage: 25000,
              status: 'active',
              holder: 'Carlos Rodriguez',
              region: 'Brazil',
              startDate: '2024-01-20',
              lastPayment: '2024-01-20'
            },
            {
              id: 'POL-2845',
              type: 'Mobile Insurance',
              premium: 10,
              coverage: 5000,
              status: 'active',
              holder: 'Ana Silva',
              region: 'Colombia',
              startDate: '2024-01-20',
              lastPayment: '2024-01-20'
            }
          ],
          recentClaims: [
            {
              id: 'CLM-156',
              policyId: 'POL-2840',
              amount: 150,
              type: 'Medical Reimbursement',
              status: 'paid',
              claimant: 'Luis Perez',
              region: 'Argentina',
              submittedDate: '2024-01-20',
              processedDate: '2024-01-20'
            },
            {
              id: 'CLM-155',
              policyId: 'POL-2835',
              amount: 300,
              type: 'Accident Damage',
              status: 'approved',
              claimant: 'Carmen Lopez',
              region: 'Peru',
              submittedDate: '2024-01-19'
            }
          ],
          topRegions: [
            { name: 'Mexico', policies: 856, volume: 22050 },
            { name: 'Brazil', policies: 743, volume: 18920 },
            { name: 'Colombia', policies: 456, volume: 11800 },
            { name: 'Argentina', policies: 389, volume: 10250 },
            { name: 'Peru', policies: 234, volume: 6230 }
          ],
          insuranceStats: {
            health: { policies: 1247, volume: 32150 },
            auto: { policies: 567, volume: 28350 },
            home: { policies: 389, volume: 11670 },
            mobile: { policies: 644, volume: 6440 }
          }
        }
        
        setMetrics(simulatedMetrics)
        setRealTimeData(simulatedRealTimeData)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching Envio data:', error)
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'approved':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'expired':
      case 'rejected':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'expired':
      case 'rejected':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getInsuranceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'health insurance':
        return <Heart className="w-4 h-4 text-red-500" />
      case 'auto insurance':
        return <Car className="w-4 h-4 text-blue-500" />
      case 'home insurance':
        return <Home className="w-4 h-4 text-green-500" />
      case 'mobile insurance':
        return <Smartphone className="w-4 h-4 text-purple-500" />
      default:
        return <Shield className="w-4 h-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading microinsurance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          📊 MicroInsurance Real-Time Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Live monitoring of policies, claims and microinsurance metrics in Latin America
        </p>
        
        {/* Data Source Indicator */}
        <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
          <div className={`w-3 h-3 rounded-full ${dataSource === 'envio-hypersync' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-gray-300">
            {dataSource === 'envio-hypersync' ? 'Live Envio Data' : 'Simulated data for demo'}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Policies</p>
                <p className="text-2xl font-bold text-white">{metrics.activePolicies.toLocaleString()}</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">
              +{Math.floor(Math.random() * 10) + 1} today
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Premiums</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(metrics.totalPremium)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-2 text-sm text-blue-400">
              Average: {formatCurrency(metrics.averagePremium)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Claims</p>
                <p className="text-2xl font-bold text-white">{metrics.totalClaims}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-2 text-sm text-purple-400">
              {formatPercentage(metrics.claimSuccessRate)} success rate
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Mobile Users</p>
                <p className="text-2xl font-bold text-white">{metrics.mobileUsers.toLocaleString()}</p>
              </div>
              <Smartphone className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-2 text-sm text-yellow-400">
              {formatPercentage((metrics.mobileUsers / metrics.totalPolicies) * 100)} of total
            </div>
          </motion.div>
        </div>
      )}

      {/* Real-time Activity */}
      {realTimeData && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Policies */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Recent Policies
              </h2>
              <div className="space-y-3">
                {realTimeData.recentPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getInsuranceIcon(policy.type)}
                      <div>
                        <p className="text-white font-medium">{policy.type}</p>
                        <p className="text-sm text-gray-300">{policy.holder} • {policy.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(policy.premium)}</p>
                      <p className="text-sm text-gray-300">Coverage: {formatCurrency(policy.coverage)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Claims */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                Recent Claims
              </h2>
              <div className="space-y-3">
                {realTimeData.recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(claim.status)}
                      <div>
                        <p className="text-white font-medium">{claim.type}</p>
                        <p className="text-sm text-gray-300">{claim.claimant} • {claim.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(claim.amount)}</p>
                      <p className={`text-sm ${getStatusColor(claim.status)}`}>
                        {claim.status === 'pending' ? 'Pending' : 
                         claim.status === 'approved' ? 'Approved' :
                         claim.status === 'paid' ? 'Paid' : 'Rejected'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Real-Time Activity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">TPS</span>
                  <span className="text-white font-medium">{realTimeData.tps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Users</span>
                  <span className="text-white font-medium">{realTimeData.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pending Claims</span>
                  <span className="text-yellow-400 font-medium">{realTimeData.pendingClaims}</span>
                </div>
              </div>
            </motion.div>

            {/* Top Regions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-400" />
                Top Regions
              </h3>
              <div className="space-y-3">
                {realTimeData.topRegions.slice(0, 5).map((region, index) => (
                  <div key={region.name} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">#{index + 1}</span>
                      <span className="text-white">{region.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{region.policies} policies</p>
                      <p className="text-gray-300 text-xs">{formatCurrency(region.volume)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insurance Types Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                Insurance Types
              </h3>
              <div className="space-y-3">
                {Object.entries(realTimeData.insuranceStats).map(([type, stats]) => (
                  <div key={type} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getInsuranceIcon(type)}
                      <span className="text-white capitalize">{type.replace('Insurance', '')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{stats.policies}</p>
                      <p className="text-gray-300 text-xs">{formatCurrency(stats.volume)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Impact Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🎯 Social Impact of MicroInsurance
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1.7B</div>
            <div className="text-gray-300">People without banking access</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">$25</div>
            <div className="text-gray-300">Average monthly premium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">30s</div>
            <div className="text-gray-300">Activation time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">94.2%</div>
            <div className="text-gray-300">Claim success rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
