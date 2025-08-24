import React from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import ZeroXDemo from '@/components/insurance/0xDemo';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Play, 
  Zap, 
  Globe, 
  Smartphone,
  DollarSign,
  Award
} from 'lucide-react';

export default function HackathonDemoPage() {
  const integrations = [
          {
        id: '0x-protocol',
        name: '0x Protocol',
        bounty: '$4,000 USD',
        status: '✅ Active',
        description: 'Gasless payments & swaps for insurance',
        features: [
          'Gasless premium payments',
          'Instant claim payouts',
          'Cross-chain swaps',
          'Mobile optimization'
        ],
        demoUrl: '#0x-demo-section',
        icon: <Zap className="w-8 h-8 text-blue-500" />,
        color: 'from-blue-500 to-blue-600'
      },
    {
      id: 'reown',
      name: 'Reown AppKit',
      bounty: '$3,000 USD',
      status: '✅ Active',
      description: 'Social login & enhanced UI/UX',
      features: [
        'Social authentication',
        'Modern UI components',
        'Wallet integration',
        'Cross-platform support'
      ],
      demoUrl: '/reown-demo',
      icon: <Users className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'envio',
      name: 'Envio Analytics',
      bounty: '$2,000 USD',
      status: '✅ Active',
      description: 'Real-time analytics & monitoring',
      features: [
        'Live dashboard',
        'Risk analytics',
        'Performance metrics',
        'Automated alerts'
      ],
      demoUrl: '/envio-demo',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'para-wallet',
      name: 'Para Wallet',
      bounty: '$600 USD',
      status: '✅ Active',
      description: 'App Clips & savings goals',
      features: [
        'Instant app clips',
        'Savings goals',
        'Embedded wallets',
        'Recurring payments'
      ],
      demoUrl: '/para-demo',
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'bga',
      name: 'BGA SDG',
      bounty: '$2,000 USDT',
      status: '✅ Active',
      description: 'SDG alignment & impact tracking',
      features: [
        'SDG progress tracking',
        'Social impact metrics',
        'Sustainability reporting',
        'Impact stories'
      ],
      demoUrl: '/bga-demo',
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const totalBounty = integrations.reduce((sum, integration) => {
    const amount = parseFloat(integration.bounty.replace(/[^0-9.]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Monad Hackathon 2024 - Demo Completo
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Demostración completa de todas las integraciones del hackathon
          </p>
          
          {/* Total Bounty Card */}
          <Card className="inline-block p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">${totalBounty.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Potential Bounties</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 0x Protocol Demo Section */}
        <Card className="mb-12" id="0x-demo-section">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">🚀 0x Protocol Demo - Interactivo</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Prueba las funcionalidades de gasless payments y swaps en tiempo real
            </p>
            <ZeroXDemo />
          </div>
        </Card>

        {/* Hackathon Overview */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Hackathon Requirements & Status
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-green-800 mb-2">✅ Core Requirements</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Swap API Integration</li>
                <li>• Gasless API Integration</li>
                <li>• Transaction Execution</li>
                <li>• Mobile Optimization</li>
                <li>• Latin American Focus</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-blue-800 mb-2">🎯 Track 1: Payments</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Remittance Apps</li>
                <li>• Cross-border Payments</li>
                <li>• Gasless Payment Flows</li>
                <li>• Stablecoin Integration</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Track 2: Consumer Fintech</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Savings Apps</li>
                <li>• AI-driven Assistants</li>
                <li>• Gasless Onboarding</li>
                <li>• Mobile Investment</li>
              </ul>
            </div>
          </div>
        </Card>

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
                <p className="text-sm opacity-90 mb-3">{integration.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{integration.bounty}</span>
                  <DollarSign className="w-5 h-5 opacity-75" />
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {integration.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Demo Button */}
                {integration.id === '0x-protocol' ? (
                  <button 
                    onClick={() => document.getElementById('0x-demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    Ver Demo Interactivo
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

        {/* Technical Implementation */}
        <Card className="p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔧 Technical Implementation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Architecture Overview</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono">
                <div className="text-green-600">Frontend (Next.js)</div>
                <div className="text-blue-600">├── API Routes</div>
                <div className="text-purple-600">├── Smart Contracts</div>
                <div className="text-orange-600">└── Partner Integrations</div>
                <br />
                <div className="text-green-600">Blockchain (Monad)</div>
                <div className="text-blue-600">├── GaslessPaymentHandler</div>
                <div className="text-purple-600">├── InsurancePool</div>
                <div className="text-orange-600">└── PolicyNFT</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Key Technologies</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Next.js 14</span>
                  <span className="text-sm text-gray-500">Frontend Framework</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Solidity</span>
                  <span className="text-sm text-gray-500">Smart Contracts</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">0x Protocol</span>
                  <span className="text-sm text-gray-500">DEX Integration</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Monad</span>
                  <span className="text-sm text-gray-500">Blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="p-8 mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Ready to Experience the Future of Insurance?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Explore our comprehensive demo showcasing all hackathon integrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('0x-demo-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Probar Demo 0x
            </button>
            <Link 
              href="/dashboard"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              Ver Dashboard
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
