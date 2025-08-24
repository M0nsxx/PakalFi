'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Shield, 
  Heart,
  TrendingUp,
  Award,
  Star,
  Plus,
  Search,
  Filter,
  Bell,
  Share2,
  Building,
  Briefcase,
  CheckCircle,
  DollarSign,
  Smartphone
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function GruposPage() {
  const groups = [
    {
      id: 1,
      name: 'Farmeres Unidos',
      description: 'Community de agricultores que comparten experiencias sobre Pakal-Climate y protección de cultivos',
      members: 1247,
      category: 'Agriculture',
      location: 'Nacional',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Climate', 'Agriculture', 'Cultivos'],
      recentActivity: '2 hours ago',
      verified: true,
      featured: true
    },
    {
      id: 2,
      name: 'Emprendedores Digitales',
      description: 'Grupo para emprendedores que buscan proteger sus negocios con Pakal-Security',
      members: 892,
      category: 'Entrepreneurship',
      location: 'CDMX',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Security', 'Entrepreneurship', 'Negocios'],
      recentActivity: '1 hour ago',
      verified: true,
      featured: false
    },
    {
      id: 3,
      name: 'Health Familiar',
      description: 'Community enfocada en el bienestar familiar y el uso de Pakal-Health',
      members: 2156,
      category: 'Health',
      location: 'Guadalajara',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Health', 'Familia', 'Bienestar'],
      recentActivity: '30 min ago',
      verified: true,
      featured: true
    },
    {
      id: 4,
      name: 'Delivery Driveres Insurances',
      description: 'Grupo para repartidores y conductores que utilizan Pakal-Mobility',
      members: 678,
      category: 'Transport',
      location: 'Monterrey',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Mobility', 'Transport', 'Seguridad'],
      recentActivity: '45 min ago',
      verified: false,
      featured: false
    },
    {
      id: 5,
      name: 'Artesanos Protegidos',
      description: 'Community de artesanos que protegen su trabajo con micro-seguros',
      members: 445,
      category: 'Crafts',
      location: 'Oaxaca',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Security', 'Crafts', 'Cultura'],
      recentActivity: '1 day ago',
      verified: true,
      featured: false
    },
    {
      id: 6,
      name: 'Students Insurances',
      description: 'Grupo para estudiantes que quieren proteger sus dispositivos y bienes',
      members: 1234,
      category: 'Education',
      location: 'Nacional',
      image: '/api/placeholder/300/200',
      tags: ['Pakal-Security', 'Students', 'Education'],
      recentActivity: '3 hours ago',
      verified: true,
      featured: false
    }
  ]

  const categories = [
    { name: 'Todos', count: 6452, active: true },
    { name: 'Agriculture', count: 1247, active: false },
    { name: 'Entrepreneurship', count: 892, active: false },
    { name: 'Health', count: 2156, active: false },
    { name: 'Transport', count: 678, active: false },
    { name: 'Crafts', count: 445, active: false },
    { name: 'Education', count: 1234, active: false }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Workshop: Cómo Maximizar tu Pakal-Climate',
      group: 'Farmeres Unidos',
      date: '15 Dic, 2024',
      time: '10:00 AM',
      location: 'Online',
      attendees: 45,
      type: 'Workshop'
    },
    {
      id: 2,
      title: 'Meetup: Emprendedores Digitales',
      group: 'Emprendedores Digitales',
      date: '18 Dic, 2024',
      time: '6:00 PM',
      location: 'CDMX',
      attendees: 23,
      type: 'Meetup'
    },
    {
      id: 3,
      title: 'Webinar: Health Preventiva',
      group: 'Health Familiar',
      date: '20 Dic, 2024',
      time: '7:00 PM',
      location: 'Online',
      attendees: 67,
      type: 'Webinar'
    }
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
              Group Insurance
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Protect your entire family, community, or organization with group insurance plans. 
              Better coverage at lower rates for everyone.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button className="flex items-center justify-center px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:bg-gray-700/50 transition-colors">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
              <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all">
                <Plus className="w-5 h-5 mr-2" />
                Create Group
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 border-b border-gray-700">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  category.active
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Groups</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The most active and popular groups in our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.filter(group => group.featured).map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{group.name}</h3>
                      <p className="text-gray-400 text-sm">{group.category}</p>
                    </div>
                  </div>
                  {group.verified && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{group.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {group.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {group.members.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{group.recentActivity}</span>
                  <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Join</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our community events and workshops
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-white font-semibold">{event.type}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{event.attendees} attending</span>
                </div>
                
                <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{event.group}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all">
                  Join Event
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Insurance Plans */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Group Insurance Plans</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your group's needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur border border-green-500/20 rounded-2xl p-6">
              <Users className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Family Plan</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive coverage for families with shared deductibles and family benefits.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur border border-blue-500/20 rounded-2xl p-6">
              <Building className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Community Plan</h3>
              <p className="text-gray-300 text-sm">
                Group coverage for communities and organizations with priority support.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur border border-purple-500/20 rounded-2xl p-6">
              <Briefcase className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Business Plan</h3>
              <p className="text-gray-300 text-sm">
                Corporate insurance solutions with employee benefits and business protection.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur border border-orange-500/20 rounded-2xl p-6">
              <DollarSign className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Shared Benefits</h3>
              <p className="text-gray-300 text-sm">
                Single account management for all group members and policies.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur border border-orange-500/20 rounded-2xl p-6">
              <Smartphone className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Flexible Plans</h3>
              <p className="text-gray-300 text-sm">
                Customizable coverage options to fit your group's specific needs.
              </p>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How groups have benefited from our insurance plans
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">FG</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">González Family</h3>
                  <p className="text-gray-300 text-sm">6 members</p>
                  <p className="text-gray-400 text-sm">Mexico City</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "The family plan saved us 25% on premiums while providing better coverage for all of us. The shared deductible feature is fantastic."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-sm font-semibold">Family Plan</span>
                <span className="text-white text-sm">$15/month</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">CC</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Community Center</h3>
                  <p className="text-gray-300 text-sm">20 members</p>
                  <p className="text-gray-400 text-sm">Guadalajara</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "Our community plan protects all our members at an affordable rate. The priority support has been invaluable for our organization."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-blue-400 text-sm font-semibold">Community Plan</span>
                <span className="text-white text-sm">$50/month</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">TC</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Tech Company</h3>
                  <p className="text-gray-300 text-sm">45 employees</p>
                  <p className="text-gray-400 text-sm">Monterrey</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "The business plan provides excellent coverage for our employees at a fraction of traditional insurance costs. Highly recommended!"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm font-semibold">Business Plan</span>
                <span className="text-white text-sm">$200/month</span>
              </div>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Started with Group Insurance
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Protect your group with affordable, comprehensive coverage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                Create New Group
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
