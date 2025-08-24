'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Car, 
  Bus, 
  Train, 
  Plane, 
  Bike, 
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
  Navigation,
  Route,
  Package,
  User,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

const mobilityTypes = [
  {
    icon: <Car className="w-6 h-6" />,
    title: 'Traffic Accidents',
    description: 'Coverage for automobile accidents and third-party damages',
    coverage: 'Up to 100,000 MXN'
  },
  {
    icon: <Bus className="w-6 h-6" />,
    title: 'Public Transport',
    description: 'Protection on bus, metro, taxi and collective transport',
    coverage: 'Up to 25,000 MXN'
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: 'National Travel',
    description: 'Coverage for domestic flights and road trips',
    coverage: 'Up to 50,000 MXN'
  },
  {
    icon: <Bike className="w-6 h-6" />,
    title: 'Urban Mobility',
    description: 'Protection for bicycles, scooters and personal transport',
    coverage: 'Up to 15,000 MXN'
  }
]

const coveragePlans = [
  {
    name: 'Basic',
    price: 12,
    coverage: '30,000 MXN',
    types: ['Traffic Accidents', 'Public Transport'],
    features: [
      'Automatic payment per event',
      '24/7 coverage',
      'No deductible',
      'Roadside assistance included'
    ]
  },
  {
    name: 'Complete',
    price: 28,
    coverage: '75,000 MXN',
    types: ['Traffic Accidents', 'Public Transport', 'National Travel'],
    features: [
      'Family coverage',
      'Travel protection',
      'Medical assistance',
      'Emergency transfer'
    ]
  },
  {
    name: 'Premium',
    price: 55,
    coverage: '150,000 MXN',
    types: ['All types', 'Urban Mobility'],
    features: [
      'Maximum coverage',
      'Comprehensive protection',
      'VIP service',
      'Repatriation included'
    ]
  }
]

const testimonials = [
  {
    name: 'Diego Morales',
    location: 'Puebla',
    rating: 5,
    text: 'I had an accident on the highway and the payment arrived automatically. It helped me a lot.',
    event: 'Traffic Accident'
  },
  {
    name: 'Sofia Ramírez',
    location: 'Querétaro',
    rating: 5,
    text: 'I was robbed on the metro, but the insurance covered me immediately. Excellent service.',
    event: 'Transport Theft'
  },
  {
    name: 'Luis Torres',
    location: 'Mérida',
    rating: 5,
    text: 'My flight was cancelled and I received the compensation in minutes. Highly recommended.',
    event: 'Flight Cancellation'
  }
]

export default function MovilidadPage() {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [selectedFrequency, setSelectedFrequency] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => setIsCalculating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Navigation className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
                Micro-Mobility
              </h1>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
                Protect yourself and your vehicle from accidents and damage. 
                Comprehensive coverage for drivers, motorcyclists, and delivery workers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-indigo-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-indigo-400/50">
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobility Types */}
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
              Comprehensive coverage for all your transportation methods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mobilityTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                <div className="text-indigo-400 font-semibold">
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
              Intelligent system that automatically protects all your movements
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
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Route className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">1. Automatic Activation</h3>
              <p className="text-gray-300">
                Insurance automatically activates when you start any movement
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">2. Intelligent Detection</h3>
              <p className="text-gray-300">
                The system automatically detects when a covered event occurs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Immediate Payment</h3>
              <p className="text-gray-300">
                Receive your compensation in seconds, without procedures or waiting
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
              Coverage Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the protection that best fits your mobile lifestyle
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
                    ? 'border-indigo-400 shadow-lg shadow-indigo-400/25' 
                    : 'border-white/10 hover:border-indigo-400/30'
                } transition-all cursor-pointer`}
                onClick={() => setSelectedPlan(index)}
              >
                {selectedPlan === index && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <CheckCircle className="w-6 h-6 text-indigo-400" />
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-indigo-400 mb-1">
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
                        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
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
                Calculate your premium based on your travel frequency and transportation methods
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
                    <label className="block text-white font-semibold mb-2">Travel Frequency</label>
                    <select 
                      value={selectedFrequency}
                      onChange={(e) => setSelectedFrequency(e.target.value)}
                      className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
                    >
                      <option value="">Select your frequency</option>
                      <option value="ocasional">Occasional (1-2 times per week)</option>
                      <option value="regular">Regular (3-5 times per week)</option>
                      <option value="frecuente">Frequent (Daily)</option>
                      <option value="intenso">Intense (Multiple trips daily)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Plan</label>
                    <select className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-400 focus:outline-none">
                      <option>Basic</option>
                      <option>Complete</option>
                      <option>Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Transportation Methods</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="text-indigo-400" defaultChecked />
                        <span className="text-gray-300">Automobile</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="text-indigo-400" defaultChecked />
                        <span className="text-gray-300">Public Transport</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="text-indigo-400" />
                        <span className="text-gray-300">Airplane</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="text-indigo-400" />
                        <span className="text-gray-300">Bicycle/Scooter</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50"
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
                      <span className="text-indigo-400 font-semibold">$28 MXN</span>
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
                      <span className="text-indigo-400 font-semibold">75%</span>
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
              Customers who have received automatic payments for mobility events
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
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-indigo-400 text-sm font-semibold">
                    {testimonial.event}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to move safely?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of people who already trust Micro-Mobility for their protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-indigo-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-indigo-400/50">
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
