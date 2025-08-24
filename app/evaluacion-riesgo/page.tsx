'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  MapPin,
  Home,
  Car,
  Heart,
  Cloud,
  Users,
  DollarSign,
  BarChart3,
  Download,
  Share2,
  ArrowRight,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function EvaluacionRiesgoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    age: 30,
    location: 'CDMX',
    occupation: 'empleado',
    income: 'medio',
    health: 'buena',
    vehicle: 'no',
    property: 'no',
    family: 'solo',
    savings: 'bajo'
  })

  const [riskScore, setRiskScore] = useState(0)
  const [riskLevel, setRiskLevel] = useState('')
  const [recommendations, setRecommendations] = useState<string[]>([])

  const steps = [
    { id: 1, title: 'Personal Information', icon: <Users className="w-5 h-5" /> },
    { id: 2, title: 'Financial Situation', icon: <DollarSign className="w-5 h-5" /> },
    { id: 3, title: 'Assets and Properties', icon: <Home className="w-5 h-5" /> },
    { id: 4, title: 'Results', icon: <BarChart3 className="w-5 h-5" /> }
  ]

  const calculateRisk = () => {
    let score = 0
    
    // Age factor
    if (formData.age < 25) score += 10
    else if (formData.age < 35) score += 15
    else if (formData.age < 50) score += 20
    else score += 25

    // Location factor
    const locationRisks: Record<string, number> = {
      'CDMX': 25,
      'Guadalajara': 20,
      'Monterrey': 20,
      'Puebla': 15,
      'Querétaro': 10
    }
    score += locationRisks[formData.location] || 15

    // Occupation factor
    const occupationRisks: Record<string, number> = {
      'empleado': 10,
      'independiente': 20,
      'empresario': 25,
      'estudiante': 15
    }
    score += occupationRisks[formData.occupation] || 10

    // Income factor
    const incomeRisks: Record<string, number> = {
      'bajo': 30,
      'medio': 20,
      'alto': 10
    }
    score += incomeRisks[formData.income] || 20

    // Health factor
    const healthRisks: Record<string, number> = {
      'excelente': 5,
      'buena': 10,
      'regular': 20,
      'mala': 35
    }
    score += healthRisks[formData.health] || 10

    // Vehicle factor
    if (formData.vehicle === 'si') score += 15

    // Property factor
    if (formData.property === 'si') score += 20

    // Family factor
    const familyRisks: Record<string, number> = {
      'solo': 10,
      'pareja': 15,
      'hijos': 25
    }
    score += familyRisks[formData.family] || 10

    // Savings factor
    const savingsRisks: Record<string, number> = {
      'bajo': 25,
      'medio': 15,
      'alto': 5
    }
    score += savingsRisks[formData.savings] || 15

    setRiskScore(score)

    // Determine risk level
    let level = ''
    let recommendations = []

    if (score < 50) {
      level = 'Low'
      recommendations = [
        'Pakal-Security para proteger tus dispositivos',
        'Pakal-Health básico para emergencias',
        'Considera ahorrar para crear un fondo de emergencia'
      ]
    } else if (score < 80) {
      level = 'Medium'
      recommendations = [
        'Pakal-Health con cobertura amplia',
        'Pakal-Security para bienes personales',
        'Pakal-Mobility si usas transporte regularmente',
        'Considera un plan de ahorro estructurado'
      ]
    } else {
      level = 'High'
      recommendations = [
        'Pakal-Health con cobertura máxima',
        'Pakal-Security integral',
        'Pakal-Climate si vives en zona de riesgo',
        'Pakal-Mobility completo',
        'Consulta con un asesor financiero'
      ]
    }

    setRiskLevel(level)
    setRecommendations(recommendations)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 3) {
        calculateRisk()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
              Risk Assessment
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Get a personalized risk assessment and receive recommendations for the best insurance coverage. 
              Our AI analyzes your profile to provide optimal protection.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 px-4 border-b border-gray-700">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.id ? 'text-green-400' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id 
                      ? 'border-green-500 bg-green-500/20' 
                      : 'border-gray-600'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'
                  }`}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
          >
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Personal Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-4">
                      Age: {formData.age} years
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.age}
                      onChange={(e) => updateFormData('age', e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-gray-400 text-sm mt-2">
                      <span>18</span>
                      <span>80</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="CDMX">Ciudad de México</option>
                      <option value="Guadalajara">Guadalajara</option>
                      <option value="Monterrey">Monterrey</option>
                      <option value="Puebla">Puebla</option>
                      <option value="Querétaro">Querétaro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Ocupación</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 'empleado', label: 'Empleado' },
                        { value: 'independiente', label: 'Independiente' },
                        { value: 'empresario', label: 'Empresario' },
                        { value: 'estudiante', label: 'Student' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('occupation', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.occupation === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Financial Situation */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Financial Situation</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-4">Income Level</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'bajo', label: 'Low', desc: '< $15,000/mes' },
                        { value: 'medio', label: 'Medium', desc: '$15,000 - $50,000/mes' },
                        { value: 'alto', label: 'High', desc: '> $50,000/mes' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('income', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.income === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm opacity-75">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Health Status</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 'excelente', label: 'Excellent' },
                        { value: 'buena', label: 'Good' },
                        { value: 'regular', label: 'Regular' },
                        { value: 'mala', label: 'Poor' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('health', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.health === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Do you have a vehicle?</label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('vehicle', option.value)}
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.vehicle === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Assets and Properties */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Assets and Properties</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-4">Do you have properties?</label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('property', option.value)}
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.property === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Family Situation</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'solo', label: 'Single' },
                        { value: 'pareja', label: 'With Partner' },
                        { value: 'hijos', label: 'With Children' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('family', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.family === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-4">Savings Level</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'bajo', label: 'Low', desc: '< $10,000' },
                        { value: 'medio', label: 'Medium', desc: '$10,000 - $100,000' },
                        { value: 'alto', label: 'High', desc: '> $100,000' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('savings', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.savings === option.value
                              ? 'border-green-500 bg-green-500/20 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm opacity-75">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Results de la Evaluación</h2>
                
                <div className="space-y-8">
                  {/* Risk Score */}
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 mb-6">
                      <h3 className="text-white text-lg font-medium mb-4">Tu Risk Level</h3>
                      <div className="text-5xl font-bold text-white mb-2">{riskScore}</div>
                      <div className="text-green-100 text-xl font-semibold">{riskLevel}</div>
                    </div>
                  </div>

                  {/* Risk Level Indicator */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-white text-lg font-medium mb-4">Risk Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Personal Risk</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                riskLevel === 'Low' ? 'bg-green-500' : 
                                riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(riskScore, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-medium">{riskLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-white text-lg font-medium mb-4">Recommendations</h3>
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center">
                      <Shield className="w-5 h-5 mr-2" />
                      View Products Recomendados
                    </button>
                    <button className="flex-1 bg-gray-700/50 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600/50 transition-all flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-gray-700/50 text-white rounded-lg font-medium hover:bg-gray-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center"
                >
                  {currentStep === 3 ? 'View Results' : 'Next'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">¿Por Qué Evaluar tu Riesgo?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Conoce los beneficios de realizar una evaluación completa de tu perfil de riesgo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-xl mb-6">
                <Shield className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Protección</div>
                <div className="text-blue-100">Personalizada</div>
              </div>
              <p className="text-gray-300">Recibe recomendaciones específicas para tu situación</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl mb-6">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Optimización</div>
                <div className="text-purple-100">de Costos</div>
              </div>
              <p className="text-gray-300">Encuentra la cobertura adecuada sin pagar de más</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl mb-6">
                <AlertTriangle className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Prevención</div>
                <div className="text-orange-100">de Riesgos</div>
              </div>
              <p className="text-gray-300">Identifica vulnerabilidades antes de que ocurran</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Complete Your Risk Assessment
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Answer a few questions to get your personalized risk profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                Start Assessment
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
