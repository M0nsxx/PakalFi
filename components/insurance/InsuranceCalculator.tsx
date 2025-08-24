'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Heart, Cloud, Shield, Car, Zap, TrendingUp } from 'lucide-react'

export function InsuranceCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [age, setAge] = useState(30)
  const [location, setLocation] = useState('cdmx')
  const [products, setProducts] = useState({
    health: false,
    weather: false,
    security: false,
    mobility: false
  })
  
  const [calculatedPremium, setCalculatedPremium] = useState(0)
  const [calculatedCoverage, setCalculatedCoverage] = useState(0)
  const [riskScore, setRiskScore] = useState(0)
  
  useEffect(() => {
    setIsMounted(true)
    
    const premium = calculatePremium()
    const coverage = calculateCoverage()
    const risk = calculateRiskScore()
    
    setCalculatedPremium(premium)
    setCalculatedCoverage(coverage)
    setRiskScore(risk)
  }, [age, location, products])
  
  const calculatePremium = () => {
    let total = 0
    if (products.health) total += 10 + (age > 40 ? 10 : 0)
    if (products.weather) total += 20
    if (products.security) total += 15
    if (products.mobility) total += 25
    
    // Location risk adjustment
    if (location === 'high-risk') total *= 1.2
    if (location === 'rural') total *= 0.9
    
    return Math.round(total)
  }
  
  const calculateCoverage = () => {
    let coverage = 0
    if (products.health) coverage += 25000
    if (products.weather) coverage += 100000
    if (products.security) coverage += 50000
    if (products.mobility) coverage += 75000
    return coverage
  }
  
  const calculateRiskScore = () => {
    let score = 50 // Base score
    
    // Age factor
    if (age > 60) score += 20
    else if (age > 40) score += 10
    else if (age < 25) score -= 10
    
    // Location factor
    if (location === 'high-risk') score += 30
    else if (location === 'rural') score -= 10
    
    // Product factor
    const productCount = Object.values(products).filter(Boolean).length
    score += productCount * 5
    
    return Math.max(0, Math.min(100, score))
  }
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400'
    if (score < 60) return 'text-yellow-400'
    return 'text-red-400'
  }
  
  const getRiskLevel = (score: number) => {
    if (score < 30) return 'Low'
    if (score < 60) return 'Medium'
    return 'High'
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Tu información</h3>
          
          <div className="space-y-8">
            {/* Age Slider */}
            <div>
              <label className="block text-white font-medium mb-4">
                Age: {age} years
              </label>
              <Slider
                value={[age]}
                onValueChange={(value) => setAge(value[0] || 30)}
                max={80}
                min={18}
                step={1}
                className="w-full"
              />
            </div>
            
            {/* Location Selector */}
            <div>
              <label className="block text-white font-medium mb-4">
                Location
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'cdmx', name: 'CDMX', risk: 'High' },
                  { id: 'guadalajara', name: 'GDL', risk: 'Medium' },
                  { id: 'monterrey', name: 'MTY', risk: 'Medium' },
                  { id: 'puebla', name: 'PUE', risk: 'Low' },
                  { id: 'rural', name: 'Rural', risk: 'Low' },
                  { id: 'high-risk', name: 'High Riesgo', risk: 'High' }
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      location === loc.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <div>{loc.name}</div>
                    <div className="text-xs opacity-75">{loc.risk}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Selection */}
            <div>
              <label className="block text-white font-medium mb-4">
                Products de Insurance
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'health', name: 'Health', icon: Heart, color: 'green' },
                  { key: 'weather', name: 'Clima', icon: Cloud, color: 'blue' },
                  { key: 'security', name: 'Seguridad', icon: Shield, color: 'red' },
                  { key: 'mobility', name: 'Movilidad', icon: Car, color: 'amber' }
                ].map((product) => {
                  const Icon = product.icon
                  return (
                    <button
                      key={product.key}
                      onClick={() => setProducts(prev => ({
                        ...prev,
                        [product.key]: !prev[product.key as keyof typeof prev]
                      }))}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        products[product.key as keyof typeof products]
                          ? `bg-${product.color}-500/20 border-${product.color}-500/50`
                          : 'bg-white/10 hover:bg-white/20'
                      } border`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${
                        products[product.key as keyof typeof products]
                          ? `text-${product.color}-400`
                          : 'text-gray-400'
                      }`} />
                      <div className="text-white font-medium">{product.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Premium Card */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur border border-purple-500/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Tu Cotización</h3>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white mb-2" suppressHydrationWarning>
                {isMounted ? `$${calculatedPremium}` : '$0'}
              </div>
              <div className="text-gray-300">MXN per month</div>
            </div>
            
            <div className="border-t border-white/20 pt-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-white/80">Coverage total</span>
                  <div className="text-white font-bold text-lg" suppressHydrationWarning>
                    {isMounted ? `$${calculatedCoverage.toLocaleString()} MXN` : '$0 MXN'}
                  </div>
                </div>
                <div>
                  <span className="text-white/80">Deductible</span>
                  <div className="text-white font-bold text-lg">$0 MXN</div>
                </div>
                <div>
                  <span className="text-white/80">Tiempo de pago</span>
                  <div className="text-white font-bold text-lg">1 segundo</div>
                </div>
                <div>
                  <span className="text-white/80">Nivel de riesgo</span>
                  <div className={`font-bold text-lg ${getRiskColor(riskScore)}`} suppressHydrationWarning>
                    {isMounted ? getRiskLevel(riskScore) : 'Low'}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl mt-6 hover:bg-gray-100 transition-colors"
            >
              Contratar por WhatsApp
            </motion.button>
          </div>
          
          {/* Risk Score Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold text-lg">Puntuación de Riesgo</h4>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Riesgo</span>
                <span suppressHydrationWarning>
                  {isMounted ? `${riskScore}/100` : '0/100'}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-3 rounded-full ${
                    riskScore < 30 ? 'bg-green-400' :
                    riskScore < 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-300" suppressHydrationWarning>
              {isMounted && riskScore < 30 && "¡Excellent! Tu perfil de riesgo es muy bajo."}
              {isMounted && riskScore >= 30 && riskScore < 60 && "Tu perfil de riesgo es moderado."}
              {isMounted && riskScore >= 60 && "Tu perfil de riesgo es alto, pero te protegemos igual."}
              {!isMounted && "Calculando tu perfil de riesgo..."}
            </div>
          </div>
          
          {/* Savings Card */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h4 className="text-white font-bold text-lg">Ahorro vs Insurances Tradicionales</h4>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Insurance tradicional</span>
                <span className="text-white" suppressHydrationWarning>
                  {isMounted ? `$${Math.round(calculatedPremium * 3)} MXN/month` : '$0 MXN/month'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">MicroInsurance</span>
                <span className="text-green-400 font-bold" suppressHydrationWarning>
                  {isMounted ? `$${calculatedPremium} MXN/month` : '$0 MXN/month'}
                </span>
              </div>
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-green-400 font-bold">Ahorro mensual</span>
                  <span className="text-green-400 font-bold" suppressHydrationWarning>
                    {isMounted ? `$${Math.round(calculatedPremium * 2)} MXN` : '$0 MXN'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
