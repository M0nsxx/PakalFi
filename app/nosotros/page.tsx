'use client'

import { motion } from 'framer-motion'
import { 
  Building, 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award,
  TrendingUp,
  Globe,
  Shield,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function AboutUsPage() {
  const stats = [
    { number: '15,000+', label: 'Protected Clients', icon: <Users className="w-6 h-6" /> },
    { number: '4', label: 'Innovative Products', icon: <Shield className="w-6 h-6" /> },
    { number: '98.5%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { number: '5', label: 'Years of Experience', icon: <Award className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Inclusion',
      description: 'We believe everyone deserves access to financial protection, regardless of their income level or location.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Transparency',
      description: 'We operate with complete transparency in our processes, prices, and coverage across all markets.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'We build strong communities globally where everyone supports each other.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We use cutting-edge technology to make insurance more accessible worldwide.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const team = [
    {
      name: 'María González',
      role: 'CEO & Founder',
      image: '/api/placeholder/200/200',
      bio: 'Over 15 years of experience in fintech and microfinance. Passionate about global financial inclusion.',
      linkedin: '#'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'CTO',
      image: '/api/placeholder/200/200',
      bio: 'Expert in blockchain and mobile app development. Leads our global digital transformation.',
      linkedin: '#'
    },
    {
      name: 'Ana López',
      role: 'Product Director',
      image: '/api/placeholder/200/200',
      bio: 'Specialist in innovative insurance product design and user experience for emerging markets.',
      linkedin: '#'
    },
    {
      name: 'Luis Martínez',
      role: 'Operations Director',
      image: '/api/placeholder/200/200',
      bio: 'Expert in process optimization and claims management. Ensures operational excellence globally.',
      linkedin: '#'
    }
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Foundation',
      description: 'MicroInsurance was born with the mission to democratize access to insurance globally.',
      icon: <Building className="w-6 h-6" />
    },
    {
      year: '2020',
      title: 'First Product',
      description: 'We launched Micro-Health, our first micro-insurance product in Mexico.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      year: '2021',
      title: 'Expansion',
      description: 'We added Micro-Climate and Micro-Security to our product portfolio.',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: '2022',
      title: 'Blockchain Technology',
      description: 'We implemented blockchain technology for greater transparency and efficiency.',
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: '2023',
      title: 'Micro-Mobility',
      description: 'We launched Micro-Mobility to protect drivers and delivery workers globally.',
      icon: <Users className="w-6 h-6" />
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'We reached over 15,000 protected clients across 15+ countries globally.',
      icon: <Award className="w-6 h-6" />
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
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              About
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are an innovative company dedicated to democratizing access to insurance 
              globally. Our mission is to protect everyone, regardless of their income level or location.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-green-400 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                To democratize access to insurance globally, providing innovative and 
                accessible products that protect the most vulnerable people and families worldwide, 
                contributing to financial inclusion and social well-being across all markets.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Make insurance accessible to everyone globally</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Protect the most vulnerable families worldwide</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Contribute to global financial inclusion</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                To be the leading company in micro-insurance globally, recognized for our 
                technological innovation, social commitment and ability to transform the 
                traditional insurance industry across all markets.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Leader in micro-insurance globally</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Constant technological innovation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Transform the insurance industry worldwide</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Markets Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Global Markets</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Serving 1.7 billion unbanked people across three strategic regions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center"
            >
              <Globe className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Latin America</h3>
              <p className="text-gray-300 mb-6">500M unbanked population</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Mexico (65M) - Regulatory sandbox</div>
                <div>• Brazil (45M) - High crypto adoption</div>
                <div>• Colombia (20M) - Crypto-friendly regulation</div>
                <div>• Argentina (15M) - High inflation protection</div>
                <div>• Peru (12M) - Financial inclusion priority</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8 text-center"
            >
              <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Africa</h3>
              <p className="text-gray-300 mb-6">350M unbanked population</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Nigeria (60M) - Largest African economy</div>
                <div>• Kenya (15M) - M-Pesa ecosystem</div>
                <div>• South Africa (13M) - Fintech hub</div>
                <div>• Ghana (8M) - Progressive regulation</div>
                <div>• Egypt (25M) - Young tech-savvy population</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Southeast Asia</h3>
              <p className="text-gray-300 mb-6">225M unbanked population</p>
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

      {/* Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide every decision we make and every action we take globally
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`bg-gradient-to-r ${value.color} p-8 rounded-xl mb-6`}>
                  <div className="text-white mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the people who make our mission to democratize insurance globally possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                <p className="text-green-400 text-sm mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                <button className="text-green-400 hover:text-green-300 transition-colors">
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our History</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A journey of innovation and growth dedicated to global financial inclusion
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="text-green-400 mr-3">
                          {milestone.icon}
                        </div>
                        <span className="text-green-400 font-bold text-lg">{milestone.year}</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-300 text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-gray-800"></div>
                  </div>

                  {/* Empty Space */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Do you have questions about us or want to know more about our global products?
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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-xl mb-6">
                <Phone className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Phone</div>
                <div className="text-blue-100">+1-800-MICRO-INS</div>
              </div>
              <p className="text-gray-300">Direct line available 24/7</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl mb-6">
                <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Email</div>
                <div className="text-purple-100">info@microinsurance.global</div>
              </div>
              <p className="text-gray-300">Response within 24 hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-xl mb-6">
                <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Office</div>
                <div className="text-green-100">Zug, Switzerland</div>
              </div>
              <p className="text-gray-300">Visit us at our global headquarters</p>
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
              Join Our Global Mission
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the change. Get your micro-insurance and contribute to global financial inclusion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                View Products
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
