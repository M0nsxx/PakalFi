'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Shield, Heart, Cloud, Car, ChevronRight, Users, TrendingUp, Zap, CheckCircle, CloudRain, DollarSign, Smartphone, Globe, Award } from 'lucide-react'
import { PremiumCalculator } from '@/components/insurance/PremiumCalculator'
import { RiskAssessment } from '@/components/insurance/RiskAssessment'

export default function Landing() {
  const [isMounted, setIsMounted] = useState(false)
  const [savings, setSavings] = useState(0)
  const [activePolicies, setActivePolicies] = useState(0)
  const [claimsProcessed, setClaimsProcessed] = useState(0)
  const [satisfactionRate, setSatisfactionRate] = useState(0)
  
  useEffect(() => {
    setIsMounted(true)
    
    // Animate counters
    const interval = setInterval(() => {
      setSavings((prev: number) => prev < 5000000 ? prev + 50000 : prev)
      setActivePolicies((prev: number) => prev < 10000 ? prev + 100 : prev)
      setClaimsProcessed((prev: number) => prev < 5000 ? prev + 50 : prev)
      setSatisfactionRate((prev: number) => prev < 95 ? prev + 1 : prev)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-aztec-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <Shield className="w-20 h-20 text-green-400 mx-auto animate-pulse-slow" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              PakalFi
            </motion.h2>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 leading-tight">
              Insurance for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"> Everyone, Everywhere</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
              Democratizing access to insurance for 1.7 billion unbanked people globally. 
              Smart parametric insurance with instant payouts, starting from $0.50 USD/month.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-green-500/25 transition-all"
              >
                <Globe className="w-6 h-6" />
                Get Global Coverage
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full text-lg font-bold border border-white/20 hover:bg-white/20 transition"
              >
                View Products
                <ChevronRight className="inline ml-2" />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" suppressHydrationWarning>
                  {isMounted ? `$${(savings / 1000000).toFixed(1)}M` : '$0.0M'}
                </div>
                <div className="text-gray-400">Paid in Claims</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" suppressHydrationWarning>
                  {isMounted ? activePolicies.toLocaleString() : '0'}
                </div>
                <div className="text-gray-400">Active Policies</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" suppressHydrationWarning>
                  {isMounted ? claimsProcessed.toLocaleString() : '0'}
                </div>
                <div className="text-gray-400">Claims Processed</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" suppressHydrationWarning>
                  {isMounted ? `${satisfactionRate}%` : '0%'}
                </div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-20 w-32 h-32 hidden lg:block"
      >
        <Shield className="w-full h-full text-green-400/30" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 bottom-20 w-24 h-24 hidden lg:block"
      >
        <Heart className="w-full h-full text-red-400/30" />
      </motion.div>

      {/* Global Markets Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Global Markets We Serve
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center"
            >
              <Globe className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Latin America</h3>
              <p className="text-gray-300 mb-6">500M unbanked population across Mexico, Brazil, Colombia, Argentina, and Peru</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Mexico (65M) - Regulatory sandbox</div>
                <div>• Brazil (45M) - High crypto adoption</div>
                <div>• Colombia (20M) - Crypto-friendly regulation</div>
                <div>• Argentina (15M) - High inflation protection</div>
                <div>• Peru (12M) - Financial inclusion priority</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8 text-center"
            >
              <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Africa</h3>
              <p className="text-gray-300 mb-6">350M unbanked population with mobile money infrastructure</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Nigeria (60M) - Largest African economy</div>
                <div>• Kenya (15M) - M-Pesa ecosystem</div>
                <div>• South Africa (13M) - Fintech hub</div>
                <div>• Ghana (8M) - Progressive regulation</div>
                <div>• Egypt (25M) - Young tech-savvy population</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Southeast Asia</h3>
              <p className="text-gray-300 mb-6">225M unbanked population with high remittance flows</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Indonesia (95M) - Largest unbanked population</div>
                <div>• Philippines (45M) - High remittance adoption</div>
                <div>• Vietnam (25M) - Accelerated crypto growth</div>
                <div>• Rural India (190M) - Massive market</div>
                <div>• Bangladesh (55M) - Established microfinance</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Choose Your Protection
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Health Insurance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all"
            >
              <Heart className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Micro-Health</h3>
              <p className="text-gray-300 mb-4">Hospital, medicines, emergencies</p>
              <div className="text-3xl font-bold text-green-400 mb-2">$2-15</div>
              <div className="text-sm text-gray-400">USD/month</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Hospital coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Medicine reimbursement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Emergency care</span>
                </li>
              </ul>
            </motion.div>

            {/* Climate Insurance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400/50 transition-all"
            >
              <Cloud className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Micro-Climate</h3>
              <p className="text-gray-300 mb-4">Weather and crop protection</p>
              <div className="text-3xl font-bold text-blue-400 mb-2">$1-10</div>
              <div className="text-sm text-gray-400">USD/month</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Weather damage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Crop protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Property coverage</span>
                </li>
              </ul>
            </motion.div>

            {/* Security Insurance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur border border-red-500/30 rounded-2xl p-6 hover:border-red-400/50 transition-all"
            >
              <Shield className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Micro-Security</h3>
              <p className="text-gray-300 mb-4">Theft, assault, fraud</p>
              <div className="text-3xl font-bold text-red-400 mb-2">$1-8</div>
              <div className="text-sm text-gray-400">USD/month</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  <span>Theft protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  <span>Personal safety</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  <span>Digital fraud</span>
                </li>
              </ul>
            </motion.div>

            {/* Mobility Insurance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur border border-amber-500/30 rounded-2xl p-6 hover:border-amber-400/50 transition-all"
            >
              <Car className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Micro-Mobility</h3>
              <p className="text-gray-300 mb-4">Accidents, Uber, delivery</p>
              <div className="text-3xl font-bold text-amber-400 mb-2">$2-12</div>
              <div className="text-sm text-gray-400">USD/month</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Accident coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Transportation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span>Delivery protection</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Choose your insurance</h3>
              <p className="text-gray-400">
                Select from our range of micro-insurance products designed for your needs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pay with local methods</h3>
              <p className="text-gray-400">
                Pay your premium using local payment methods - cash, mobile money, or crypto
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Receive automatic payments</h3>
              <p className="text-gray-400">
                Get paid automatically when triggers are met - no paperwork required
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Calculate Your Premium
          </motion.h2>

          <PremiumCalculator />
        </div>
      </section>

      {/* Risk Assessment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Risk Assessment
          </motion.h2>

          <RiskAssessment />
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          {/* <CommunityStats /> */}
        </div>
      </section>

      {/* <WhatsAppWidget /> */}
    </div>
  )
}
