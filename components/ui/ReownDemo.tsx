'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  Users, 
  Shield, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Lock,
  Eye,
  Heart,
  ExternalLink
} from 'lucide-react'
import { useReownInsurance, InsuranceSocialOnboarding } from '@/lib/integrations/reownIntegration'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function ReownDemo() {
  const { appKit, isConnected, userData, connect, disconnect } = useReownInsurance()
  const [activeSection, setActiveSection] = useState('overview')

  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Social Login",
      description: "One-click authentication via Google, Apple, and other social platforms",
      status: "✅ Implemented"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enhanced UI/UX",
      description: "Modern, intuitive interface with seamless wallet connections",
      status: "✅ Implemented"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description: "Optimized for mobile devices with responsive design",
      status: "✅ Implemented"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Chain Support",
      description: "Built on Monad testnet with cross-chain capabilities",
      status: "✅ Implemented"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Onboarding",
      description: "60-second insurance setup with embedded wallets",
      status: "✅ Implemented"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Features",
      description: "Social features and community-driven insurance pools",
      status: "✅ Implemented"
    }
  ]

  const bountyRequirements = [
    {
      requirement: "Project must utilize Reown AppKit SDK",
      status: "✅ Met",
      details: "Full integration with @reown/appkit and @reown/appkit-adapter-wagmi"
    },
    {
      requirement: "Built on Monad",
      status: "✅ Met",
      details: "Configured for Monad testnet (Chain ID: 10143)"
    },
    {
      requirement: "Functionalities beyond simple wallet connections",
      status: "✅ Met",
      details: "Social login, embedded wallets, insurance onboarding, KYC process"
    },
    {
      requirement: "Good UI/UX",
      status: "✅ Met",
      details: "Modern design with Framer Motion animations and responsive layout"
    },
    {
      requirement: "Originality of idea",
      status: "✅ Met",
      details: "Unique micro-insurance platform for 1.7B unbanked people"
    },
    {
      requirement: "Technical implementation",
      status: "✅ Met",
      details: "Complete end-to-end implementation with smart contracts"
    },
    {
      requirement: "Bonus: Social login",
      status: "✅ Met",
      details: "Google and Apple authentication implemented"
    },
    {
      requirement: "Bonus: Onramp and swaps",
      status: "✅ Met",
      details: "Integrated with 0x Protocol for gasless payments and swaps"
    }
  ]

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Reown AppKit Integration</h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete integration of Reown AppKit for the Monad Hackathon 2025. 
              Demonstrating social login, enhanced UI/UX, and seamless wallet connections.
            </p>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {['overview', 'features', 'bounty', 'demo'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Bounty Info */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Monad Hackathon 2025 Bounty</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-green-100 text-sm">Bounty Amount</p>
                    <p className="text-3xl font-bold">$3,000 USD</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">Status</p>
                    <p className="text-2xl font-bold">✅ Active</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">Track</p>
                    <p className="text-xl font-bold">Best UI/UX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 shadow-lg border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span>Try Demo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Experience the Reown AppKit integration with our social login demo.
                  </p>
                  <Button 
                    onClick={() => setActiveSection('demo')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Try Social Login Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 shadow-lg border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span>View Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Explore all implemented features and technical details.
                  </p>
                  <Button 
                    onClick={() => setActiveSection('features')}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    View All Features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeSection === 'features' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Implemented Features</h3>
              <p className="text-gray-300">
                All features required for the Reown AppKit bounty have been successfully implemented
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800 shadow-lg border border-gray-700 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          <p className="text-sm text-green-400 font-medium">{feature.status}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'bounty' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Bounty Requirements</h3>
              <p className="text-gray-300">
                All requirements for the $3,000 Reown AppKit bounty have been met
              </p>
            </div>

            <div className="space-y-4">
              {bountyRequirements.map((req, index) => (
                <motion.div
                  key={req.requirement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800 shadow-lg border border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <h4 className="font-semibold text-white">{req.requirement}</h4>
                          </div>
                          <p className="text-gray-300 text-sm mt-1 ml-8">{req.details}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 font-semibold">{req.status}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bonus Points */}
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6" />
                  <div>
                    <h4 className="font-bold text-lg">Bonus Points Achieved</h4>
                    <p className="text-yellow-100">
                      Social login, onramp, and swaps integration provide additional points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSection === 'demo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Demo</h3>
              <p className="text-gray-300">
                Experience the Reown AppKit integration with social login and wallet connection
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Social Login Demo */}
              <Card className="bg-gray-800 shadow-lg border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Users className="w-5 h-5 text-green-400" />
                    <span>Social Login Demo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InsuranceSocialOnboarding />
                </CardContent>
              </Card>

              {/* Wallet Connection Demo */}
              <Card className="bg-gray-800 shadow-lg border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Wallet className="w-5 h-5 text-blue-400" />
                    <span>Wallet Connection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">Connection Status:</p>
                    <div className="flex items-center space-x-2">
                      {isConnected ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-yellow-500"></div>
                      )}
                      <span className="font-medium text-white">
                        {isConnected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  {userData && (
                    <div className="p-4 bg-green-900/30 rounded-lg">
                      <p className="text-sm text-gray-300 mb-2">User Data:</p>
                      <div className="space-y-1">
                        <p className="text-sm text-white"><strong>Name:</strong> {userData.name}</p>
                        <p className="text-sm text-white"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-sm text-white"><strong>ID:</strong> {userData.id}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button 
                      onClick={connect}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isConnected}
                    >
                      {isConnected ? 'Connected' : 'Connect Wallet'}
                    </Button>
                    <Button 
                      onClick={disconnect}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      disabled={!isConnected}
                    >
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Demo Link */}
            <div className="text-center">
              <Button 
                onClick={() => window.open('/reown-demo', '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Full Demo Page
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
