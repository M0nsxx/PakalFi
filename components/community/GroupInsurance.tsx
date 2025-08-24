'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Shield,
  Vote,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  UserPlus,
  Settings,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Star,
  Activity,
  Plus,
  Search,
  Filter
} from 'lucide-react'

interface GroupMember {
  id: string
  name: string
  avatar: string
  role: 'admin' | 'member' | 'moderator'
  joinedAt: Date
  contribution: number
  policies: number
  status: 'active' | 'inactive'
}

interface GroupPolicy {
  id: string
  name: string
  type: 'health' | 'weather' | 'security' | 'mobility'
  premium: number
  coverage: number
  members: number
  maxMembers: number
  status: 'active' | 'pending' | 'expired'
  startDate: Date
  endDate: Date
  claims: number
  totalPaid: number
}

interface GroupVote {
  id: string
  title: string
  description: string
  options: string[]
  votes: Record<string, string>
  endDate: Date
  status: 'active' | 'closed'
  type: 'policy_change' | 'premium_adjustment' | 'coverage_modification' | 'member_approval'
}

export function GroupInsurance() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedGroup, setSelectedGroup] = useState('familia-garcia')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [groups] = useState([
    {
      id: 'familia-garcia',
      name: 'Familia García',
      description: 'Grupo familiar extendido en CDMX',
      members: 12,
      maxMembers: 20,
      policies: 3,
      totalCoverage: 2500000,
      monthlyPremium: 4500,
      status: 'active'
    },
    {
      id: 'vecinos-colonia',
      name: 'Vecinos Colonia Roma',
      description: 'Community de vecinos en Colonia Roma',
      members: 25,
      maxMembers: 50,
      policies: 5,
      totalCoverage: 5000000,
      monthlyPremium: 8750,
      status: 'active'
    },
    {
      id: 'agricultores-valle',
      name: 'Farmeres Valle de México',
      description: 'Cooperativa de agricultores',
      members: 45,
      maxMembers: 100,
      policies: 8,
      totalCoverage: 15000000,
      monthlyPremium: 22500,
      status: 'active'
    }
  ])

  const [members] = useState<GroupMember[]>([
    {
      id: '1',
      name: 'María García',
      avatar: '/avatars/maria.jpg',
      role: 'admin',
      joinedAt: new Date('2024-01-01'),
      contribution: 500,
      policies: 2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos García',
      avatar: '/avatars/carlos.jpg',
      role: 'member',
      joinedAt: new Date('2024-01-15'),
      contribution: 300,
      policies: 1,
      status: 'active'
    },
    {
      id: '3',
      name: 'Ana López',
      avatar: '/avatars/ana.jpg',
      role: 'moderator',
      joinedAt: new Date('2024-02-01'),
      contribution: 400,
      policies: 2,
      status: 'active'
    }
  ])

  const [policies] = useState<GroupPolicy[]>([
    {
      id: '1',
      name: 'Insurance Familiar Completo',
      type: 'health',
      premium: 150,
      coverage: 500000,
      members: 12,
      maxMembers: 20,
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      claims: 3,
      totalPaid: 75000
    },
    {
      id: '2',
      name: 'Protección Climática Agrícola',
      type: 'weather',
      premium: 200,
      coverage: 1000000,
      members: 8,
      maxMembers: 15,
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      claims: 1,
      totalPaid: 250000
    }
  ])

  const [votes] = useState<GroupVote[]>([
    {
      id: '1',
      title: 'Aumentar cobertura de salud',
      description: 'Proponemos aumentar la cobertura de salud de $500,000 a $750,000 MXN',
      options: ['A favor', 'En contra', 'Abstención'],
      votes: { '1': 'A favor', '2': 'A favor', '3': 'En contra' },
      endDate: new Date('2024-02-15'),
      status: 'active',
      type: 'coverage_modification'
    },
    {
      id: '2',
      title: 'Aprobar nuevo miembro',
      description: 'Aprobar la solicitud de Juan Pérez para unirse al grupo',
      options: ['Aprobar', 'Rechazar'],
      votes: { '1': 'Aprobar', '2': 'Aprobar' },
      endDate: new Date('2024-02-10'),
      status: 'closed',
      type: 'member_approval'
    }
  ])

  const currentGroup = groups.find(g => g.id === selectedGroup)

  const getTypeColor = (type: string) => {
    const colors = {
      health: 'bg-green-500/20 text-green-400 border-green-500/30',
      weather: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      security: 'bg-red-500/20 text-red-400 border-red-500/30',
      mobility: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      health: '🏥',
      weather: '🌦️',
      security: '🔒',
      mobility: '🚗'
    }
    return icons[type as keyof typeof icons] || '📋'
  }

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-500/20 text-red-400 border-red-500/30',
      moderator: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      member: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return colors[role as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Insurances Grupales Comunitarios</h1>
        <p className="text-gray-300">Protección colectiva, precios reducidos, decisiones compartidas</p>
      </div>

      {/* Group Selector */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {groups.map((group) => (
            <motion.button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                selectedGroup === group.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {group.name}
            </motion.button>
          ))}
        </div>

        {currentGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentGroup.name}</h2>
                <p className="text-gray-300">{currentGroup.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">
                  ${(currentGroup.totalCoverage / 1000000).toFixed(1)}M
                </div>
                <div className="text-gray-400">Coverage Total</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentGroup.members}</div>
                <div className="text-gray-400 text-sm">Miembros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentGroup.policies}</div>
                <div className="text-gray-400 text-sm">Policys Activas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${currentGroup.monthlyPremium}</div>
                <div className="text-gray-400 text-sm">Premium Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((currentGroup.members / currentGroup.maxMembers) * 100)}%
                </div>
                <div className="text-gray-400 text-sm">Capacidad</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateGroup(true)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Group
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowJoinGroup(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Join a Grupo
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Resumen', icon: Activity },
            { id: 'members', label: 'Miembros', icon: Users },
            { id: 'policies', label: 'Policys', icon: Shield },
            { id: 'votes', label: 'Votaciones', icon: Vote }
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Group Stats */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Estadísticas del Grupo
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Ahorro por miembro:</span>
                    <span className="text-green-400 font-bold">$150/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Claims procesados:</span>
                    <span className="text-blue-400 font-bold">4 este mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Satisfaction:</span>
                    <span className="text-yellow-400 font-bold">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Próxima votación:</span>
                    <span className="text-purple-400 font-bold">15 Feb</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Activity Reciente
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Nuevo claim aprobado</p>
                      <p className="text-gray-400 text-xs">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Nueva votación iniciada</p>
                      <p className="text-gray-400 text-xs">Hace 1 día</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Miembro agregado al grupo</p>
                      <p className="text-gray-400 text-xs">Hace 3 días</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'members' && (
            <motion.div
              key="members"
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
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Members List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{member.name}</h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getRoleColor(member.role)}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Contribución:</span>
                        <span className="text-white font-medium">${member.contribution}/mes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Policys:</span>
                        <span className="text-white font-medium">{member.policies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Miembro desde:</span>
                        <span className="text-white font-medium">
                          {member.joinedAt.toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'policies' && (
            <motion.div
              key="policies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {policies.map((policy) => (
                <motion.div
                  key={policy.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(policy.type)}</span>
                        <h3 className="text-xl font-bold text-white">{policy.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getTypeColor(policy.type)}`}>
                          {policy.type}
                        </span>
                      </div>
                      <p className="text-gray-300">Coverage grupal con discounts especiales</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">${policy.coverage.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Coverage</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">${policy.premium}</div>
                      <div className="text-gray-400 text-sm">Premium Monthly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{policy.members}/{policy.maxMembers}</div>
                      <div className="text-gray-400 text-sm">Miembros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{policy.claims}</div>
                      <div className="text-gray-400 text-sm">Claims</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">${policy.totalPaid.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Total Pagado</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {policy.startDate.toLocaleDateString('es-MX')} - {policy.endDate.toLocaleDateString('es-MX')}
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Ver Detalles
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'votes' && (
            <motion.div
              key="votes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {votes.map((vote) => (
                <motion.div
                  key={vote.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Vote className="w-6 h-6 text-purple-400" />
                        <h3 className="text-xl font-bold text-white">{vote.title}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm border ${
                          vote.status === 'active' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {vote.status === 'active' ? 'Activa' : 'Cerrada'}
                        </span>
                      </div>
                      <p className="text-gray-300">{vote.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Opciones:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {vote.options.map((option) => {
                        const voteCount = Object.values(vote.votes).filter(v => v === option).length
                        const totalVotes = Object.keys(vote.votes).length
                        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
                        
                        return (
                          <div key={option} className="bg-white/5 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-medium">{option}</span>
                              <span className="text-gray-400 text-sm">{voteCount} votos</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-right mt-1">
                              <span className="text-gray-400 text-sm">{percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Cierra: {vote.endDate.toLocaleDateString('es-MX')}
                    </div>
                    {vote.status === 'active' && (
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Votar
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Group Modal */}
      <AnimatePresence>
        {showCreateGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateGroup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Create New Group</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del grupo"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Descripción del grupo"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="number"
                  placeholder="Máximo de members"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Create Group
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Group Modal */}
      <AnimatePresence>
        {showJoinGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowJoinGroup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Join a Grupo</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Código de invitación"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Mensaje de solicitud (opcional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowJoinGroup(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Enviar Solicitud
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
