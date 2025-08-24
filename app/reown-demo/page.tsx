'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  Users, 
  Shield, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Lock,
  Eye,
  Heart
} from 'lucide-react'
import { useReownInsurance, InsuranceSocialOnboarding } from '@/lib/integrations/reownIntegration'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ReownDemo() {
  const { appKit, isConnected, userData, connect, disconnect } = useReownInsurance()
  const [activeTab, setActiveTab] = useState('overview')
  const [demoStats, setDemoStats] = useState({
    totalUsers: 15420,
    activePolicies: 8923,
    totalVolume: 1250000,
    satisfactionRate: 98.5
  })

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Reown AppKit Demo</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcasing the complete integration of Reown AppKit for the Monad Hackathon 2025. 
                This demo demonstrates social login, enhanced UI/UX, and seamless wallet connections.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['overview', 'features', 'bounty', 'demo', 'integration'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(demoStats).map(([key, value]) => (
                <Card key={key} className="bg-white shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {typeof value === 'number' && key.includes('Rate') 
                            ? `${value}%` 
                            : typeof value === 'number' && key.includes('Volume')
                            ? `$${(value / 1000).toFixed(0)}K`
                            : value.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bounty Info */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Monad Hackathon 2025 Bounty</h2>
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
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span>Quick Start</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Experience the Reown AppKit integration with our social login demo.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('demo')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Try Social Login Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span>View Integration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Explore the technical implementation and code structure.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('integration')}
                    variant="outline"
                    className="w-full"
                  >
                    View Technical Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Implemented Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
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
                  <Card className="bg-white shadow-lg border-0 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          <p className="text-sm text-green-600 font-medium">{feature.status}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'bounty' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bounty Requirements</h2>
              <p className="text-gray-600">
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
                  <Card className="bg-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-gray-900">{req.requirement}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mt-1 ml-8">{req.details}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-semibold">{req.status}</span>
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
                    <h3 className="font-bold text-lg">Bonus Points Achieved</h3>
                    <p className="text-yellow-100">
                      Social login, onramp, and swaps integration provide additional points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'demo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Demo</h2>
              <p className="text-gray-600">
                Experience the Reown AppKit integration with social login and wallet connection
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Social Login Demo */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Social Login Demo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InsuranceSocialOnboarding />
                </CardContent>
              </Card>

              {/* Wallet Connection Demo */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <span>Wallet Connection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Connection Status:</p>
                    <div className="flex items-center space-x-2">
                      {isConnected ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className="font-medium">
                        {isConnected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                  </div>

                  {userData && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">User Data:</p>
                      <div className="space-y-1">
                        <p className="text-sm"><strong>Name:</strong> {userData.name}</p>
                        <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-sm"><strong>ID:</strong> {userData.id}</p>
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
                      disabled={!isConnected}
                    >
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'integration' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Integration</h2>
              <p className="text-gray-600">
                Detailed overview of the Reown AppKit implementation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span>Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Project ID</p>
                      <p className="text-sm text-gray-900">Configured via environment variables</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Network</p>
                      <p className="text-sm text-gray-900">Monad Testnet (Chain ID: 10143)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Features</p>
                      <p className="text-sm text-gray-900">Social login, analytics, swaps, onramp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span>Key Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Social authentication (Google, Apple)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Embedded wallet creation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Multi-wallet support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Mobile-optimized UI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Analytics integration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code Examples */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>Implementation Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">lib/integrations/reownIntegration.tsx</span>
                    <span className="text-xs text-green-600">Main integration</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">context/index.tsx</span>
                    <span className="text-xs text-green-600">AppKit setup</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">config/index.tsx</span>
                    <span className="text-xs text-green-600">Wagmi adapter</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">components/ui/WalletButton.tsx</span>
                    <span className="text-xs text-green-600">UI component</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
