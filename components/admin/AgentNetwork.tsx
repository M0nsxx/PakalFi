'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Star,
  Award,
  Target,
  Activity,
  UserPlus,
  Settings,
  BarChart3,
  Filter,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: 'active' | 'pending' | 'suspended' | 'inactive'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  joinDate: Date
  lastActive: Date
  totalPolicies: number
  totalPremiums: number
  totalClaims: number
  commissionRate: number
  totalEarnings: number
  performance: number
  rating: number
  specialties: string[]
  territories: string[]
  avatar: string
}

interface AgentMetrics {
  totalAgents: number
  activeAgents: number
  totalPolicies: number
  totalPremiums: number
  averageCommission: number
  topPerformers: Agent[]
  recentActivity: Array<{
    id: string
    type: 'policy_created' | 'claim_processed' | 'commission_earned' | 'agent_joined'
    agentId: string
    agentName: string
    amount?: number
    timestamp: Date
  }>
}

export function AgentNetwork() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')
  const [showAddAgent, setShowAddAgent] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@microseguro.mx',
      phone: '+52 55 1234 5678',
      location: 'CDMX',
      status: 'active',
      tier: 'platinum',
      joinDate: new Date('2023-01-15'),
      lastActive: new Date(),
      totalPolicies: 245,
      totalPremiums: 1250000,
      totalClaims: 12,
      commissionRate: 15,
      totalEarnings: 187500,
      performance: 95,
      rating: 4.8,
      specialties: ['Health', 'Seguridad'],
      territories: ['CDMX', 'Estado de México'],
      avatar: '/avatars/maria.jpg'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@microseguro.mx',
      phone: '+52 33 9876 5432',
      location: 'Guadalajara',
      status: 'active',
      tier: 'gold',
      joinDate: new Date('2023-03-20'),
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      totalPolicies: 180,
      totalPremiums: 890000,
      totalClaims: 8,
      commissionRate: 12,
      totalEarnings: 106800,
      performance: 88,
      rating: 4.6,
      specialties: ['Clima', 'Movilidad'],
      territories: ['Guadalajara', 'Zapopan'],
      avatar: '/avatars/carlos.jpg'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana.martinez@microseguro.mx',
      phone: '+52 81 5555 1234',
      location: 'Monterrey',
      status: 'active',
      tier: 'silver',
      joinDate: new Date('2023-06-10'),
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalPolicies: 95,
      totalPremiums: 450000,
      totalClaims: 5,
      commissionRate: 10,
      totalEarnings: 45000,
      performance: 82,
      rating: 4.4,
      specialties: ['Health'],
      territories: ['Monterrey'],
      avatar: '/avatars/ana.jpg'
    },
    {
      id: '4',
      name: 'Luis Hernández',
      email: 'luis.hernandez@microseguro.mx',
      phone: '+52 222 3333 4444',
      location: 'Puebla',
      status: 'pending',
      tier: 'bronze',
      joinDate: new Date('2024-01-05'),
      lastActive: new Date(),
      totalPolicies: 0,
      totalPremiums: 0,
      totalClaims: 0,
      commissionRate: 8,
      totalEarnings: 0,
      performance: 0,
      rating: 0,
      specialties: ['Seguridad'],
      territories: ['Puebla'],
      avatar: '/avatars/luis.jpg'
    }
  ])

  const [metrics] = useState<AgentMetrics>({
    totalAgents: 4,
    activeAgents: 3,
    totalPolicies: 520,
    totalPremiums: 2590000,
    averageCommission: 11.25,
    topPerformers: [],
    recentActivity: [
      {
        id: '1',
        type: 'policy_created',
        agentId: '1',
        agentName: 'María González',
        amount: 50000,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'commission_earned',
        agentId: '2',
        agentName: 'Carlos Rodríguez',
        amount: 6000,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'claim_processed',
        agentId: '1',
        agentName: 'María González',
        amount: 25000,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: '4',
        type: 'agent_joined',
        agentId: '4',
        agentName: 'Luis Hernández',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ]
  })

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    const matchesTier = tierFilter === 'all' || agent.tier === tierFilter
    
    return matchesSearch && matchesStatus && matchesTier
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'suspended': return 'text-red-400'
      case 'inactive': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'text-purple-400'
      case 'gold': return 'text-yellow-400'
      case 'silver': return 'text-gray-400'
      case 'bronze': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'policy_created': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'claim_processed': return <Activity className="w-4 h-4 text-blue-400" />
      case 'commission_earned': return <DollarSign className="w-4 h-4 text-yellow-400" />
      case 'agent_joined': return <UserPlus className="w-4 h-4 text-purple-400" />
      default: return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Red de Agentes</h1>
        <p className="text-gray-300">Gestión y monitoreo de agentes de seguros</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Agentes Totales</p>
              <p className="text-3xl font-bold text-white">{metrics.totalAgents}</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {metrics.activeAgents} activos
              </p>
            </div>
            <Users className="w-12 h-12 text-purple-400" />
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
              <p className="text-gray-400 text-sm">Policys Totales</p>
              <p className="text-3xl font-bold text-white">{metrics.totalPolicies.toLocaleString()}</p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <Target className="w-4 h-4" />
                ${(metrics.totalPremiums / 1000000).toFixed(1)}M en primas
              </p>
            </div>
            <Target className="w-12 h-12 text-blue-400" />
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
              <p className="text-gray-400 text-sm">Comisión Promedio</p>
              <p className="text-3xl font-bold text-white">{metrics.averageCommission}%</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                ${(metrics.totalPremiums * metrics.averageCommission / 100).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-400" />
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
              <p className="text-3xl font-bold text-white">88%</p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <Star className="w-4 h-4" />
                4.5/5 rating
              </p>
            </div>
            <Star className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddAgent(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Agregar Agente
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 flex items-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Enviar Newsletter
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search agentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="pending">Pendiente</option>
          <option value="suspended">Suspendido</option>
          <option value="inactive">Inactivo</option>
        </select>
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
        >
          <option value="all">Todos los niveles</option>
          <option value="platinum">Platino</option>
          <option value="gold">Oro</option>
          <option value="silver">Plata</option>
          <option value="bronze">Bronce</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {['overview', 'agents', 'performance', 'activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {tab === 'overview' && 'Resumen'}
            {tab === 'agents' && 'Agentes'}
            {tab === 'performance' && 'Rendimiento'}
            {tab === 'activity' && 'Activity'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Top Performers */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Mejores Agentes
              </h3>
              <div className="space-y-4">
                {agents.slice(0, 3).map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{agent.name}</h4>
                        <p className="text-gray-400 text-sm">{agent.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{agent.performance}%</div>
                      <div className="text-gray-400 text-sm">{agent.totalPolicies} pólizas</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Activity Reciente
              </h3>
              <div className="space-y-3">
                {metrics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        {activity.agentName} - {activity.type.replace('_', ' ')}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                    {activity.amount && (
                      <div className="text-green-400 font-medium">
                        ${activity.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'agents' && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedAgent(agent)}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(agent.tier)}`}>
                          {agent.tier}
                        </span>
                      </div>
                      <p className="text-gray-300">{agent.email}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {agent.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{agent.performance}%</div>
                    <div className="text-gray-400 text-sm">Rendimiento</div>
                    <div className="text-green-400 font-medium">${agent.totalEarnings.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Ganancias</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{agent.totalPolicies}</div>
                    <div className="text-gray-400 text-sm">Policys</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">${(agent.totalPremiums / 1000).toFixed(0)}K</div>
                    <div className="text-gray-400 text-sm">Premiums</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{agent.commissionRate}%</div>
                    <div className="text-gray-400 text-sm">Comisión</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{agent.rating}/5</div>
                    <div className="text-gray-400 text-sm">Rating</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {agent.specialties.map((specialty) => (
                    <span key={specialty} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Performance Charts would go here */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Métricas de Rendimiento</h3>
              <p className="text-gray-300">Gráficos y análisis de rendimiento de agentes</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Activity Feed */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Feed de Activity</h3>
              <div className="space-y-4">
                {metrics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{activity.agentName}</span> - {activity.type.replace('_', ' ')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {activity.timestamp.toLocaleString()}
                      </p>
                    </div>
                    {activity.amount && (
                      <div className="text-green-400 font-medium">
                        ${activity.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">Detalles del Agente</h3>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Agent Info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedAgent.name}</h4>
                    <p className="text-gray-300">{selectedAgent.email}</p>
                    <p className="text-gray-400">{selectedAgent.phone}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedAgent.totalPolicies}</div>
                    <div className="text-gray-400 text-sm">Policys</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">${(selectedAgent.totalPremiums / 1000).toFixed(0)}K</div>
                    <div className="text-gray-400 text-sm">Premiums</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedAgent.performance}%</div>
                    <div className="text-gray-400 text-sm">Rendimiento</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">${selectedAgent.totalEarnings.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Ganancias</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                    Editar
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                    Contactar
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
                    Asignar Territorio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add Agent Modal */}
        {showAddAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50"
            onClick={() => setShowAddAgent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo Agente</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                />
                <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white">
                  <option value="">Seleccionar ubicación</option>
                  <option value="cdmx">CDMX</option>
                  <option value="guadalajara">Guadalajara</option>
                  <option value="monterrey">Monterrey</option>
                  <option value="puebla">Puebla</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddAgent(false)}
                    className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                    Agregar
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
