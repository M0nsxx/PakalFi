'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  DollarSign, 
  Users, 
  Calendar,
  MapPin,
  BarChart3,
  PieChart,
  Target,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
  Heart,
  CloudRain,
  Car,
  Zap,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function CalculadoraPage() {
  const [selectedProduct, setSelectedProduct] = useState('salud')
  const [age, setAge] = useState(30)
  const [location, setLocation] = useState('CDMX')
  const [coverage, setCoverage] = useState(50000)
  const [frequency, setFrequency] = useState('monthly')

  const products = [
    { id: 'salud', name: 'Micro-Health', icon: <Shield className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { id: 'clima', name: 'Micro-Climate', icon: <Shield className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'seguridad', name: 'Micro-Security', icon: <Shield className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { id: 'movilidad', name: 'Micro-Mobility', icon: <Shield className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
  ]

  const locations = [
    { value: 'CDMX', label: 'Ciudad de México', risk: 'High' },
    { value: 'Guadalajara', label: 'Guadalajara', risk: 'Medium' },
    { value: 'Monterrey', label: 'Monterrey', risk: 'Medium' },
    { value: 'Puebla', label: 'Puebla', risk: 'Low' },
    { value: 'Querétaro', label: 'Querétaro', risk: 'Low' }
  ]

  const calculatePremium = () => {
    let basePremium = 0
    
    // Base premium by product
    switch(selectedProduct) {
      case 'salud':
        basePremium = 25 + (age * 0.5)
        break
      case 'clima':
        basePremium = 15 + (coverage * 0.001)
        break
      case 'seguridad':
        basePremium = 20 + (coverage * 0.0008)
        break
      case 'movilidad':
        basePremium = 30 + (age * 0.3)
        break
    }

    // Location risk factor
    const locationRisk = locations.find(l => l.value === location)?.risk
    const riskMultiplier = locationRisk === 'High' ? 1.3 : locationRisk === 'Medium' ? 1.1 : 0.9

    // Coverage factor
    const coverageFactor = coverage / 10000

    let finalPremium = basePremium * riskMultiplier * coverageFactor

    // Frequency discount
    if (frequency === 'yearly') {
      finalPremium *= 0.9 // 10% discount for yearly payment
    }

    return Math.round(finalPremium)
  }

  const premium = calculatePremium()
  const yearlyPremium = frequency === 'monthly' ? premium * 12 : premium
  const monthlyPremium = frequency === 'yearly' ? premium / 12 : premium

  const savings = {
    monthly: yearlyPremium,
    yearly: yearlyPremium * 0.9
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
              Insurance Calculator
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Calculate your insurance premium in seconds. Get personalized quotes 
              based on your needs and location.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Health</h3>
              <p className="text-gray-300 text-sm">Medical coverage</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
              <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Climate</h3>
              <p className="text-gray-300 text-sm">Weather protection</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Security</h3>
              <p className="text-gray-300 text-sm">Theft protection</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-6 text-center">
              <Car className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Mobility</h3>
              <p className="text-gray-300 text-sm">Vehicle coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur border border-gray-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Your Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Insurance Type</label>
                  <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                    <option value="">Select insurance type</option>
                    <option value="health">Health Insurance</option>
                    <option value="climate">Climate Insurance</option>
                    <option value="security">Security Insurance</option>
                    <option value="mobility">Mobility Insurance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Age</label>
                  <input 
                    type="number" 
                    placeholder="Enter your age"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Location</label>
                  <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                    <option value="">Select your state</option>
                    <option value="cdmx">Mexico City</option>
                    <option value="jalisco">Jalisco</option>
                    <option value="nuevo-leon">Nuevo León</option>
                    <option value="veracruz">Veracruz</option>
                    <option value="puebla">Puebla</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Coverage Level</label>
                  <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                    <option value="">Select coverage level</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  Calculate Premium
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Your Quote</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">$8</div>
                  <div className="text-gray-300">per month</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Base Premium</span>
                    <span className="text-white font-semibold">$5.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Location Factor</span>
                    <span className="text-white font-semibold">+$1.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Age Factor</span>
                    <span className="text-white font-semibold">+$1.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Coverage Level</span>
                    <span className="text-white font-semibold">+$0.50</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Monthly</span>
                      <span className="text-green-400 font-bold text-xl">$8.00</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Get This Plan
                </button>
                
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    * This is an estimate. Final premium may vary based on additional factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            <h2 className="text-4xl font-bold text-white mb-4">Calculator Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Advanced tools to help you make the best decision about your micro-insurance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-xl mb-6">
                <BarChart3 className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Comparison</div>
                <div className="text-blue-100">Real Time</div>
              </div>
              <p className="text-gray-300">Compare different plans and coverages instantly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl mb-6">
                <PieChart className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Analysis</div>
                <div className="text-purple-100">Detailed</div>
              </div>
              <p className="text-gray-300">Complete analysis of costs and benefits</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl mb-6">
                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Customization</div>
                <div className="text-orange-100">Total</div>
              </div>
              <p className="text-gray-300">Adjust all parameters to your needs</p>
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
              Why Use Our Calculator?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get accurate quotes in seconds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur border border-green-500/20 rounded-2xl p-6">
              <Zap className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
              <p className="text-gray-300 text-sm">
                Get your quote in seconds. No waiting or phone calls required.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur border border-blue-500/20 rounded-2xl p-6">
              <Calculator className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Accurate Pricing</h3>
              <p className="text-gray-300 text-sm">
                Our algorithm considers all relevant factors for precise quotes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur border border-purple-500/20 rounded-2xl p-6">
              <Shield className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Transparent</h3>
              <p className="text-gray-300 text-sm">
                See exactly how your premium is calculated. No hidden fees.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur border border-orange-500/20 rounded-2xl p-6">
              <Smartphone className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Easy to Use</h3>
              <p className="text-gray-300 text-sm">
                Simple interface that works on any device. No registration required.
              </p>
            </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Calculate your premium and get protected today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                View All Products
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
