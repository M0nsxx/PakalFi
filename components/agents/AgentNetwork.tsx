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
  TrendingDown,
  UserPlus,
  Settings,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: 'active' | 'inactive' | 'pending'
  level: 'bronze' | 'silver' | 'gold' | 'platinum'
  joinDate: Date
  policiesSold: number
  totalPremium: number
  commissionEarned: number
  commissionRate: number
  performance: number
  rating: number
  specializations: string[]
  avatar: string
}

interface Commission {
  id: string
  agentId: string
  policyId: string
  amount: number
  rate: number
  status: 'pending' | 'paid' | 'cancelled'
  date: Date
  policyType: string
  customerName: string
}

interface Performance {
  agentId: string
  month: string
  policiesSold: number
  totalPremium: number
  commissionEarned: number
  conversionRate: number
  customerSatisfaction: number
}

export function AgentNetwork() {
  const [activeTab, setActiveTab] = useState('agents')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddAgent, setShowAddAgent] = useState(false)
  const [showAgentDetails, setShowAgentDetails] = useState(false)

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'María González',
              email: 'maria.gonzalez@pakalfi.mx',
      phone: '+52 55 1234 5678',
      location: 'CDMX',
      status: 'active',
      level: 'platinum',
      joinDate: new Date('2023-01-15'),
      policiesSold: 156,
      totalPremium: 2850000,
      commissionEarned: 142500,
      commissionRate: 5.0,
      performance: 95,
      rating: 4.8,
      specializations: ['Health', 'Auto', 'Hogar'],
      avatar: '/avatars/maria.jpg'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
              email: 'carlos.rodriguez@pakalfi.mx',
      phone: '+52 33 9876 5432',
      location: 'Guadalajara',
      status: 'active',
      level: 'gold',
      joinDate: new Date('2023-03-20'),
      policiesSold: 89,
      totalPremium: 1650000,
      commissionEarned: 82500,
      commissionRate: 5.0,
      performance: 87,
      rating: 4.6,
      specializations: ['Health', 'Vida'],
      avatar: '/avatars/carlos.jpg'
    },
    {
      id: '3',
      name: 'Ana Martínez',
              email: 'ana.martinez@pakalfi.mx',
      phone: '+52 81 5555 1234',
      location: 'Monterrey',
      status: 'active',
      level: 'silver',
      joinDate: new Date('2023-06-10'),
      policiesSold: 67,
      totalPremium: 980000,
      commissionEarned: 49000,
      commissionRate: 5.0,
      performance: 78,
      rating: 4.4,
      specializations: ['Auto', 'Hogar'],
      avatar: '/avatars/ana.jpg'
    },
    {
      id: '4',
      name: 'Luis Pérez',
              email: 'luis.perez@pakalfi.mx',
      phone: '+52 222 333 4444',
      location: 'Puebla',
      status: 'pending',
      level: 'bronze',
      joinDate: new Date('2024-01-05'),
      policiesSold: 12,
      totalPremium: 180000,
      commissionEarned: 9000,
      commissionRate: 5.0,
      performance: 65,
      rating: 4.2,
      specializations: ['Health'],
      avatar: '/avatars/luis.jpg'
    }
  ])

  const [commissions] = useState<Commission[]>([
    {
      id: '1',
      agentId: '1',
      policyId: 'POL-001',
      amount: 2500,
      rate: 5.0,
      status: 'paid',
      date: new Date('2024-01-15'),
      policyType: 'Health',
      customerName: 'Juan García'
    },
    {
      id: '2',
      agentId: '1',
      policyId: 'POL-002',
      amount: 1800,
      rate: 5.0,
      status: 'pending',
      date: new Date('2024-01-20'),
      policyType: 'Auto',
      customerName: 'María López'
    },
    {
      id: '3',
      agentId: '2',
      policyId: 'POL-003',
      amount: 3200,
      rate: 5.0,
      status: 'paid',
      date: new Date('2024-01-18'),
      policyType: 'Vida',
      customerName: 'Carlos Silva'
    }
  ])

  const [performance] = useState<Performance[]>([
    {
      agentId: '1',
      month: 'Enero 2024',
      policiesSold: 23,
      totalPremium: 450000,
      commissionEarned: 22500,
      conversionRate: 85,
      customerSatisfaction: 96
    },
    {
      agentId: '2',
      month: 'Enero 2024',
      policiesSold: 15,
      totalPremium: 280000,
      commissionEarned: 14000,
      conversionRate: 78,
      customerSatisfaction: 92
    }
  ])

  const getLevelColor = (level: string) => {
    const colors = {
      bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      silver: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      platinum: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      inactive: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400'
    if (performance >= 80) return 'text-yellow-400'
    if (performance >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  const totalAgents = agents.length
  const activeAgents = agents.filter(a => a.status === 'active').length
  const totalPolicies = agents.reduce((sum, agent) => sum + agent.policiesSold, 0)
  const totalCommissions = agents.reduce((sum, agent) => sum + agent.commissionEarned, 0)
  const avgPerformance = agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Red de Agentes</h1>
        <p className="text-gray-300">Gestiona tu red de agentes de seguros y optimiza el rendimiento</p>
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
              <p className="text-gray-400 text-sm">Total Agentes</p>
              <p className="text-3xl font-bold text-white">{totalAgents}</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Users className="w-4 h-4" />
                {activeAgents} activos
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-400" />
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
              <p className="text-gray-400 text-sm">Policys Vendidas</p>
              <p className="text-3xl font-bold text-white">{totalPolicies.toLocaleString()}</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +15% este mes
              </p>
            </div>
            <Shield className="w-12 h-12 text-green-400" />
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
              <p className="text-gray-400 text-sm">Comisiones Pagadas</p>
              <p className="text-3xl font-bold text-white">${(totalCommissions / 1000).toFixed(0)}K</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                +8% vs mes anterior
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-yellow-400" />
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
              <p className="text-gray-400 text-sm">Rendimiento Promedio</p>
              <p className="text-3xl font-bold text-white">{avgPerformance.toFixed(0)}%</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <Target className="w-4 h-4" />
                Meta: 85%
              </p>
            </div>
            <Target className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'agents', label: 'Agentes', icon: Users },
            { id: 'commissions', label: 'Comisiones', icon: DollarSign },
            { id: 'performance', label: 'Rendimiento', icon: BarChart3 },
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
          {activeTab === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search agentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                  <option value="pending">Pendientes</option>
                </select>
                <button
                  onClick={() => setShowAddAgent(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Agregar Agente
                </button>
              </div>

              {/* Agents List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAgents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                          <p className="text-gray-400">{agent.email}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getLevelColor(agent.level)}`}>
                              {agent.level}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getStatusColor(agent.status)}`}>
                              {agent.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">${(agent.commissionEarned / 1000).toFixed(0)}K</div>
                        <div className="text-gray-400 text-sm">Comisiones</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{agent.policiesSold}</div>
                        <div className="text-gray-400 text-sm">Policys</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">${(agent.totalPremium / 1000000).toFixed(1)}M</div>
                        <div className="text-gray-400 text-sm">Premiums</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}%
                        </div>
                        <div className="text-gray-400 text-sm">Rendimiento</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">{agent.rating}</div>
                        <div className="text-gray-400 text-sm">Rating</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {agent.location}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedAgent(agent.id)
                            setShowAgentDetails(true)
                          }}
                          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                          Ver Detalles
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Contactar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'commissions' && (
            <motion.div
              key="commissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Comisiones Recientes</h3>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Exportar
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-white/10">
                        <th className="pb-3">Agente</th>
                        <th className="pb-3">Policy</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Tipo</th>
                        <th className="pb-3">Monto</th>
                        <th className="pb-3">Estado</th>
                        <th className="pb-3">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((commission) => {
                        const agent = agents.find(a => a.id === commission.agentId)
                        return (
                          <tr key={commission.id} className="border-b border-white/5">
                            <td className="py-3 text-white">{agent?.name}</td>
                            <td className="py-3 text-gray-300">{commission.policyId}</td>
                            <td className="py-3 text-gray-300">{commission.customerName}</td>
                            <td className="py-3 text-gray-300">{commission.policyType}</td>
                            <td className="py-3 text-green-400 font-bold">${commission.amount.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs border ${
                                commission.status === 'paid' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : commission.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                              }`}>
                                {commission.status === 'paid' ? 'Pagado' : commission.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300">{commission.date.toLocaleDateString('es-MX')}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {performance.map((perf) => {
                const agent = agents.find(a => a.id === perf.agentId)
                if (!agent) return null

                return (
                  <motion.div
                    key={perf.agentId}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                        <p className="text-gray-400">{perf.month}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{perf.policiesSold}</div>
                        <div className="text-gray-400 text-sm">Policys Vendidas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">${perf.totalPremium.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Premiums Totales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">${perf.commissionEarned.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Comisiones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{perf.conversionRate}%</div>
                        <div className="text-gray-400 text-sm">Tasa Conversión</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Satisfaction del Cliente</span>
                        <span className="text-white">{perf.customerSatisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${perf.customerSatisfaction}%` }}
                        ></div>
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
              {/* Performance by Level */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Rendimiento por Nivel
                </h3>
                <div className="space-y-4">
                  {['platinum', 'gold', 'silver', 'bronze'].map((level) => {
                    const levelAgents = agents.filter(a => a.level === level)
                    const avgPerformance = levelAgents.length > 0 
                      ? levelAgents.reduce((sum, agent) => sum + agent.performance, 0) / levelAgents.length 
                      : 0
                    
                    return (
                      <div key={level} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium capitalize">{level}</span>
                            <span className="text-gray-400 text-sm">{levelAgents.length} agentes</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${avgPerformance}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{avgPerformance.toFixed(0)}%</div>
                          <div className="text-gray-400 text-sm">Promedio</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Mejores Agentes
                </h3>
                <div className="space-y-4">
                  {agents
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 5)
                    .map((agent, index) => (
                      <div key={agent.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{agent.name}</span>
                            <span className="text-gray-400 text-sm">{agent.policiesSold} pólizas</span>
                          </div>
                          <div className="text-gray-400 text-sm">{agent.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">{agent.performance}%</div>
                          <div className="text-gray-400 text-sm">Rendimiento</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Agent Modal */}
      <AnimatePresence>
        {showAddAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddAgent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo Agente</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email electrónico"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500">
                  <option value="">Seleccionar nivel</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddAgent(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Agregar Agente
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent Details Modal */}
      <AnimatePresence>
        {showAgentDetails && selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowAgentDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const agent = agents.find(a => a.id === selectedAgent)
                if (!agent) return null

                return (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">Detalles del Agente</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-white">{agent.name}</h4>
                          <p className="text-gray-400">{agent.email}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getLevelColor(agent.level)}`}>
                              {agent.level}
                            </span>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getStatusColor(agent.status)}`}>
                              {agent.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-white font-semibold mb-2">Información de Contact</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{agent.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{agent.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{agent.location}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-2">Especializaciones</h5>
                          <div className="flex flex-wrap gap-2">
                            {agent.specializations.map((spec, index) => (
                              <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowAgentDetails(false)}
                          className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                          Cerrar
                        </button>
                        <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Editar Agente
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
