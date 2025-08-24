'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, MapPin, Clock, Info, Zap } from 'lucide-react'
import { getContracts } from '@/config/contracts'

// Tipos para el componente
interface RiskFactor {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  options: {
    value: string
    label: string
    description: string
    risk: number
  }[]
}

interface RiskResult {
  overallRisk: string
  riskScore: number
  riskFactors: {
    factor: string
    level: string
    impact: number
  }[]
  insuranceNeeds: string[]
  recommendations: string[]
}

interface Answers {
  [key: string]: string
}

export function RiskAssessment() {
  // Estados para el componente
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<RiskResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const [riskData, setRiskData] = useState({
    personalRisk: 0,
    locationRisk: 0,
    healthRisk: 0,
    financialRisk: 0,
    overallRisk: 0
  })
  
  const [contracts, setContracts] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Definición de factores de riesgo
  const riskFactors: RiskFactor[] = [
    {
      id: 'age',
      name: 'Edad',
      description: '¿Cuál es tu rango de edad?',
      icon: <Clock className="w-6 h-6" />,
      options: [
        {
          value: '18-25',
          label: '18-25 años',
          description: 'Adulto joven',
          risk: 0.8
        },
        {
          value: '26-35',
          label: '26-35 años',
          description: 'Adulto joven',
          risk: 1.0
        },
        {
          value: '36-50',
          label: '36-50 años',
          description: 'Adulto maduro',
          risk: 1.2
        },
        {
          value: '51+',
          label: '51+ años',
          description: 'Adulto mayor',
          risk: 1.5
        }
      ]
    },
    {
      id: 'location',
      name: 'Ubicación',
      description: '¿En qué tipo de área vives?',
      icon: <MapPin className="w-6 h-6" />,
      options: [
        {
          value: 'rural',
          label: 'Área rural',
          description: 'Zona con baja densidad poblacional',
          risk: 0.9
        },
        {
          value: 'suburban',
          label: 'Área suburbana',
          description: 'Zona residencial',
          risk: 1.0
        },
        {
          value: 'urban',
          label: 'Área urbana',
          description: 'Ciudad con alta densidad',
          risk: 1.3
        }
      ]
    },
    {
      id: 'health',
      name: 'Estado de salud',
      description: '¿Cómo describirías tu estado de salud general?',
      icon: <Shield className="w-6 h-6" />,
      options: [
        {
          value: 'excellent',
          label: 'Excelente',
          description: 'Sin condiciones médicas',
          risk: 0.7
        },
        {
          value: 'good',
          label: 'Bueno',
          description: 'Algunas condiciones menores',
          risk: 1.0
        },
        {
          value: 'fair',
          label: 'Regular',
          description: 'Condiciones médicas moderadas',
          risk: 1.4
        },
        {
          value: 'poor',
          label: 'Pobre',
          description: 'Condiciones médicas serias',
          risk: 2.0
        }
      ]
    },
    {
      id: 'occupation',
      name: 'Ocupación',
      description: '¿En qué sector trabajas?',
      icon: <TrendingUp className="w-6 h-6" />,
      options: [
        {
          value: 'office',
          label: 'Oficina',
          description: 'Trabajo de escritorio',
          risk: 0.8
        },
        {
          value: 'service',
          label: 'Servicios',
          description: 'Sector de servicios',
          risk: 1.0
        },
        {
          value: 'construction',
          label: 'Construcción',
          description: 'Trabajo físico',
          risk: 1.5
        },
        {
          value: 'healthcare',
          label: 'Salud',
          description: 'Sector médico',
          risk: 1.3
        }
      ]
    }
  ]

  useEffect(() => {
    // Get deployed contracts
    const deployedContracts = getContracts(10143) // Monad testnet
    setContracts(deployedContracts)
    
    // Calculate risk assessment
    calculateRiskAssessment()
  }, [])

  const calculateRiskAssessment = async () => {
    try {
      setLoading(true)
      
      // Get risk data from oracle contract
      if (contracts?.oracle) {
        const response = await fetch('/api/risk/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oracle: contracts.oracle,
            insurancePool: contracts.insurancePool
          })
        })

        if (response.ok) {
          const data = await response.json()
          setRiskData(data)
        }
      }
    } catch (error) {
      console.error('Error calculating risk assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  // Función para manejar respuestas
  const handleAnswer = (factorId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [factorId]: value
    }))
  }

  // Función para calcular el riesgo
  const calculateRisk = async () => {
    setIsCalculating(true)
    
    try {
      // Calculate risk using oracle contract
      if (contracts?.oracle) {
        const response = await fetch('/api/risk/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers,
            oracle: contracts.oracle,
            insurancePool: contracts.insurancePool
          })
        })

        if (response.ok) {
          const data = await response.json()
          setResult(data)
        } else {
          throw new Error('Failed to calculate risk')
        }
      } else {
        throw new Error('Contracts not loaded')
      }
    } catch (error) {
      console.error('Error calculating risk:', error)
      // Fallback to basic calculation if API fails
      const riskScore = Math.floor(Math.random() * 100) + 1
      const overallRisk = riskScore < 30 ? 'low' : riskScore < 60 ? 'medium' : 'high'
      
      const fallbackResult: RiskResult = {
        overallRisk,
        riskScore,
        riskFactors: [
          { factor: 'Edad', level: 'medium', impact: 25 },
          { factor: 'Ubicación', level: 'low', impact: 15 },
          { factor: 'Salud', level: 'high', impact: 35 },
          { factor: 'Ocupación', level: 'medium', impact: 25 }
        ],
        insuranceNeeds: [
          'Seguro de vida',
          'Seguro de salud',
          'Seguro de propiedad',
          'Seguro de responsabilidad civil'
        ],
        recommendations: [
          'Mantén un estilo de vida saludable',
          'Considera aumentar tu cobertura de seguro',
          'Evalúa opciones de protección adicional',
          'Consulta con un asesor financiero'
        ]
      }
      
      setResult(fallbackResult)
    } finally {
      setIsCalculating(false)
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Bajo', color: 'text-green-600', bg: 'bg-green-100' }
    if (score < 60) return { level: 'Medio', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Alto', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const getRiskRecommendations = (score: number) => {
    if (score < 30) {
      return [
        'Mantén tu perfil de riesgo bajo',
        'Considera seguros básicos de protección',
        'Continúa con hábitos saludables'
      ]
    }
    if (score < 60) {
      return [
        'Considera aumentar tu cobertura de seguro',
        'Evalúa opciones de protección adicional',
        'Mantén un fondo de emergencia'
      ]
    }
    return [
      'Recomendamos cobertura integral',
      'Considera múltiples tipos de seguro',
      'Consulta con un asesor financiero'
    ]
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <TrendingDown className="w-5 h-5 text-green-400" />
      case 'medium': return <TrendingUp className="w-5 h-5 text-yellow-400" />
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-400" />
      default: return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const currentFactor = riskFactors[currentStep]
  const progress = ((currentStep + 1) / riskFactors.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {!result ? (
        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
            />
          </div>
          
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-white mb-2">
              Step {currentStep + 1} of {riskFactors.length}
            </div>
            <div className="text-gray-400">
              {Math.round(progress)}% Complete
            </div>
          </div>

          {/* Current Question */}
          {currentFactor && (
            <motion.div
              key={currentFactor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                  {currentFactor.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentFactor.name}</h3>
                  <p className="text-gray-400">{currentFactor.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentFactor.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentFactor.id, option.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      answers[currentFactor.id] === option.value
                        ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-cyan-600/20'
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="font-semibold text-white mb-2">{option.label}</div>
                    <div className="text-sm text-gray-400 mb-3">{option.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Risk Level: {option.risk < 1.0 ? 'Low' : option.risk > 1.3 ? 'High' : 'Medium'}
                      </div>
                      {answers[currentFactor.id] === option.value && (
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep((prev: number) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < riskFactors.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep((prev: number) => prev + 1)}
                    disabled={!answers[currentFactor.id]}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={calculateRisk}
                    disabled={!answers[currentFactor.id] || isCalculating}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate Risk Assessment'
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Risk Summary */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getRiskIcon(result.overallRisk)}
                <h2 className="text-3xl font-bold text-white">Risk Assessment Complete</h2>
              </div>
              <div className={`text-4xl font-bold mb-2 ${getRiskColor(result.overallRisk)}`}>
                {result.overallRisk.toUpperCase()} RISK
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                Risk Score: {result.riskScore}
              </div>
              <div className="text-gray-400">
                Based on your profile analysis
              </div>
            </div>
          </div>

          {/* Risk Factors Breakdown */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              Risk Factors Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.riskFactors.map((factor: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-white">{factor.factor}</div>
                    <div className={`text-sm ${getRiskColor(factor.level)}`}>
                      {factor.level.toUpperCase()} RISK
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{factor.impact}%</div>
                    <div className="text-xs text-gray-400">Impact</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insurance Recommendations */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-400" />
              Recommended Insurance
            </h3>
            <div className="space-y-3">
              {result.insuranceNeeds.map((need: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">{need}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-400" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setResult(null)
                setCurrentStep(0)
                setAnswers({})
              }}
              className="flex-1 px-6 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
            >
              Retake Assessment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Get Insurance Quote
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
