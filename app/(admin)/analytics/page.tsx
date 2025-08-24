'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Shield,
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  Target,
  Zap,
  BarChart3,
  Star,
  CloudRain,
  Car,
  Heart,
  Smartphone
} from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activePolicies: number
  totalPremiums: number
  totalClaims: number
  claimsToday: number
  fraudAttempts: number
  weatherAlerts: number
  avgClaimTime: number
  satisfactionRate: number
  revenueGrowth: number
  claimsByType: Array<{ type: string; count: number; amount: number }>
  claimsByLocation: Array<{ location: string; count: number; amount: number }>
  claimsTimeline: Array<{ date: string; claims: number; amount: number }>
  fraudTrends: Array<{ date: string; attempts: number; blocked: number }>
  weatherEvents: Array<{ date: string; events: number; severity: string }>
  userGrowth: Array<{ date: string; users: number; policies: number }>
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
    const interval = setInterval(fetchAnalyticsData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      // Use mock data for demo
      setData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = (): AnalyticsData => ({
    totalUsers: 15420,
    activePolicies: 12850,
    totalPremiums: 2850000,
    totalClaims: 1250,
    claimsToday: 23,
    fraudAttempts: 45,
    weatherAlerts: 12,
    avgClaimTime: 1.2,
    satisfactionRate: 94.5,
    revenueGrowth: 12.8,
    claimsByType: [
      { type: 'Health', count: 450, amount: 11250000 },
      { type: 'Clima', count: 320, amount: 32000000 },
      { type: 'Seguridad', count: 280, amount: 14000000 },
      { type: 'Movilidad', count: 200, amount: 15000000 }
    ],
    claimsByLocation: [
      { location: 'CDMX', count: 380, amount: 9500000 },
      { location: 'Guadalajara', count: 250, amount: 6250000 },
      { location: 'Monterrey', count: 220, amount: 5500000 },
      { location: 'Puebla', count: 180, amount: 4500000 },
      { location: 'Otros', count: 220, amount: 5500000 }
    ],
    claimsTimeline: [
      { date: '2024-01-01', claims: 15, amount: 375000 },
      { date: '2024-01-02', claims: 18, amount: 450000 },
      { date: '2024-01-03', claims: 12, amount: 300000 },
      { date: '2024-01-04', claims: 25, amount: 625000 },
      { date: '2024-01-05', claims: 20, amount: 500000 },
      { date: '2024-01-06', claims: 16, amount: 400000 },
      { date: '2024-01-07', claims: 23, amount: 575000 }
    ],
    fraudTrends: [
      { date: '2024-01-01', attempts: 8, blocked: 7 },
      { date: '2024-01-02', attempts: 12, blocked: 11 },
      { date: '2024-01-03', attempts: 6, blocked: 5 },
      { date: '2024-01-04', attempts: 15, blocked: 14 },
      { date: '2024-01-05', attempts: 10, blocked: 9 },
      { date: '2024-01-06', attempts: 7, blocked: 6 },
      { date: '2024-01-07', attempts: 13, blocked: 12 }
    ],
    weatherEvents: [
      { date: '2024-01-01', events: 2, severity: 'medium' },
      { date: '2024-01-02', events: 1, severity: 'low' },
      { date: '2024-01-03', events: 4, severity: 'high' },
      { date: '2024-01-04', events: 3, severity: 'medium' },
      { date: '2024-01-05', events: 2, severity: 'low' },
      { date: '2024-01-06', events: 1, severity: 'low' },
      { date: '2024-01-07', events: 5, severity: 'extreme' }
    ],
    userGrowth: [
      { date: '2024-01-01', users: 15000, policies: 12500 },
      { date: '2024-01-02', users: 15100, policies: 12600 },
      { date: '2024-01-03', users: 15200, policies: 12700 },
      { date: '2024-01-04', users: 15300, policies: 12800 },
      { date: '2024-01-05', users: 15400, policies: 12900 },
      { date: '2024-01-06', users: 15410, policies: 12950 },
      { date: '2024-01-07', users: 15420, policies: 13000 }
    ]
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4 text-xl">Cargando analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Admin Analytics
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
          Comprehensive analytics and insights for platform management. 
          Monitor performance, user behavior, and business metrics.
        </p>
        
        {/* Time Range Selector */}
        <div className="flex gap-2 mt-4">
          {['1d', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {range === '1d' ? '24h' : range === '7d' ? '7 días' : range === '30d' ? '30 días' : '90 días'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Total Users</h3>
          <p className="text-gray-300 text-sm">50,247 active users</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center"
        >
          <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Revenue</h3>
          <p className="text-gray-300 text-sm">$2.1M this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center"
        >
          <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
          <p className="text-gray-300 text-sm">+4.9% this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-6 text-center"
        >
          <Star className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Rating</h3>
          <p className="text-gray-300 text-sm">4.9/5 average</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          Platform Metrics
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Key performance indicators and business metrics
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur border border-gray-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">User Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">New Users</span>
              <span className="text-white font-semibold">2,341</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Users</span>
              <span className="text-green-400 font-semibold">45,892</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Retention Rate</span>
              <span className="text-blue-400 font-semibold">87.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Churn Rate</span>
              <span className="text-red-400 font-semibold">2.1%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Financial Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Monthly Revenue</span>
              <span className="text-white font-semibold">$2.1M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Claims Paid</span>
              <span className="text-red-400 font-semibold">$5.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Profit Margin</span>
              <span className="text-green-400 font-semibold">23.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Average Premium</span>
              <span className="text-blue-400 font-semibold">$8.50</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Response Time</span>
              <span className="text-white font-semibold">2.1h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Claim Approval Rate</span>
              <span className="text-green-400 font-semibold">97.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Customer Satisfaction</span>
              <span className="text-yellow-400 font-semibold">4.9/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">System Uptime</span>
              <span className="text-blue-400 font-semibold">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          Product Performance
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          How each insurance product is performing
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center">
          <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Micro-Health</h3>
          <div className="text-3xl font-bold text-white mb-2">25,341</div>
          <div className="text-gray-300 text-sm">Active policies</div>
          <div className="text-green-400 text-sm font-semibold mt-2">+12.4%</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
          <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Micro-Climate</h3>
          <div className="text-3xl font-bold text-white mb-2">12,847</div>
          <div className="text-gray-300 text-sm">Active policies</div>
          <div className="text-green-400 text-sm font-semibold mt-2">+8.7%</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center">
          <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Micro-Security</h3>
          <div className="text-3xl font-bold text-white mb-2">8,923</div>
          <div className="text-gray-300 text-sm">Active policies</div>
          <div className="text-green-400 text-sm font-semibold mt-2">+15.2%</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-6 text-center">
          <Car className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Micro-Mobility</h3>
          <div className="text-3xl font-bold text-white mb-2">3,136</div>
          <div className="text-gray-300 text-sm">Active policies</div>
          <div className="text-green-400 text-sm font-semibold mt-2">+6.9%</div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          Geographic Distribution
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          User distribution across Mexico
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur border border-green-500/20 rounded-2xl p-6">
          <MapPin className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Top States</h3>
          <p className="text-gray-300 text-sm">
            Mexico City, Jalisco, Nuevo León, Veracruz, and Puebla lead in user adoption.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur border border-blue-500/20 rounded-2xl p-6">
          <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Growth Areas</h3>
          <p className="text-gray-300 text-sm">
            Strongest growth in rural areas and underserved communities.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur border border-purple-500/20 rounded-2xl p-6">
          <Users className="w-12 h-12 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Market Penetration</h3>
          <p className="text-gray-300 text-sm">
            Currently serving 0.4% of Mexico's population with room for significant growth.
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur border border-orange-500/20 rounded-2xl p-6">
          <Smartphone className="w-12 h-12 text-orange-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Digital Adoption</h3>
          <p className="text-gray-300 text-sm">
            95% of users access our services through mobile devices.
          </p>
        </div>
      </div>

      {/* Export Analytics */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          Export Analytics
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Download comprehensive reports and data for further analysis
        </p>
      </div>

      {/* Real-time Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Alertas en Tiempo Real
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-white font-medium">Fraude Detectado</span>
            </div>
            <p className="text-red-300 text-sm mt-1">{data.fraudAttempts} intentos hoy</p>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Alertas Climáticas</span>
            </div>
            <p className="text-blue-300 text-sm mt-1">{data.weatherAlerts} eventos activos</p>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Tiempo Promedio</span>
            </div>
            <p className="text-green-300 text-sm mt-1">{data.avgClaimTime} segundos</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
