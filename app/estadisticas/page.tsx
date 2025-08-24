'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  DollarSign, 
  Activity, 
  BarChart3,
  PieChart,
  Target,
  Award,
  Calendar,
  MapPin,
  Clock,
  Star,
  CloudRain,
  Smartphone,
  Heart,
  CheckCircle,
  Car
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function EstadisticasPage() {
  const stats = [
    { 
      title: 'Usuarios Activos', 
      value: '15,432', 
      change: '+12.5%', 
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Policys Activas', 
      value: '8,947', 
      change: '+8.3%', 
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Volumen Total', 
      value: '$2.4M', 
      change: '+15.7%', 
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Claims Pagados', 
      value: '1,234', 
      change: '+5.2%', 
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const topProducts = [
            { name: 'Pakal-Health', users: 5432, growth: '+18%', color: 'bg-green-500' },
        { name: 'Pakal-Climate', users: 3210, growth: '+12%', color: 'bg-blue-500' },
        { name: 'Pakal-Security', users: 2876, growth: '+9%', color: 'bg-purple-500' },
        { name: 'Pakal-Mobility', users: 1914, growth: '+15%', color: 'bg-orange-500' }
  ]

  const recentActivity = [
    { user: 'María G.', action: 'Contracted Pakal-Health', time: '2 min', amount: '$45' },
    { user: 'Carlos R.', action: 'Renewed Pakal-Climate', time: '5 min', amount: '$32' },
    { user: 'Ana L.', action: 'Claim paid', time: '12 min', amount: '$180' },
    { user: 'Luis M.', action: 'Contracted Pakal-Security', time: '18 min', amount: '$28' },
    { user: 'Sofia P.', action: 'Renewed Pakal-Mobility', time: '25 min', amount: '$35' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
              Statistics & Analytics
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Real-time data and insights about our micro-insurance platform. 
              See how we're helping Mexican families get protected.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Active Users</h3>
              <p className="text-gray-300 text-sm">50,000+ families protected</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
              <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Claims Paid</h3>
              <p className="text-gray-300 text-sm">$5M+ in payments</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center">
              <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Average Response</h3>
              <p className="text-gray-300 text-sm">2 hours</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-6 text-center">
              <Star className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Customer Rating</h3>
              <p className="text-gray-300 text-sm">4.9/5 stars</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Detailed Analysis</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore the most important metrics of our micro-insurance platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Most Popular Products</h3>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${product.color} mr-3`}></div>
                      <span className="text-white">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{product.users.toLocaleString()}</div>
                      <div className="text-green-400 text-sm">{product.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center mb-6">
                <Activity className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{activity.user}</div>
                      <div className="text-gray-400 text-sm">{activity.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">{activity.amount}</div>
                      <div className="text-gray-500 text-sm">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Metrics */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Growth Metrics</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The sustainable growth of our micro-insurance community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-xl mb-6">
                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">98.5%</div>
                <div className="text-green-100">Retention Rate</div>
              </div>
              <p className="text-gray-300">Our users trust us and renew their policies year after year</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-xl mb-6">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">+156%</div>
                <div className="text-blue-100">Annual Growth</div>
              </div>
              <p className="text-gray-300">The number of active users has more than doubled in the last year</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl mb-6">
                <Award className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-purple-100">Satisfaction</div>
              </div>
              <p className="text-gray-300">Our users rate their experience with the highest satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the statistics. Contract your first micro-insurance and contribute to the community's growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                View All Products
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
