'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Cloud, 
  CloudRain, 
  Wind, 
  Sun, 
  Zap, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  AlertTriangle,
  Star,
  Calculator,
  MessageCircle,
  TrendingUp,
  Award,
  Globe,
  Satellite,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

const weatherEvents = [
  {
    icon: <CloudRain className="w-6 h-6" />,
    title: 'Excessive Rainfall',
    description: 'Coverage for flood damage',
    coverage: 'Up to 20,000 MXN'
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: 'Strong Winds',
    description: 'Coverage for wind damage',
    coverage: 'Up to 25,000 MXN'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Hail',
    description: 'Coverage for hail damage to vehicles and properties',
    coverage: 'Up to 15,000 MXN'
  },
  {
    icon: <Thermometer className="w-6 h-6" />,
    title: 'Drought',
    description: 'Indemnization for agricultural losses',
    coverage: 'Up to 30,000 MXN'
  }
]

const coveragePlans = [
  {
    name: 'Basic',
    price: 15,
    coverage: '10,000 MXN',
    events: ['Excessive Rainfall', 'Strong Winds'],
    features: [
      'Automatic payment per event',
      '24/7 coverage',
      'No deductible',
      'Real-time notifications'
    ]
  },
  {
    name: 'Complete',
    price: 35,
    coverage: '25,000 MXN',
    events: ['Excessive Rainfall', 'Strong Winds', 'Granizo', 'Drought'],
    features: [
      'All weather events',
      'Family coverage',
      'Technical assistance',
      'Included assessment'
    ]
  },
  {
    name: 'Premium',
    price: 60,
    coverage: '50,000 MXN',
    events: ['All events', 'Multiple events'],
    features: [
      'Maximum coverage',
      'Business protection',
      'Priority service',
      'Included reconstruction'
    ]
  }
]

const testimonials = [
  {
    name: 'Roberto Silva',
    location: 'Veracruz',
    rating: 5,
    text: 'When the hurricane damaged my house, I received the payment automatically. Incredible service.',
    event: 'Hurricane'
  },
  {
    name: 'Carmen López',
    location: 'Sinaloa',
    rating: 5,
    text: 'The drought affected my harvest, but the insurance helped me recover quickly.',
    event: 'Drought'
  },
  {
    name: 'Miguel Torres',
    location: 'Jalisco',
    rating: 5,
    text: 'The hail damaged my car, but the payment arrived in less than 2 hours. Excellent.',
    event: 'Hail'
  }
]

export default function ClimaPage() {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => setIsCalculating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Cloud className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
                Micro-Climate
              </h1>
            </div>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Protect your crops and livelihood from extreme weather events. 
              Automatic payments when climate conditions are detected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-blue-400/50">
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weather Events */}
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
              Covered Weather Events
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Automatic protection against the most common weather events in Mexico
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
              <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Excessive Rainfall</h3>
              <p className="text-gray-300 text-sm">Coverage for flood damage</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-6 text-center">
              <Sun className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Drought</h3>
              <p className="text-gray-300 text-sm">Protection for dry periods</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur border border-red-500/30 rounded-2xl p-6 text-center">
              <Wind className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Strong Winds</h3>
              <p className="text-gray-300 text-sm">Coverage for wind damage</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {weatherEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {event.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-3">
                  {event.description}
                </p>
                <div className="text-blue-400 font-semibold">
                  {event.coverage}
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
            className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our technology automatically detects weather events and makes payments
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Satellite className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Weather Monitoring</h3>
              <p className="text-gray-300">
                We use satellite data and weather stations to monitor conditions in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automatic Detection</h3>
              <p className="text-gray-300">
                When weather conditions exceed thresholds, our system automatically triggers payments.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Payment</h3>
              <p className="text-gray-300">
                Payments are made within 24 hours directly to your account, no paperwork required.
              </p>
            </div>
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
            className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Coverage Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the protection level that fits your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur border border-gray-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $5<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  $1,000 per weather event
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Rainfall > 50mm in 24h
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Drought > 30 days
                </li>
              </ul>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Choose Basic
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Standard</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $10<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  $2,500 per weather event
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Rainfall > 30mm in 24h
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Drought > 20 days
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Wind > 60 km/h
                </li>
              </ul>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Choose Standard
              </button>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $20<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  $5,000 per weather event
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Rainfall > 20mm in 24h
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Drought > 15 days
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Wind > 40 km/h
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Multiple events per month
                </li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Choose Premium
              </button>
            </div>
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
                Calculate your premium based on your location and climate risk
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
                    <label className="block text-white font-semibold mb-2">Location</label>
                    <select 
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Select your state</option>
                      <option value="veracruz">Veracruz</option>
                      <option value="sinaloa">Sinaloa</option>
                      <option value="jalisco">Jalisco</option>
                      <option value="quintana-roo">Quintana Roo</option>
                      <option value="baja-california">Baja California</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Plan</label>
                    <select className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none">
                      <option>Basic</option>
                      <option>Complete</option>
                      <option>Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Property Type</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-blue-400" />
                        <span className="text-gray-300">Residential</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-blue-400" />
                        <span className="text-gray-300">Business</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="property" className="text-blue-400" defaultChecked />
                        <span className="text-gray-300">Agricultural</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50"
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
                      <span className="text-blue-400 font-semibold">$35 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Coverage:</span>
                      <span className="text-white font-semibold">25,000 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Climate Risk:</span>
                      <span className="text-yellow-400 font-semibold">Medium</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Savings vs Traditional Insurance:</span>
                      <span className="text-blue-400 font-semibold">70%</span>
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
              Customers who have received automatic payments for weather events
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
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-blue-400 text-sm font-semibold">
                    {testimonial.event}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to protect yourself from the weather?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who already trust Micro-Climate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-blue-400/50">
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
