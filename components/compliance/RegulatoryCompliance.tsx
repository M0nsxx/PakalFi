'use client'

import React, { useState, useEffect } from 'react'
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
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckSquare,
  Square,
  FileCheck,
  FileX,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Settings,
  Bell
} from 'lucide-react'

interface ComplianceRequirement {
  id: string
  name: string
  category: 'regulatory' | 'operational' | 'financial' | 'data_protection'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'compliant' | 'non_compliant' | 'pending' | 'in_review'
  dueDate: Date
  lastReview: Date
  nextReview: Date
  description: string
  requirements: string[]
  documents: string[]
  responsible: string
  regulator: string
  penalty: string
  complianceScore: number
}

interface ComplianceReport {
  id: string
  title: string
  type: 'monthly' | 'quarterly' | 'annual' | 'incident'
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  submissionDate: Date
  dueDate: Date
  regulator: string
  complianceScore: number
  findings: string[]
  recommendations: string[]
  attachments: string[]
}

interface AuditLog {
  id: string
  action: string
  entity: string
  user: string
  timestamp: Date
  details: string
  status: 'success' | 'warning' | 'error'
}

export function RegulatoryCompliance(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('requirements')
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddRequirement, setShowAddRequirement] = useState<boolean>(false)
  const [showRequirementDetails, setShowRequirementDetails] = useState<boolean>(false)

  const [requirements] = useState<ComplianceRequirement[]>([
    {
      id: '1',
      name: 'Licencia de Insurances CNSF',
      category: 'regulatory',
      priority: 'critical',
      status: 'compliant',
      dueDate: new Date('2024-12-31'),
      lastReview: new Date('2024-01-15'),
      nextReview: new Date('2024-04-15'),
      description: 'Licencia principal para operar como aseguradora in Mexico',
      requirements: ['Documentación completa', 'Capital mínimo', 'Aprobación CNSF'],
      documents: ['licencia_cnsf.pdf', 'capital_verification.pdf'],
      responsible: 'Director Legal',
      regulator: 'CNSF',
      penalty: 'Suspensión de operaciones',
      complianceScore: 95
    },
    {
      id: '2',
      name: 'Protección de Datos Personales',
      category: 'data_protection',
      priority: 'high',
      status: 'compliant',
      dueDate: new Date('2024-06-30'),
      lastReview: new Date('2024-01-10'),
      nextReview: new Date('2024-07-10'),
      description: 'Cumplimiento con la Ley de Protección de Datos Personales',
      requirements: ['Aviso de privacidad', 'Consentimiento explícito', 'Seguridad de datos'],
      documents: ['aviso_privacidad.pdf', 'politica_datos.pdf'],
      responsible: 'DPO',
      regulator: 'INAI',
      penalty: 'Multa hasta 25 millones MXN',
      complianceScore: 88
    },
    {
      id: '3',
      name: 'Reservas Técnicas',
      category: 'financial',
      priority: 'high',
      status: 'pending',
      dueDate: new Date('2024-03-31'),
      lastReview: new Date('2024-01-05'),
      nextReview: new Date('2024-04-05'),
      description: 'Mantenimiento de reservas técnicas según normativa',
      requirements: ['Cálculo mensual', 'Auditoría externa', 'Reporte CNSF'],
      documents: ['calculo_reservas.xlsx', 'auditoria_2023.pdf'],
      responsible: 'Director Financiero',
      regulator: 'CNSF',
      penalty: 'Multa y supervisión especial',
      complianceScore: 72
    },
    {
      id: '4',
      name: 'Prevención de Lavado de Dinero',
      category: 'operational',
      priority: 'critical',
      status: 'in_review',
      dueDate: new Date('2024-02-28'),
      lastReview: new Date('2024-01-20'),
      nextReview: new Date('2024-03-20'),
      description: 'Programa de PLD/FT según normativa CNBV',
      requirements: ['Identificación de clientes', 'Reportes sospechosos', 'Capacitación'],
      documents: ['manual_pld.pdf', 'reportes_sospechosos.pdf'],
      responsible: 'Oficial de Cumplimiento',
      regulator: 'CNBV',
      penalty: 'Multa y sanciones penales',
      complianceScore: 85
    }
  ])

  const [reports] = useState<ComplianceReport[]>([
    {
      id: '1',
      title: 'Reporte Trimestral CNSF Q4 2023',
      type: 'quarterly',
      status: 'approved',
      submissionDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-31'),
      regulator: 'CNSF',
      complianceScore: 92,
      findings: ['Cumplimiento general satisfactorio', 'Mejoras en reservas técnicas'],
      recommendations: ['Mantener estándares actuales', 'Reforzar controles internos'],
      attachments: ['reporte_q4_2023.pdf', 'anexos_financieros.xlsx']
    },
    {
      id: '2',
      title: 'Reporte Annual PLD/FT 2023',
      type: 'annual',
      status: 'submitted',
      submissionDate: new Date('2024-01-20'),
      dueDate: new Date('2024-02-28'),
      regulator: 'CNBV',
      complianceScore: 87,
      findings: ['Programa PLD operativo', 'Capacitación pendiente'],
      recommendations: ['Completar capacitación anual', 'Actualizar procedimientos'],
      attachments: ['reporte_pld_2023.pdf', 'evidencia_capacitacion.pdf']
    }
  ])

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      action: 'Review Completed',
      entity: 'Licencia CNSF',
      user: 'María González',
      timestamp: new Date('2024-01-15'),
      details: 'Revisión trimestral completada exitosamente',
      status: 'success'
    },
    {
      id: '2',
      action: 'Document Updated',
      entity: 'Aviso de Privacidad',
      user: 'Carlos Rodríguez',
      timestamp: new Date('2024-01-14'),
      details: 'Actualización de aviso de privacidad según nueva normativa',
      status: 'success'
    },
    {
      id: '3',
      action: 'Compliance Alert',
      entity: 'Reservas Técnicas',
      user: 'Sistema',
      timestamp: new Date('2024-01-13'),
      details: 'Fecha límite de reporte próxima (15 días)',
      status: 'warning'
    }
  ])

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      regulatory: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      operational: 'bg-green-500/20 text-green-400 border-green-500/30',
      financial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      data_protection: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getPriorityColor = (priority: string): string => {
    const colors: Record<string, string> = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      critical: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[priority] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      compliant: 'bg-green-500/20 text-green-400 border-green-500/30',
      non_compliant: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      in_review: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusIcon = (status: string): React.ComponentType<{ className?: string }> => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      compliant: CheckCircle,
      non_compliant: AlertCircle,
      pending: ClockIcon,
      in_review: Eye
    }
    return icons[status] || ClockIcon
  }

  const totalRequirements = requirements.length
  const compliantRequirements = requirements.filter((r: ComplianceRequirement) => r.status === 'compliant').length
  const criticalRequirements = requirements.filter((r: ComplianceRequirement) => r.priority === 'critical').length
  const avgComplianceScore = requirements.reduce((sum: number, req: ComplianceRequirement) => sum + req.complianceScore, 0) / requirements.length

  const filteredRequirements = requirements.filter((req: ComplianceRequirement) => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || req.category === filterCategory
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Cumplimiento Regulatorio</h1>
        <p className="text-gray-300">Gestiona el cumplimiento regulatorio y mantén la conformidad legal</p>
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
              <p className="text-gray-400 text-sm">Score de Cumplimiento</p>
              <p className="text-3xl font-bold text-white">{avgComplianceScore.toFixed(0)}%</p>
              <p className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {compliantRequirements}/{totalRequirements} cumplidas
              </p>
            </div>
            <Shield className="w-12 h-12 text-green-400" />
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
              <p className="text-gray-400 text-sm">Requerimientos Críticos</p>
              <p className="text-3xl font-bold text-white">{criticalRequirements}</p>
              <p className="text-yellow-400 text-sm flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Requieren atención
              </p>
            </div>
            <AlertTriangle className="w-12 h-12 text-yellow-400" />
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
              <p className="text-gray-400 text-sm">Reportes Pendientes</p>
              <p className="text-3xl font-bold text-white">{reports.filter((r: ComplianceReport) => r.status === 'draft').length}</p>
              <p className="text-blue-400 text-sm flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Por enviar
              </p>
            </div>
            <FileText className="w-12 h-12 text-blue-400" />
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
              <p className="text-gray-400 text-sm">Próximos Vencimientos</p>
              <p className="text-3xl font-bold text-white">
                {requirements.filter((r: ComplianceRequirement) => {
                  const daysUntilDue = Math.ceil((r.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  return daysUntilDue <= 30 && daysUntilDue > 0
                }).length}
              </p>
              <p className="text-orange-400 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                En 30 días
              </p>
            </div>
            <Clock className="w-12 h-12 text-orange-400" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'requirements', label: 'Requerimientos', icon: FileCheck },
            { id: 'reports', label: 'Reportes', icon: FileText },
            { id: 'audit', label: 'Auditoría', icon: Activity },
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }
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
          {activeTab === 'requirements' && (
            <motion.div
              key="requirements"
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
                    placeholder="Search requerimientos..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="regulatory">Regulatorio</option>
                  <option value="operational">Operacional</option>
                  <option value="financial">Financiero</option>
                  <option value="data_protection">Protección de Datos</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="compliant">Cumplido</option>
                  <option value="non_compliant">No Cumplido</option>
                  <option value="pending">Pendiente</option>
                  <option value="in_review">En Revisión</option>
                </select>
                <button
                  onClick={() => setShowAddRequirement(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Agregar
                </button>
              </div>

              {/* Requirements List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequirements.map((requirement: ComplianceRequirement) => {
                  const StatusIcon = getStatusIcon(requirement.status)
                  const daysUntilDue = Math.ceil((requirement.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  
                  return (
                    <motion.div
                      key={requirement.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <StatusIcon className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">{requirement.name}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getCategoryColor(requirement.category)}`}>
                              {requirement.category.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-3">{requirement.description}</p>
                          <div className="flex gap-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getPriorityColor(requirement.priority)}`}>
                              {requirement.priority}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getStatusColor(requirement.status)}`}>
                              {requirement.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{requirement.complianceScore}%</div>
                          <div className="text-gray-400 text-sm">Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{requirement.regulator}</div>
                          <div className="text-gray-400 text-sm">Regulador</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${daysUntilDue <= 30 ? 'text-red-400' : 'text-white'}`}>
                            {daysUntilDue > 0 ? `${daysUntilDue} días` : 'Vencido'}
                          </div>
                          <div className="text-gray-400 text-sm">Vence</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          <CalendarIcon className="w-4 h-4 inline mr-1" />
                          Próxima revisión: {requirement.nextReview.toLocaleDateString('es-MX')}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedRequirement(requirement.id)
                              setShowRequirementDetails(true)
                            }}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                          >
                            Ver Detalles
                          </button>
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Actualizar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Reportes de Cumplimiento</h3>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Nuevo Reporte
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-white/10">
                        <th className="pb-3">Título</th>
                        <th className="pb-3">Tipo</th>
                        <th className="pb-3">Regulador</th>
                        <th className="pb-3">Estado</th>
                        <th className="pb-3">Score</th>
                        <th className="pb-3">Fecha Envío</th>
                        <th className="pb-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report: ComplianceReport) => (
                        <tr key={report.id} className="border-b border-white/5">
                          <td className="py-3 text-white">{report.title}</td>
                          <td className="py-3 text-gray-300 capitalize">{report.type}</td>
                          <td className="py-3 text-gray-300">{report.regulator}</td>
                          <td className="py-3">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs border ${
                              report.status === 'approved' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : report.status === 'submitted'
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : report.status === 'draft'
                                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}>
                              {report.status === 'approved' ? 'Aprobado' : 
                               report.status === 'submitted' ? 'Enviado' : 
                               report.status === 'draft' ? 'Borrador' : 'Rechazado'}
                            </span>
                          </td>
                          <td className="py-3 text-green-400 font-bold">{report.complianceScore}%</td>
                          <td className="py-3 text-gray-300">{report.submissionDate.toLocaleDateString('es-MX')}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button className="p-1 text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'audit' && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Registro de Auditoría</h3>
                <div className="space-y-4">
                  {auditLogs.map((log: AuditLog) => (
                    <div key={log.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        log.status === 'success' ? 'bg-green-400' :
                        log.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{log.action}</span>
                          <span className="text-gray-400 text-sm">{log.timestamp.toLocaleString('es-MX')}</span>
                        </div>
                        <div className="text-gray-300 text-sm">{log.entity} - {log.details}</div>
                        <div className="text-gray-400 text-xs">Usuario: {log.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Compliance by Category */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-6 h-6" />
                  Cumplimiento por Categoría
                </h3>
                <div className="space-y-4">
                  {['regulatory', 'operational', 'financial', 'data_protection'].map((category: string) => {
                    const categoryReqs = requirements.filter((r: ComplianceRequirement) => r.category === category)
                    const avgScore = categoryReqs.length > 0 
                      ? categoryReqs.reduce((sum: number, req: ComplianceRequirement) => sum + req.complianceScore, 0) / categoryReqs.length 
                      : 0
                    
                    return (
                      <div key={category} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-medium capitalize">{category.replace('_', ' ')}</span>
                            <span className="text-gray-400 text-sm">{categoryReqs.length} reqs</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${avgScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{avgScore.toFixed(0)}%</div>
                          <div className="text-gray-400 text-sm">Promedio</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Próximos Vencimientos
                </h3>
                <div className="space-y-4">
                  {requirements
                    .filter((r: ComplianceRequirement) => {
                      const daysUntilDue = Math.ceil((r.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                      return daysUntilDue <= 60 && daysUntilDue > 0
                    })
                    .sort((a: ComplianceRequirement, b: ComplianceRequirement) => a.dueDate.getTime() - b.dueDate.getTime())
                    .slice(0, 5)
                    .map((req: ComplianceRequirement) => {
                      const daysUntilDue = Math.ceil((req.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                      
                      return (
                        <div key={req.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            daysUntilDue <= 7 ? 'bg-red-400' :
                            daysUntilDue <= 30 ? 'bg-yellow-400' : 'bg-green-400'
                          }`}></div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{req.name}</div>
                            <div className="text-gray-400 text-sm">{req.regulator}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${
                              daysUntilDue <= 7 ? 'text-red-400' :
                              daysUntilDue <= 30 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {daysUntilDue} días
                            </div>
                            <div className="text-gray-400 text-xs">{req.dueDate.toLocaleDateString('es-MX')}</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Requirement Modal */}
      <AnimatePresence>
        {showAddRequirement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddRequirement(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Agregar Requerimiento</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del requerimiento"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Descripción"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500">
                  <option value="">Seleccionar categoría</option>
                  <option value="regulatory">Regulatorio</option>
                  <option value="operational">Operacional</option>
                  <option value="financial">Financiero</option>
                  <option value="data_protection">Protección de Datos</option>
                </select>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500">
                  <option value="">Seleccionar prioridad</option>
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddRequirement(false)}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Agregar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requirement Details Modal */}
      <AnimatePresence>
        {showRequirementDetails && selectedRequirement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setShowRequirementDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/20"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {(() => {
                const requirement = requirements.find((r: ComplianceRequirement) => r.id === selectedRequirement)
                if (!requirement) return null

                return (
                  <>
                    <h3 className="text-xl font-bold text-white mb-4">Detalles del Requerimiento</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">{requirement.name}</h4>
                        <p className="text-gray-300">{requirement.description}</p>
                        <div className="flex gap-2 mt-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getCategoryColor(requirement.category)}`}>
                            {requirement.category.replace('_', ' ')}
                          </span>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getPriorityColor(requirement.priority)}`}>
                            {requirement.priority}
                          </span>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm border ${getStatusColor(requirement.status)}`}>
                            {requirement.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-white font-semibold mb-2">Información General</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Regulador:</span>
                              <span className="text-white">{requirement.regulator}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Responsable:</span>
                              <span className="text-white">{requirement.responsible}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Score:</span>
                              <span className="text-green-400">{requirement.complianceScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Penalización:</span>
                              <span className="text-red-400">{requirement.penalty}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-2">Fechas</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Vence:</span>
                              <span className="text-white">{requirement.dueDate.toLocaleDateString('es-MX')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Última revisión:</span>
                              <span className="text-white">{requirement.lastReview.toLocaleDateString('es-MX')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Próxima revisión:</span>
                              <span className="text-white">{requirement.nextReview.toLocaleDateString('es-MX')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-white font-semibold mb-2">Requerimientos</h5>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          {requirement.requirements.map((req: string, index: number) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-white font-semibold mb-2">Documentos</h5>
                        <div className="flex flex-wrap gap-2">
                          {requirement.documents.map((doc: string, index: number) => (
                            <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowRequirementDetails(false)}
                          className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                          Cerrar
                        </button>
                        <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Editar
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
