'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Shield, Heart, Cloud, Car, ChevronRight, Users, TrendingUp, Zap, CheckCircle, CloudRain, DollarSign, Smartphone } from 'lucide-react'
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
            
            <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 leading-tight">
              Insurance for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"> Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
              Democratizing access to insurance in Mexico with blockchain technology. 
              Intelligent, transparent, and accessible protection for everyone.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-green-500/25 transition-all"
              >
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
                Get Quote via WhatsApp
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

      {/* Live Claim Ticker */}
      {/* <LiveClaimTicker /> */}

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
              <div className="text-3xl font-bold text-green-400 mb-2">$10-50</div>
              <div className="text-sm text-gray-400">MXN/month</div>
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
              <h3 className="text-xl font-bold text-white mb-2">Climate</h3>
              <p className="text-gray-300 mb-4">Drought, flood, hail</p>
              <div className="text-3xl font-bold text-blue-400 mb-2">$20-100</div>
              <div className="text-sm text-gray-400">MXN/month</div>
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
              <h3 className="text-xl font-bold text-white mb-2">Security</h3>
              <p className="text-gray-300 mb-4">Theft, assault, fraud</p>
              <div className="text-3xl font-bold text-red-400 mb-2">$15-75</div>
              <div className="text-sm text-gray-400">MXN/month</div>
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
              <h3 className="text-xl font-bold text-white mb-2">Mobility</h3>
              <p className="text-gray-300 mb-4">Accidents, Uber, delivery</p>
              <div className="text-3xl font-bold text-amber-400 mb-2">$25-150</div>
              <div className="text-sm text-gray-400">MXN/month</div>
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
              <h3 className="text-xl font-bold text-white mb-2">Pay at OXXO</h3>
              <p className="text-gray-400">
                Pay your premium at any OXXO store with cash - no bank account needed
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
