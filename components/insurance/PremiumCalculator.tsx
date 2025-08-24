'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Shield, 
  Heart, 
  Cloud, 
  Car, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Users,
  MapPin,
  Calendar
} from 'lucide-react'

interface CalculatorForm {
  insuranceType: 'health' | 'climate' | 'security' | 'mobility'
  age: number
  location: string
  coverage: number
  familySize: number
  occupation: string
}

interface PremiumResult {
  monthly: number
  yearly: number
  savings: number
  coverage: string
  features: string[]
}

export function PremiumCalculator() {
  const [form, setForm] = useState<CalculatorForm>({
    insuranceType: 'health',
    age: 25,
    location: 'CDMX',
    coverage: 50000,
    familySize: 1,
    occupation: 'employee'
  })

  const [result, setResult] = useState<PremiumResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const insuranceTypes = [
    {
      id: 'health',
      name: 'Micro-Health',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      basePrice: 50,
      description: 'Medical coverage and emergencies'
    },
    {
      id: 'climate',
      name: 'Micro-Climate',
      icon: <Cloud className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      basePrice: 30,
      description: 'Weather and crop protection'
    },
    {
      id: 'security',
      name: 'Micro-Security',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-orange-600',
      basePrice: 40,
      description: 'Personal safety and theft'
    },
    {
      id: 'mobility',
      name: 'Micro-Mobility',
      icon: <Car className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-600',
      basePrice: 60,
      description: 'Transportation and accidents'
    }
  ]

  const locations = [
    { value: 'CDMX', label: 'Mexico City', risk: 1.2 },
    { value: 'GDL', label: 'Guadalajara', risk: 1.0 },
    { value: 'MTY', label: 'Monterrey', risk: 1.1 },
    { value: 'PUE', label: 'Puebla', risk: 0.9 },
    { value: 'QRO', label: 'Querétaro', risk: 0.8 }
  ]

  const occupations = [
    { value: 'employee', label: 'Employee', risk: 1.0 },
    { value: 'student', label: 'Student', risk: 0.8 },
    { value: 'driver', label: 'Driver/Delivery', risk: 1.3 },
    { value: 'farmer', label: 'Farmer', risk: 1.4 },
    { value: 'business', label: 'Business Owner', risk: 1.1 }
  ]

  const calculatePremium = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      const selectedType = insuranceTypes.find(t => t.id === form.insuranceType)!
      const selectedLocation = locations.find(l => l.value === form.location)!
      const selectedOccupation = occupations.find(o => o.value === form.occupation)!
      
      // Base calculation
      let basePremium = selectedType.basePrice
      
      // Age factor
      const ageFactor = form.age < 25 ? 1.2 : form.age > 60 ? 1.5 : 1.0
      
      // Coverage factor
      const coverageFactor = form.coverage / 50000
      
      // Family discount
      const familyDiscount = form.familySize > 1 ? 0.9 : 1.0
      
      // Calculate final premium
      const monthlyPremium = Math.round(
        basePremium * 
        ageFactor * 
        selectedLocation.risk * 
        selectedOccupation.risk * 
        coverageFactor * 
        familyDiscount
      )
      
      const yearlyPremium = monthlyPremium * 12
      const yearlySavings = Math.round(yearlyPremium * 0.1) // 10% discount for yearly
      
      const features = getFeatures(form.insuranceType)
      
      setResult({
        monthly: monthlyPremium,
        yearly: yearlyPremium - yearlySavings,
        savings: yearlySavings,
        coverage: `$${form.coverage.toLocaleString()} MXN`,
        features
      })
      
      setIsCalculating(false)
    }, 1500)
  }

  const getFeatures = (type: string): string[] => {
    const featureMap = {
      health: [
        'Medical consultations',
        'Emergency care',
        'Prescription coverage',
        'Hospital stays',
        'Telemedicine services'
      ],
      climate: [
        'Weather event detection',
        'Crop damage protection',
        'Automatic payouts',
        'No claims process',
        'Real-time monitoring'
      ],
      security: [
        'Personal accident coverage',
        'Theft protection',
        'Legal assistance',
        '24/7 emergency support',
        'Digital fraud protection'
      ],
      mobility: [
        'Vehicle accident coverage',
        'Driver injury protection',
        'Delivery worker coverage',
        'Roadside assistance',
        'Transportation protection'
      ]
    }
    return featureMap[type as keyof typeof featureMap] || []
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Premium Calculator</h3>
          </div>

          {/* Insurance Type Selection */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Insurance Type</label>
            <div className="grid grid-cols-2 gap-3">
              {insuranceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setForm(prev => ({ ...prev, insuranceType: type.id as any }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    form.insuranceType === type.id
                      ? `border-green-500 bg-gradient-to-r ${type.color} bg-opacity-20`
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{type.name}</div>
                      <div className="text-sm text-gray-400">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Age</label>
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={form.age}
                  onChange={(e) => setForm(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-white font-semibold mt-2">{form.age} years</div>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Family Size</label>
                <select
                  value={form.familySize}
                  onChange={(e) => setForm(prev => ({ ...prev, familySize: parseInt(e.target.value) }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <select
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  {locations.map(location => (
                    <option key={location.value} value={location.value}>{location.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Occupation</label>
                <select
                  value={form.occupation}
                  onChange={(e) => setForm(prev => ({ ...prev, occupation: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  {occupations.map(occupation => (
                    <option key={occupation.value} value={occupation.value}>{occupation.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Coverage Amount</label>
              <div className="relative">
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="10000"
                  value={form.coverage}
                  onChange={(e) => setForm(prev => ({ ...prev, coverage: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-white font-semibold mt-2">
                  ${form.coverage.toLocaleString()} MXN
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculatePremium}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Calculating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Premium
                </div>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {result ? (
            <>
              {/* Premium Results */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  Your Premium
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-1">${result.monthly}</div>
                    <div className="text-gray-400">Monthly</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">${result.yearly}</div>
                    <div className="text-gray-400">Yearly (Save ${result.savings})</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-800/50 rounded-xl mb-6">
                  <div className="text-lg font-semibold text-white mb-1">Coverage Amount</div>
                  <div className="text-2xl font-bold text-green-400">{result.coverage}</div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  Get This Coverage
                </motion.button>
              </div>

              {/* Features */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {result.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">Fill out the form and calculate your premium</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
