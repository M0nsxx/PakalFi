'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import ZeroXDemo from '@/components/insurance/0xDemo';
import EnvioDemo from '@/components/dashboard/EnvioDemo';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Play, 
  Zap, 
  Globe, 
  Smartphone,
  DollarSign,
  Award,
  Info,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function HackathonDemoPage() {
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const glossary = [
    {
      term: "Web3",
      definition: "The new version of the internet that allows users to own their data and digital assets, without depending on large companies."
    },
    {
      term: "Blockchain",
      definition: "A digital database that records information securely and transparently, without the need for an intermediary."
    },
    {
      term: "Smart Contract",
      definition: "An automatic program that executes agreements when certain conditions are met, like a digital contract."
    },
    {
      term: "Gasless",
      definition: "Transactions that don't require you to pay network fees, making them cheaper and easier to use."
    },
    {
      term: "DeFi",
      definition: "Financial services (loans, savings, investments) that work without traditional banks."
    },
    {
      term: "Wallet",
      definition: "A digital application that allows you to store and manage your digital money securely."
    },
    {
      term: "Token",
      definition: "A digital asset that can represent money, property, or any value on the blockchain."
    },
    {
      term: "Swap",
      definition: "Exchanging one type of digital currency for another, like changing dollars for euros but with cryptocurrencies."
    }
  ];

  const integrations = [
    {
      id: '0x-protocol',
      name: '0x Protocol',
      bounty: '$4,000 USD',
      status: '✅ Active',
      description: 'Gasless payments and digital currency exchange',
      simpleDescription: 'Like PayPal but for digital money, without hidden fees',
      features: [
        'Insurance premium payments without network fees',
        'Instant claim payouts',
        'Exchange of different digital currencies',
        'Optimized for mobile use'
      ],
      demoUrl: '#0x-demo-section',
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-500 to-blue-600',
      whyImportant: 'Makes using digital insurance as easy as using a banking app'
    },
    {
      id: 'reown',
      name: 'Reown AppKit',
      bounty: '$3,000 USD',
      status: '✅ Active',
      description: 'Social login and enhanced user experience',
      simpleDescription: 'Sign in with Google or Apple, like in apps you already know',
      features: [
        'Login with Google and Apple',
        'Modern and easy-to-use interface',
        'Automatic digital wallet connection',
        'Works on all platforms'
      ],
      demoUrl: '/reown-demo',
      icon: <Users className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500 to-purple-600',
      whyImportant: 'Removes the barrier to entry for new Web3 users'
    },
    {
      id: 'envio',
      name: 'Envio Analytics',
      bounty: '$2,000 USD',
      status: '✅ Active',
      description: 'Real-time analytics and monitoring',
      simpleDescription: 'Like Google Analytics but for digital transactions',
      features: [
        'Real-time dashboard',
        'Risk analytics',
        'Performance metrics',
        'Automated alerts'
      ],
      demoUrl: '#envio-demo-section',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      color: 'from-green-500 to-green-600',
      whyImportant: 'Helps you understand and improve your digital business performance'
    },
    {
      id: 'para-wallet',
      name: 'Para App Clips',
      bounty: '$600 USD',
      status: '✅ Active',
      description: 'App Clips and MXNB stablecoin integration',
      simpleDescription: 'Instant insurance purchase via iOS App Clips with MXNB payments',
      features: [
        'iOS App Clip launches from QR code',
        'Para authentication with Face ID/Passkey',
        'MXNB stablecoin transactions on Monad',
        'Instant insurance policy activation'
      ],
      demoUrl: '/para-demo',
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-500 to-orange-600',
      whyImportant: 'Enables instant insurance purchase without app downloads using native iOS features'
    },
    {
      id: 'bga',
      name: 'BGA SDG',
      bounty: '$2,000 USDT',
      status: '✅ Active',
      description: 'Alignment with sustainable development goals',
      simpleDescription: 'Track the positive impact of your business on the world',
      features: [
        'SDG progress tracking',
        'Social impact metrics',
        'Sustainability reporting',
        'Impact stories'
      ],
      demoUrl: '/bga-demo',
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      color: 'from-teal-500 to-teal-600',
      whyImportant: 'Shows that your business not only makes money but helps the planet'
    }
  ];

  const totalBounty = integrations.reduce((sum, integration) => {
    const amount = parseFloat(integration.bounty.replace(/[^0-9.]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏆 Monad Hackathon 2025 - Complete Demo
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Complete demonstration of all hackathon integrations
          </p>
          
          {/* Beginner-Friendly Intro */}
          <Card className="mb-8 bg-blue-900/30 border border-blue-700">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold text-white">New to Web3? Don't worry!</h3>
              </div>
              <p className="text-gray-300 mb-4">
                This page is designed to be super easy to understand, even if you've never used cryptocurrencies or blockchain.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setShowGlossary(!showGlossary)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {showGlossary ? 'Hide Glossary' : 'View Terms Glossary'}
                </button>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Simple Explanation
                </button>
              </div>
            </div>
          </Card>
          
          {/* Total Bounty Card */}
          <Card className="inline-block p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">${totalBounty.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Available Prizes</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Glossary Section */}
        {showGlossary && (
          <Card className="mb-12 bg-gray-800 border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
                Web3 Terms Glossary
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {glossary.map((item, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-blue-400 mb-2">{item.term}</h4>
                    <p className="text-gray-300 text-sm">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
              { id: 'demos', label: 'Demos', icon: <Play className="w-4 h-4" /> },
              { id: 'integrations', label: 'Integrations', icon: <Zap className="w-4 h-4" /> },
              { id: 'technical', label: 'Technical', icon: <HelpCircle className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* What is this? */}
            <Card className="bg-gray-800 border border-gray-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-3 text-green-400" />
                  What is this?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-400 mb-3">🎯 The Problem</h3>
                    <p className="text-gray-300 mb-4">
                      In Latin America, 1.7 billion people don't have access to basic financial services like insurance, savings, or loans.
                    </p>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Traditional banks are very expensive
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Require lots of paperwork and time
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Don't reach remote communities
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-3">💡 Our Solution</h3>
                    <p className="text-gray-300 mb-4">
                      We created a micro-insurance platform that uses blockchain technology to make financial services accessible to everyone.
                    </p>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                        Insurance from $1 USD
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                        No paperwork, everything digital
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                        Works on any mobile phone
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* How it works */}
            <Card className="bg-gray-800 border border-gray-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
                  How does it work?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Sign Up</h3>
                    <p className="text-gray-300 text-sm">
                      Use your Google or Apple account to create your profile in 30 seconds
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Choose Your Insurance</h3>
                    <p className="text-gray-300 text-sm">
                      Select the type of coverage you need (health, auto, home)
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Pay and Done</h3>
                    <p className="text-gray-300 text-sm">
                      Pay with your card or digital money and receive immediate coverage
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Why Web3? */}
            <Card className="bg-gray-800 border border-gray-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-purple-400" />
                  Why do we use Web3?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-red-400 mb-3">❌ Traditional System Problems</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• High fees (20-30% of value)</li>
                      <li>• Slow processes (days or weeks)</li>
                      <li>• Requires bank account</li>
                      <li>• Exclusion of people without documents</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-400 mb-3">✅ Web3 Advantages</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Minimal fees (1-3%)</li>
                      <li>• Instant processes</li>
                      <li>• Only need a mobile phone</li>
                      <li>• Inclusive for everyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Demos Tab */}
        {activeTab === 'demos' && (
          <div className="space-y-8">
            {/* 0x Protocol Demo Section */}
            <Card className="mb-12 bg-gray-800 border border-gray-700" id="0x-demo-section">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">🚀 0x Protocol Demo - Interactive</h2>
                </div>
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-400 mb-2">What does this do?</h3>
                  <p className="text-gray-300 text-sm">
                    Allows making insurance payments without paying additional fees, like using PayPal but cheaper and faster.
                  </p>
                </div>
                <p className="text-gray-300 mb-6">
                  Test gasless payment and currency exchange functionalities in real time
                </p>
                <ZeroXDemo />
              </div>
            </Card>

            {/* Envio Analytics Demo Section */}
            <Card className="mb-12 bg-gray-800 border border-gray-700" id="envio-demo-section">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">📊 Envio Analytics Demo - Real-Time Dashboard</h2>
                </div>
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-400 mb-2">What does this do?</h3>
                  <p className="text-gray-300 text-sm">
                    Shows real-time statistics of all transactions, like Google Analytics but for digital money.
                  </p>
                </div>
                <p className="text-gray-300 mb-6">
                  Real-time analytics dashboard for payments and consumer fintech on Monad
                </p>
                <EnvioDemo />
              </div>
            </Card>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-8">
            {/* Integrations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {integrations.map((integration) => (
                <Card key={integration.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${integration.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      {integration.icon}
                      <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                        {integration.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{integration.simpleDescription}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{integration.bounty}</span>
                      <DollarSign className="w-5 h-5 opacity-75" />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 bg-gray-800">
                    <h4 className="font-semibold text-white mb-3">Why is it important?</h4>
                    <p className="text-gray-300 text-sm mb-4">{integration.whyImportant}</p>
                    
                    <h4 className="font-semibold text-white mb-3">Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {integration.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Demo Button */}
                    {integration.id === '0x-protocol' ? (
                      <button 
                        onClick={() => {
                          setActiveTab('demos');
                          setTimeout(() => {
                            document.getElementById('0x-demo-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                      >
                        <Play className="w-4 h-4 inline mr-2" />
                        Try Demo
                      </button>
                    ) : integration.id === 'envio' ? (
                      <button 
                        onClick={() => {
                          setActiveTab('demos');
                          setTimeout(() => {
                            document.getElementById('envio-demo-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                      >
                        <Play className="w-4 h-4 inline mr-2" />
                        View Dashboard
                      </button>
                    ) : (
                      <Link 
                        href={integration.demoUrl}
                        className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                      >
                        <Play className="w-4 h-4 inline mr-2" />
                        View Demo
                      </Link>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Technical Tab */}
        {activeTab === 'technical' && (
          <div className="space-y-8">
            {/* Hackathon Overview */}
            <Card className="p-8 mb-12 bg-gray-800 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                🎯 Hackathon Requirements and Status
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-semibold text-green-400 mb-2">✅ Core Requirements</h3>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• Swap API Integration</li>
                    <li>• Gasless API Integration</li>
                    <li>• Transaction Execution</li>
                    <li>• Mobile Optimization</li>
                    <li>• Latin American Focus</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-semibold text-blue-400 mb-2">🎯 Track 1: Payments</h3>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>• Remittance Apps</li>
                    <li>• Cross-border Payments</li>
                    <li>• Gasless Payment Flows</li>
                    <li>• Stablecoin Integration</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-semibold text-purple-400 mb-2">🎯 Track 2: Consumer Fintech</h3>
                  <ul className="text-sm text-purple-300 space-y-1">
                    <li>• Savings Apps</li>
                    <li>• AI-driven Assistants</li>
                    <li>• Gasless Onboarding</li>
                    <li>• Mobile Investment</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Technical Implementation */}
            <Card className="p-8 mt-12 bg-gray-800 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                🔧 Technical Implementation
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4">System Architecture</h3>
                  <div className="bg-gray-700 p-4 rounded-lg text-sm font-mono">
                    <div className="text-green-400">Frontend (Next.js)</div>
                    <div className="text-blue-400">├── API Routes</div>
                    <div className="text-purple-400">├── Smart Contracts</div>
                    <div className="text-orange-400">└── Partner Integrations</div>
                    <br />
                    <div className="text-green-400">Blockchain (Monad)</div>
                    <div className="text-blue-400">├── Gasless Payment Handler</div>
                    <div className="text-purple-400">├── Insurance Pool</div>
                    <div className="text-orange-400">└── Policy NFT</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-4">Key Technologies</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="font-medium text-white">Next.js 14</span>
                      <span className="text-sm text-gray-300">Frontend Framework</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="font-medium text-white">Solidity</span>
                      <span className="text-sm text-gray-300">Smart Contracts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="font-medium text-white">0x Protocol</span>
                      <span className="text-sm text-gray-300">DEX Integration</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="font-medium text-white">Monad</span>
                      <span className="text-sm text-gray-300">Blockchain</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <Card className="p-8 mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Ready to Experience the Future of Insurance?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Explore our complete demo showcasing all hackathon integrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setActiveTab('demos');
                setTimeout(() => {
                  document.getElementById('0x-demo-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Try 0x Demo
            </button>
            <button 
              onClick={() => {
                setActiveTab('demos');
                setTimeout(() => {
                  document.getElementById('envio-demo-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Envio Demo
            </button>
            <Link 
              href="/dashboard"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
