'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Activity, 
  Globe,
  Zap,
  Smartphone,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Import partner integrations
import { useEnvioData, useRiskMetrics, useWeatherEvents } from '@/lib/integrations/envioInsuranceAnalytics';
import { useSDGMetrics } from '@/lib/integrations/sdgInsuranceImpact';
import { useReownInsurance } from '@/lib/integrations/reownIntegration';

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');

  // Partner integrations data
  const { metrics: envioMetrics, claims: liveClaims, loading: envioLoading } = useEnvioData();
  const { riskMetrics, loading: riskLoading } = useRiskMetrics();
  const { weatherEvents, loading: weatherLoading } = useWeatherEvents();
  const { impact: sdgImpact, metrics: sdgMetrics, loading: sdgLoading } = useSDGMetrics();
  const { appKit, isConnected, userData } = useReownInsurance();

  // Mock data for demonstration
  const mockData = {
    totalPolicies: 15432,
    activeClaims: 89,
    totalPremiums: 125000,
    totalPayouts: 45000,
    profitMargin: 64,
    customerSatisfaction: 98.5,
    gaslessTransactions: 2340,
    appClipUsage: 1560,
    savingsGoals: 890,
    sdgAlignment: 87.3
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'partners', label: 'Partner Integrations', icon: Globe },
    { id: 'risk', label: 'Risk Analytics', icon: Shield },
    { id: 'impact', label: 'Social Impact', icon: Award },
    { id: 'realtime', label: 'Live Activity', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">MicroInsurance Analytics</h1>
              <p className="text-gray-400">Global parametric insurance platform dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex space-x-1 bg-gray-800/50 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-8">
        {activeTab === 'overview' && <OverviewTab data={mockData} />}
        {activeTab === 'partners' && <PartnersTab />}
        {activeTab === 'risk' && <RiskTab riskMetrics={riskMetrics} weatherEvents={weatherEvents} />}
        {activeTab === 'impact' && <ImpactTab sdgImpact={sdgImpact} sdgMetrics={sdgMetrics} />}
        {activeTab === 'realtime' && <RealtimeTab claims={liveClaims} />}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ data }: any) {
  const stats = [
    {
      title: 'Total Policies',
      value: data.totalPolicies.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Shield,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Claims',
      value: data.activeClaims,
      change: '-5.2%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Total Premiums',
      value: `$${data.totalPremiums.toLocaleString()}`,
      change: '+18.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Profit Margin',
      value: `${data.profitMargin}%`,
      change: '+3.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.changeType === 'positive' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Premium vs Claims</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <LineChart className="w-16 h-16" />
            <span className="ml-2">Chart Component</span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Policy Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <PieChart className="w-16 h-16" />
            <span className="ml-2">Chart Component</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New policy purchased</p>
                <p className="text-xs text-gray-400">Micro-Health Premium - $10/month</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$10.00</p>
                <p className="text-xs text-gray-400">2 min ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Partners Tab Component
function PartnersTab() {
  const partners = [
    {
      name: '0x Protocol',
      bounty: '$4,000',
      status: 'active',
      metrics: {
        gaslessTransactions: 2340,
        gasSaved: '$5,850',
        successRate: 99.2
      },
      icon: Zap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Reown AppKit',
      bounty: '$3,000',
      status: 'active',
      metrics: {
        socialLogins: 890,
        userRetention: 94.5,
        uiScore: 9.2
      },
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Envio Analytics',
      bounty: '$2,000',
      status: 'active',
      metrics: {
        realtimeEvents: 15420,
        dataPoints: 2.3,
        uptime: 99.9
      },
      icon: Activity,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Para Wallet',
      bounty: '$600',
      status: 'active',
      metrics: {
        appClips: 1560,
        savingsGoals: 890,
        conversions: 78.5
      },
      icon: Award,
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'BGA SDG',
      bounty: '$2,000 USDT',
      status: 'active',
      metrics: {
        sdgAlignment: 87.3,
        impactStories: 45,
        socialScore: 9.1
      },
      icon: Globe,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-2">Hackathon Bounty Status</h3>
        <p className="text-gray-400 mb-4">All partner integrations active and tracking for bounty eligibility</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">$11,600 Total Bounties</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <Clock className="w-4 h-4" />
            <span>Submission Deadline: Dec 15, 2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${partner.color} rounded-xl flex items-center justify-center`}>
                <partner.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-400">{partner.bounty}</div>
                <div className="text-xs text-gray-400">Bounty</div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
            
            <div className="space-y-3">
              {Object.entries(partner.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-semibold">
                    {typeof value === 'number' && value > 1000 
                      ? value.toLocaleString() 
                      : typeof value === 'number' && value < 1 
                        ? `${(value * 100).toFixed(1)}%`
                        : value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Performance */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Integration Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2.3s</div>
            <div className="text-sm text-gray-400">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">15.4K</div>
            <div className="text-sm text-gray-400">Daily Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Risk Tab Component
function RiskTab({ riskMetrics, weatherEvents }: any) {
  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics?.map((metric: any, index: number) => (
          <motion.div
            key={metric.poolId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-2">Pool {metric.poolId}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Value</span>
                <span className="text-sm font-semibold">${metric.totalValue?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Active Policies</span>
                <span className="text-sm font-semibold">{metric.activePolicies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Loss Ratio</span>
                <span className={`text-sm font-semibold ${
                  metric.lossRatio > 80 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {metric.lossRatio?.toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weather Events */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Weather Events</h3>
        <div className="space-y-4">
          {weatherEvents?.slice(0, 5).map((event: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event.severity === 'high' ? 'bg-red-500/20' : 
                  event.severity === 'medium' ? 'bg-orange-500/20' : 'bg-yellow-500/20'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    event.severity === 'high' ? 'text-red-400' : 
                    event.severity === 'medium' ? 'text-orange-400' : 'text-yellow-400'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold capitalize">{event.severity} Weather Event</p>
                  <p className="text-sm text-gray-400">
                    {event.affectedPolicies} policies affected
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${event.estimatedLoss?.toLocaleString()}</p>
                <p className="text-sm text-gray-400">
                  {new Date(event.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Impact Tab Component
function ImpactTab({ sdgImpact, sdgMetrics }: any) {
  return (
    <div className="space-y-6">
      {/* SDG Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {sdgImpact?.familiesProtected?.toLocaleString() || '15K'}
          </div>
          <div className="text-sm text-gray-400">Families Protected</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {sdgImpact?.unbankedServed?.toLocaleString() || '12K'}
          </div>
          <div className="text-sm text-gray-400">Unbanked Served</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {sdgImpact?.farmersProtected?.toLocaleString() || '4.5K'}
          </div>
          <div className="text-sm text-gray-400">Farmers Protected</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-teal-400 mb-2">
            {sdgMetrics?.sdg1?.financialResilience?.toFixed(1) || '85.5'}%
          </div>
          <div className="text-sm text-gray-400">Financial Resilience</div>
        </div>
      </div>

      {/* SDG Progress */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">SDG Alignment Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sdgMetrics && Object.entries(sdgMetrics).map(([sdg, metrics]: [string, any]) => (
            <div key={sdg} className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">SDG {sdg.replace('sdg', '')}</h4>
                <span className="text-sm text-gray-400">
                  {metrics.financialResilience || metrics.healthOutcomes || metrics.economicInclusion || metrics.climateResilience}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                  style={{ 
                    width: `${metrics.financialResilience || metrics.healthOutcomes || metrics.economicInclusion || metrics.climateResilience}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Realtime Tab Component
function RealtimeTab({ claims }: any) {
  return (
    <div className="space-y-6">
      {/* Live Claims Feed */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Live Claims Activity</h3>
        <div className="space-y-4">
          {claims?.map((claim: any, index: number) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  claim.status === 'approved' ? 'bg-green-500/20' : 
                  claim.status === 'pending' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                }`}>
                  {claim.status === 'approved' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : claim.status === 'pending' ? (
                    <Clock className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold capitalize">{claim.type} Claim</p>
                  <p className="text-sm text-gray-400">Policy #{claim.policyId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${claim.amount?.toLocaleString()}</p>
                <p className="text-sm text-gray-400 capitalize">{claim.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
          <div className="text-sm text-gray-400">System Uptime</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">1.2s</div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">2.3K</div>
          <div className="text-sm text-gray-400">Active Sessions</div>
        </div>
      </div>
    </div>
  );
}
