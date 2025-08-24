'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  MapPin,
  Calendar,
  Users,
  Star,
  Calculator,
  MessageCircle,
  TrendingUp,
  Award,
  Zap,
  Heart,
  Building,
  Car,
  Smartphone,
  Home
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

const securityTypes = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Home Burglary',
    description: 'Protection against violent and non-violent robbery',
    coverage: 'Up to 50,000 MXN'
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: 'Vehicle Theft',
    description: 'Total and partial vehicle coverage',
    coverage: 'Up to 200,000 MXN'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Device Theft',
    description: 'Protection for phones, laptops and tablets',
    coverage: 'Up to 15,000 MXN'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Express Kidnapping',
    description: 'Coverage for kidnapping and extortion',
    coverage: 'Up to 100,000 MXN'
  }
]

const coveragePlans = [
  {
    name: 'Basic',
    price: 20,
    coverage: '25,000 MXN',
    types: ['Home Burglary', 'Device Theft'],
    features: [
      'Automatic payment per event',
      '24/7 coverage',
      'No deductible',
      'Legal assistance included'
    ]
  },
  {
    name: 'Family',
    price: 45,
    coverage: '75,000 MXN',
    types: ['Home Burglary', 'Vehicle Theft', 'Device Theft'],
    features: [
      'Complete family coverage',
      'Vehicle protection',
      'Medical assistance',
      'Emergency service'
    ]
  },
  {
    name: 'Premium',
    price: 80,
    coverage: '150,000 MXN',
    types: ['All types', 'Express Kidnapping'],
    features: [
      'Maximum coverage',
      'Kidnapping protection',
      'VIP service',
      'Private investigation'
    ]
  }
]

const testimonials = [
  {
    name: 'Patricia Méndez',
    location: 'Monterrey',
    rating: 5,
    text: 'When my house was robbed, the payment arrived in less than 24 hours. It helped me recover quickly.',
    event: 'Home Burglary'
  },
  {
    name: 'Fernando Ruiz',
    location: 'Guadalajara',
    rating: 5,
    text: 'They stole my car and the insurance paid the full value. Excellent service.',
    event: 'Vehicle Theft'
  },
  {
    name: 'Laura Sánchez',
    location: 'Mexico City',
    rating: 5,
    text: 'The device coverage saved me when they stole my laptop. Highly recommended.',
    event: 'Device Theft'
  }
]

export default function SeguridadPage() {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [selectedZone, setSelectedZone] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => setIsCalculating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="w-8 h-8 text-red-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
                Micro-Security
              </h1>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
                Protect your personal belongings and property from theft, damage, and accidents. 
                Comprehensive coverage for peace of mind.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-red-400/50">
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Types */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Protection Types
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive coverage against the most common crimes in Mexico
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-300 mb-3">
                  {type.description}
                </p>
                <div className="text-red-400 font-semibold">
                  {type.coverage}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Intelligent system that automatically detects and responds to security events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">1. Intelligent Monitoring</h3>
              <p className="text-gray-300">
                Alert and notification system that detects security events in real-time
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">2. Automatic Activation</h3>
              <p className="text-gray-300">
                When the event is confirmed, the smart contract automatically executes the payment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Immediate Compensation</h3>
              <p className="text-gray-300">
                Receive your payment in seconds, without bureaucratic procedures or waiting
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Plans */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Protection Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the protection that best fits your security needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coveragePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 ${
                  selectedPlan === index 
                    ? 'border-red-400 shadow-lg shadow-red-400/25' 
                    : 'border-white/10 hover:border-red-400/30'
                } transition-all cursor-pointer`}
                onClick={() => setSelectedPlan(index)}
              >
                {selectedPlan === index && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <CheckCircle className="w-6 h-6 text-red-400" />
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-red-400 mb-1">
                    ${plan.price}
                    <span className="text-lg text-gray-300">/month</span>
                  </div>
                  <div className="text-lg text-gray-300">
                    Coverage up to {plan.coverage}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Included Protection:</h4>
                  <div className="space-y-2">
                    {plan.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all">
                  Get Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Calculator
              </h2>
              <p className="text-xl text-gray-300">
                Calculate your premium based on your zone and risk level
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Risk Zone</label>
                    <select 
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none"
                    >
                      <option value="">Select your zone</option>
                      <option value="baja">Low (Residential areas)</option>
                      <option value="media">Medium (Mixed areas)</option>
                      <option value="alta">High (Urban centers)</option>
                      <option value="muy-alta">Very High (Conflict areas)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Plan</label>
                    <select className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                      <option>Basic</option>
                      <option>Family</option>
                      <option>Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Property Type</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-red-400" defaultChecked />
                        <span className="text-gray-300">House</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-red-400" />
                        <span className="text-gray-300">Apartment</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-red-400" />
                        <span className="text-gray-300">Business</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50"
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Calculator className="w-5 h-5" />
                        <span>Calculate Premium</span>
                      </div>
                    )}
                  </button>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Result</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Premium:</span>
                      <span className="text-red-400 font-semibold">$45 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Coverage:</span>
                      <span className="text-white font-semibold">75,000 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Risk Level:</span>
                      <span className="text-yellow-400 font-semibold">Medium</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Savings vs Traditional Insurance:</span>
                      <span className="text-red-400 font-semibold">65%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Experiences
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Customers who have received automatic payments for security events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-red-400 text-sm font-semibold">
                    {testimonial.event}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to protect yourself?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of families who already trust Micro-Security for their protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-red-400/50">
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
