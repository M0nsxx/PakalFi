'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  XCircle,
  Info,
  MapPin,
  Users,
  Home,
  Car,
  Heart,
  Cloud,
  Zap
} from 'lucide-react'

interface RiskFactor {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  options: {
    value: string
    label: string
    risk: number
    description: string
  }[]
}

interface RiskResult {
  overallRisk: 'low' | 'medium' | 'high'
  riskScore: number
  recommendations: string[]
  insuranceNeeds: string[]
  riskFactors: {
    factor: string
    level: 'low' | 'medium' | 'high'
    impact: number
  }[]
}

export function RiskAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<RiskResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const riskFactors: RiskFactor[] = [
    {
      id: 'location',
      name: 'Location Risk',
      description: 'Where you live affects your risk level',
      icon: <MapPin className="w-6 h-6" />,
      options: [
        { value: 'rural', label: 'Rural Area', risk: 0.8, description: 'Lower crime, weather risks' },
        { value: 'suburban', label: 'Suburban Area', risk: 1.0, description: 'Balanced risk profile' },
        { value: 'urban', label: 'Urban Area', risk: 1.3, description: 'Higher crime, traffic risks' },
        { value: 'high_crime', label: 'High Crime Area', risk: 1.6, description: 'Significant security risks' }
      ]
    },
    {
      id: 'occupation',
      name: 'Occupation Risk',
      description: 'Your job affects your insurance needs',
      icon: <Users className="w-6 h-6" />,
      options: [
        { value: 'office', label: 'Office Worker', risk: 0.9, description: 'Low physical risk' },
        { value: 'student', label: 'Student', risk: 0.8, description: 'Minimal occupational risk' },
        { value: 'driver', label: 'Driver/Delivery', risk: 1.4, description: 'High accident risk' },
        { value: 'construction', label: 'Construction', risk: 1.5, description: 'High injury risk' },
        { value: 'healthcare', label: 'Healthcare Worker', risk: 1.2, description: 'Moderate health risk' }
      ]
    },
    {
      id: 'transportation',
      name: 'Transportation Risk',
      description: 'How you travel affects your mobility risk',
      icon: <Car className="w-6 h-6" />,
      options: [
        { value: 'public', label: 'Public Transportation', risk: 1.1, description: 'Moderate accident risk' },
        { value: 'walking', label: 'Walking/Cycling', risk: 1.2, description: 'Pedestrian accident risk' },
        { value: 'personal_car', label: 'Personal Car', risk: 1.3, description: 'Vehicle accident risk' },
        { value: 'motorcycle', label: 'Motorcycle', risk: 1.6, description: 'High accident risk' },
        { value: 'delivery', label: 'Delivery Work', risk: 1.5, description: 'High mobility risk' }
      ]
    },
    {
      id: 'health',
      name: 'Health Risk',
      description: 'Your health status affects medical coverage needs',
      icon: <Heart className="w-6 h-6" />,
      options: [
        { value: 'excellent', label: 'Excellent Health', risk: 0.8, description: 'Low medical risk' },
        { value: 'good', label: 'Good Health', risk: 1.0, description: 'Standard medical risk' },
        { value: 'fair', label: 'Fair Health', risk: 1.3, description: 'Moderate medical risk' },
        { value: 'poor', label: 'Poor Health', risk: 1.6, description: 'High medical risk' },
        { value: 'chronic', label: 'Chronic Conditions', risk: 1.8, description: 'Very high medical risk' }
      ]
    },
    {
      id: 'weather',
      name: 'Weather Risk',
      description: 'Local weather patterns affect climate insurance needs',
      icon: <Cloud className="w-6 h-6" />,
      options: [
        { value: 'stable', label: 'Stable Weather', risk: 0.7, description: 'Low weather risk' },
        { value: 'moderate', label: 'Moderate Weather', risk: 1.0, description: 'Standard weather risk' },
        { value: 'extreme', label: 'Extreme Weather', risk: 1.4, description: 'High weather risk' },
        { value: 'hurricane', label: 'Hurricane Zone', risk: 1.6, description: 'Very high weather risk' },
        { value: 'drought', label: 'Drought Prone', risk: 1.3, description: 'High agricultural risk' }
      ]
    },
    {
      id: 'property',
      name: 'Property Risk',
      description: 'Your property situation affects security needs',
      icon: <Home className="w-6 h-6" />,
      options: [
        { value: 'owned', label: 'Property Owner', risk: 1.2, description: 'Property damage risk' },
        { value: 'rented', label: 'Renting', risk: 1.0, description: 'Standard property risk' },
        { value: 'shared', label: 'Shared Housing', risk: 1.1, description: 'Moderate property risk' },
        { value: 'business', label: 'Business Property', risk: 1.4, description: 'High property risk' },
        { value: 'none', label: 'No Property', risk: 0.8, description: 'Low property risk' }
      ]
    }
  ]

  const handleAnswer = (factorId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [factorId]: value }))
  }

  const calculateRisk = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      let totalRisk = 0
      let factorCount = 0
      const riskFactorsResult: RiskResult['riskFactors'] = []

      Object.entries(answers).forEach(([factorId, value]) => {
        const factor = riskFactors.find(f => f.id === factorId)
        const option = factor?.options.find(o => o.value === value)
        
        if (option && factor) {
          totalRisk += option.risk
          factorCount++
          
          let level: 'low' | 'medium' | 'high' = 'medium'
          if (option.risk < 1.0) level = 'low'
          else if (option.risk > 1.3) level = 'high'
          
          riskFactorsResult.push({
            factor: factor.name,
            level,
            impact: Math.round(option.risk * 100)
          })
        }
      })

      const averageRisk = totalRisk / factorCount
      let overallRisk: 'low' | 'medium' | 'high' = 'medium'
      let riskScore = Math.round(averageRisk * 100)

      if (averageRisk < 1.0) {
        overallRisk = 'low'
        riskScore = Math.round(averageRisk * 80)
      } else if (averageRisk > 1.3) {
        overallRisk = 'high'
        riskScore = Math.round(averageRisk * 120)
      }

      const recommendations = getRecommendations(overallRisk, answers)
      const insuranceNeeds = getInsuranceNeeds(answers)

      setResult({
        overallRisk,
        riskScore,
        recommendations,
        insuranceNeeds,
        riskFactors: riskFactorsResult
      })
      
      setIsCalculating(false)
    }, 2000)
  }

  const getRecommendations = (risk: string, answers: Record<string, string>): string[] => {
    const recommendations = []
    
    if (risk === 'high') {
      recommendations.push('Consider comprehensive insurance coverage')
      recommendations.push('Implement additional safety measures')
      recommendations.push('Regular health check-ups recommended')
    } else if (risk === 'medium') {
      recommendations.push('Standard insurance coverage recommended')
      recommendations.push('Monitor risk factors regularly')
    } else {
      recommendations.push('Basic insurance coverage may be sufficient')
      recommendations.push('Maintain current safety practices')
    }

    if (answers.transportation === 'motorcycle' || answers.transportation === 'delivery') {
      recommendations.push('Consider additional mobility insurance')
    }

    if (answers.weather === 'extreme' || answers.weather === 'hurricane') {
      recommendations.push('Climate insurance highly recommended')
    }

    return recommendations
  }

  const getInsuranceNeeds = (answers: Record<string, string>): string[] => {
    const needs = []
    
    if (answers.health === 'poor' || answers.health === 'chronic') {
      needs.push('Micro-Health (High Priority)')
    } else if (answers.health === 'fair') {
      needs.push('Micro-Health (Recommended)')
    }

    if (answers.transportation === 'motorcycle' || answers.transportation === 'delivery') {
      needs.push('Micro-Mobility (High Priority)')
    } else if (answers.transportation === 'personal_car') {
      needs.push('Micro-Mobility (Recommended)')
    }

    if (answers.weather === 'extreme' || answers.weather === 'hurricane') {
      needs.push('Micro-Climate (High Priority)')
    } else if (answers.weather === 'moderate') {
      needs.push('Micro-Climate (Consider)')
    }

    if (answers.location === 'high_crime' || answers.location === 'urban') {
      needs.push('Micro-Security (Recommended)')
    }

    return needs
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
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < riskFactors.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
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
              {result.riskFactors.map((factor, index) => (
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
              {result.insuranceNeeds.map((need, index) => (
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
              {result.recommendations.map((rec, index) => (
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
