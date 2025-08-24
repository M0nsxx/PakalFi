'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Shield, TrendingUp, Zap } from 'lucide-react'
import { getContracts } from '@/config/contracts'

export function PremiumCalculator() {
  const [formData, setFormData] = useState({
    age: 30,
    location: 'cdmx',
    insuranceType: 'health',
    coverage: 25000,
    duration: 12,
    occupation: 'employee'
  })
  
  const [premium, setPremium] = useState(0)
  const [loading, setLoading] = useState(false)
  const [contracts, setContracts] = useState<any>(null)

  useEffect(() => {
    // Get deployed contracts
    const deployedContracts = getContracts(10143) // Monad testnet
    setContracts(deployedContracts)
    
    calculatePremium()
  }, [formData])

  const calculatePremium = async () => {
    try {
      setLoading(true)
      
      // Calculate premium using insurance pool contract
      if (contracts?.insurancePool) {
        const response = await fetch('/api/premium/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            insurancePool: contracts.insurancePool,
            oracle: contracts.oracle
          })
        })

        if (response.ok) {
          const data = await response.json()
          setPremium(data.premium)
        }
      }
    } catch (error) {
      console.error('Error calculating premium:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!contracts) return
    
    try {
      // Create policy using deployed contracts
      const response = await fetch('/api/policies/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          premium,
          contracts: {
            insurancePool: contracts.insurancePool,
            policyNFT: contracts.policyNFT,
            oracle: contracts.oracle
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Policy created:', result)
        // Handle success
      }
    } catch (error) {
      console.error('Error creating policy:', error)
    }
  }

  const insuranceTypes = [
    {
      id: 'health',
      name: 'Micro-Health',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      basePrice: 5,
      description: 'Medical coverage and emergencies'
    },
    {
      id: 'climate',
      name: 'Micro-Climate',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      basePrice: 3,
      description: 'Weather and crop protection'
    },
    {
      id: 'security',
      name: 'Micro-Security',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-orange-600',
      basePrice: 4,
      description: 'Personal safety and theft'
    },
    {
      id: 'mobility',
      name: 'Micro-Mobility',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-600',
      basePrice: 6,
      description: 'Transportation and accidents'
    }
  ]

  const regions = [
    { value: 'latam', label: 'Latin America', risk: 1.0 },
    { value: 'africa', label: 'Africa', risk: 1.2 },
    { value: 'asia', label: 'Southeast Asia', risk: 1.1 }
  ]

  const locations = [
    { value: 'CDMX', label: 'Mexico City', risk: 1.2, region: 'latam' },
    { value: 'GDL', label: 'Guadalajara', risk: 1.0, region: 'latam' },
    { value: 'MTY', label: 'Monterrey', risk: 1.1, region: 'latam' },
    { value: 'PUE', label: 'Puebla', risk: 0.9, region: 'latam' },
    { value: 'QRO', label: 'Querétaro', risk: 0.8, region: 'latam' },
    { value: 'LAG', label: 'Lagos', risk: 1.3, region: 'africa' },
    { value: 'NAI', label: 'Nairobi', risk: 1.1, region: 'africa' },
    { value: 'JHB', label: 'Johannesburg', risk: 1.0, region: 'africa' },
    { value: 'ACC', label: 'Accra', risk: 0.9, region: 'africa' },
    { value: 'CAI', label: 'Cairo', risk: 1.2, region: 'africa' },
    { value: 'JKT', label: 'Jakarta', risk: 1.1, region: 'asia' },
    { value: 'MNL', label: 'Manila', risk: 1.0, region: 'asia' },
    { value: 'HCM', label: 'Ho Chi Minh', risk: 0.9, region: 'asia' },
    { value: 'MUM', label: 'Mumbai', risk: 1.2, region: 'asia' },
    { value: 'DHA', label: 'Dhaka', risk: 1.1, region: 'asia' }
  ]

  const occupations = [
    { value: 'employee', label: 'Employee', risk: 1.0 },
    { value: 'student', label: 'Student', risk: 0.8 },
    { value: 'driver', label: 'Driver/Delivery', risk: 1.3 },
    { value: 'farmer', label: 'Farmer', risk: 1.4 },
    { value: 'business', label: 'Business Owner', risk: 1.1 },
    { value: 'informal', label: 'Informal Worker', risk: 1.2 }
  ]

  const filteredLocations = locations.filter(l => l.region === formData.location)

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

          {/* Region Selection */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Region</label>
            <div className="grid grid-cols-3 gap-3">
              {regions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      location: region.value
                    }))
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.location === region.value
                      ? 'border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-opacity-20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* <Globe className="w-6 h-6" /> */}
                    <div className="text-left">
                      <div className="font-semibold text-white">{region.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Insurance Type Selection */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Insurance Type</label>
            <div className="grid grid-cols-2 gap-3">
              {insuranceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, insuranceType: type.id as any }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.insuranceType === type.id
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
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-white font-semibold mt-2">{formData.age} years</div>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Family Size</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'year' : 'years'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  {filteredLocations.map(location => (
                    <option key={location.value} value={location.value}>{location.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Occupation</label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
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
                  min="1000"
                  max="50000"
                  step="1000"
                  value={formData.coverage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverage: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-white font-semibold mt-2">
                  ${formData.coverage.toLocaleString()} USD
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculatePremium}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
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
          {premium > 0 ? (
            <>
              {/* Premium Results */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  Your Premium
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-1">${premium}</div>
                    <div className="text-gray-400">Monthly</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">${premium * formData.duration}</div>
                    <div className="text-gray-400">Total for {formData.duration} years</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gray-800/50 rounded-xl mb-6">
                  <div className="text-lg font-semibold text-white mb-1">Coverage Amount</div>
                  <div className="text-2xl font-bold text-green-400">${formData.coverage.toLocaleString()} USD</div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  Get This Coverage
                </motion.button>
              </div>

              {/* Features */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {/* Features are now fetched from contracts or calculated */}
                  {/* For now, we'll show a placeholder or remove if not needed */}
                  <li className="flex items-center gap-3 text-gray-300">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Medical consultations, emergencies, and hospital stays</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Zap className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Weather event detection and crop damage protection</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Personal safety, theft protection, and legal assistance</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Transportation and accidents coverage</span>
                  </li>
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
