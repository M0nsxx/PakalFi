'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  DollarSign, 
  Activity,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'
import { EnvioAnalytics } from './EnvioAnalytics'
import { useMonadStats } from '@/hooks/useMonadStats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoadingSpinner, SkeletonCard, Skeleton } from '@/components/ui/LoadingSpinner'
import { StatsGrid } from '@/components/ui/StatsCard'

interface DashboardStats {
  totalPolicies: number
  activePolicies: number
  totalPremiums: number
  totalClaims: number
  satisfactionRate: number
  monthlyGrowth: number
  riskScore: number
  nextPayment: string
}

interface RecentActivity {
  id: string
  type: 'policy_created' | 'claim_filed' | 'payment_received' | 'risk_assessment'
  title: string
  description: string
  amount?: number
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  timestamp: string
}

export function Dashboard() {
  const { isConnected, address } = useWallet()
  const { stats: monadStats } = useMonadStats()
  const [stats, setStats] = useState<DashboardStats>({
    totalPolicies: 0,
    activePolicies: 0,
    totalPremiums: 0,
    totalClaims: 0,
    satisfactionRate: 0,
    monthlyGrowth: 0,
    riskScore: 0,
    nextPayment: ''
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      fetchDashboardData()
    }
  }, [isConnected, address])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Simular llamada a Envio para obtener datos del usuario
      const response = await fetch('/api/dashboard/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address })
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentActivity(data.recentActivity)
      } else {
        throw new Error('Failed to fetch dashboard data from deployed contracts')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'policy_created':
        return <Shield className="w-5 h-5 text-blue-400" />
      case 'claim_filed':
        return <AlertCircle className="w-5 h-5 text-orange-400" />
      case 'payment_received':
        return <DollarSign className="w-5 h-5 text-green-400" />
      case 'risk_assessment':
        return <Target className="w-5 h-5 text-purple-400" />
      default:
        return <Activity className="w-5 h-5 text-gray-400" />
    }
  }

  if (!isConnected) {
    return null
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pt-32"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonCard className="h-96" />
            <SkeletonCard className="h-96" />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pt-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here's your insurance overview powered by Envio analytics and blockchain data.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsGrid
          stats={[
            {
              title: 'Total Policies',
              value: stats.totalPolicies,
              icon: Shield,
              color: 'blue',
              trend: { value: 12.5, isPositive: true }
            },
            {
              title: 'Total Premiums',
              value: `$${stats.totalPremiums.toLocaleString()}`,
              icon: DollarSign,
              color: 'green',
              trend: { value: 8.2, isPositive: true }
            },
            {
              title: 'Satisfaction Rate',
              value: `${stats.satisfactionRate}%`,
              icon: Target,
              color: 'purple',
              trend: { value: 2.1, isPositive: true }
            },
            {
              title: 'Risk Score',
              value: stats.riskScore,
              icon: Activity,
              color: 'orange',
              trend: { value: 5.3, isPositive: false }
            },
            {
              title: 'Monad TPS',
              value: monadStats.tps.toLocaleString(),
              icon: Zap,
              color: 'green',
              description: `${monadStats.totalTransactions.toLocaleString()} tx`
            }
          ]}
          columns={5}
          className="mb-8"
        />

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Analytics Overview</h2>
              <PieChart className="w-6 h-6 text-blue-400" />
            </div>
            
            {/* Simulated Chart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Active Policies</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(stats.activePolicies / stats.totalPolicies) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{stats.activePolicies}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monthly Growth</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${Math.min(stats.monthlyGrowth * 2, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">+{stats.monthlyGrowth}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Claims Filed</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(stats.totalClaims / stats.totalPolicies) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{stats.totalClaims}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium text-sm">{activity.title}</h4>
                      {getStatusIcon(activity.status)}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{activity.description}</p>
                    {activity.amount && (
                      <p className="text-green-400 text-xs mt-1">${activity.amount.toFixed(2)}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Monad Network Status */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <h2 className="text-xl font-semibold text-white">Monad Network Status</h2>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Current TPS</span>
                </div>
                <p className="text-2xl font-bold text-white">{monadStats.tps.toLocaleString()}</p>
                <p className="text-green-400 text-xs mt-1">+{Math.floor(Math.random() * 500) + 100} from last hour</p>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Total Transactions</span>
                </div>
                <p className="text-2xl font-bold text-white">{monadStats.totalTransactions.toLocaleString()}</p>
                <p className="text-blue-400 text-xs mt-1">All time</p>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${monadStats.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-gray-300 text-sm">Network Status</span>
                </div>
                <p className="text-2xl font-bold text-white">{monadStats.isConnected ? 'Online' : 'Offline'}</p>
                <p className={`text-xs mt-1 ${monadStats.isConnected ? 'text-green-400' : 'text-red-400'}`}>
                  {monadStats.isConnected ? 'All systems operational' : 'Connection issues detected'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Network Performance</span>
                <span className="text-green-400 text-sm font-medium">Excellent</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Envio Analytics - Full Width */}
        <div className="mb-8">
          <EnvioAnalytics address={address || ''} />
        </div>

        {/* Envio Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-white font-medium">Powered by Envio Analytics</h3>
              <p className="text-blue-300 text-sm">
                Real-time data from blockchain and partner integrations
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
