'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Heart, 
  Activity, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Calculator,
  FileText,
  MessageCircle,
  Phone,
  ChevronRight,
  Calendar,
  MapPin,
  Zap,
  Award,
  Stethoscope,
  Pill,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Automatic Payment',
    description: 'Receive your compensation automatically when contract conditions are met'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'No Waiting',
    description: 'No paperwork or bureaucratic procedures. Everything is processed in seconds'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '100% Transparent',
    description: 'All conditions are in the smart contract. No fine print'
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'From $2 USD',
    description: 'Affordable coverage for everyone. No income requirements'
  }
]

const coverageOptions = [
  {
    name: 'Basic',
    price: 2,
    coverage: '5,000 MXN',
    features: [
      'Accident hospitalization',
      'Emergency medical consultation',
      'Basic medications',
      '24/7 coverage'
    ]
  },
  {
    name: 'Standard',
    price: 5,
    coverage: '15,000 MXN',
    features: [
      'Everything from Basic plan',
      'Outpatient surgery',
      'Laboratory tests',
      'X-rays',
      'Family coverage'
    ]
  },
  {
    name: 'Premium',
    price: 10,
    coverage: '35,000 MXN',
    features: [
      'Everything from Standard plan',
      'Major surgery',
      'Intensive care',
      'Ambulance transport',
      'Basic dental coverage',
      'Second medical opinion'
    ]
  }
]

const testimonials = [
  {
    name: 'María González',
    location: 'Mexico City',
    rating: 5,
    text: 'Incredible experience. When I had a minor accident, I received my payment in less than 24 hours. No complications.',
    avatar: '/avatars/maria.jpg'
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Guadalajara',
    rating: 5,
    text: 'The transparency of the smart contract gave me a lot of confidence. I knew exactly what was covered.',
    avatar: '/avatars/carlos.jpg'
  },
  {
    name: 'Ana Martínez',
    location: 'Monterrey',
    rating: 5,
    text: 'Perfect for my family. Affordable coverage and automatic payments. I totally recommend it.',
    avatar: '/avatars/ana.jpg'
  }
]

export default function HealthPage() {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    setIsCalculating(true)
    // Simular cálculo
    setTimeout(() => setIsCalculating(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="w-8 h-8 text-green-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
                Micro-Health
              </h1>
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
                Affordable health coverage for Mexican families. From $2 USD per month, 
                get comprehensive protection for you and your loved ones.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-green-400/50">
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why choose Micro-Health?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We revolutionize medical insurance with blockchain technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Hospital Coverage</h3>
              <p className="text-gray-300 text-sm">$500 daily for hospitalization</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
              <Stethoscope className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Telemedicine</h3>
              <p className="text-gray-300 text-sm">24/7 medical consultations</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center">
              <Pill className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Medications</h3>
              <p className="text-gray-300 text-sm">Coverage for prescription drugs</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Plans */}
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
              Coverage Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coverageOptions.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 ${
                  selectedPlan === index 
                    ? 'border-green-400 shadow-lg shadow-green-400/25' 
                    : 'border-white/10 hover:border-green-400/30'
                } transition-all cursor-pointer`}
                onClick={() => setSelectedPlan(index)}
              >
                {selectedPlan === index && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-green-400 mb-1">
                    ${plan.price}
                    <span className="text-lg text-gray-300">/month</span>
                  </div>
                  <div className="text-lg text-gray-300">
                    Coverage up to {plan.coverage}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                  Get Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gray-900/50">
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
                Calculate your personalized premium in seconds
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
                    <label className="block text-white font-semibold mb-2">Age</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-green-400 focus:outline-none"
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Plan</label>
                    <select className="w-full bg-gray-700 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-green-400 focus:outline-none">
                      <option>Basic</option>
                      <option>Standard</option>
                      <option>Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Family Coverage</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="family" className="text-green-400" />
                        <span className="text-gray-300">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="family" className="text-green-400" defaultChecked />
                        <span className="text-gray-300">No</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50"
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
                      <span className="text-green-400 font-semibold">$5 USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Coverage:</span>
                      <span className="text-white font-semibold">15,000 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Deductible:</span>
                      <span className="text-white font-semibold">$0 USD</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Savings vs Traditional Insurance:</span>
                      <span className="text-green-400 font-semibold">60%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What our customers say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Over 10,000 families trust Micro-Health
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
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to protect your health?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of families who already trust Micro-Health for their medical protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WalletButton className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all" />
              <button className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors py-4 px-6 rounded-full border border-white/20 hover:border-green-400/50">
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
