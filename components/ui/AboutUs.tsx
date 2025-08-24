'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Target, 
  TrendingUp, 
  Zap,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Building,
  Lightbulb,
  Rocket
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo: string
  linkedin: string
  expertise: string[]
}

interface Milestone {
  year: string
  title: string
  description: string
  icon: React.ReactNode
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Ana Martínez',
    role: 'CEO & Founder',
    bio: 'Former insurance executive with 15 years of experience. PhD in Fintech from Stanford. Passionate about making insurance accessible to everyone.',
    photo: '/team/ana.jpg',
    linkedin: 'https://linkedin.com/in/ana-martinez',
    expertise: ['Insurance', 'Fintech', 'Leadership']
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'CTO',
    bio: 'Systems engineer with blockchain specialization. Developed the technical infrastructure that makes automatic payments possible.',
    photo: '/team/carlos.jpg',
    linkedin: 'https://linkedin.com/in/carlos-rodriguez',
    expertise: ['Blockchain', 'AI', 'Systems']
  },
  {
    id: '3',
    name: 'María González',
    role: 'Product Director',
    bio: 'Expert in user-centered design. Has worked on digital products for vulnerable populations in Latin America.',
    photo: '/team/maria.jpg',
    linkedin: 'https://linkedin.com/in/maria-gonzalez',
    expertise: ['UX/UI', 'Product', 'Inclusion']
  },
  {
    id: '4',
    name: 'Luis Torres',
    role: 'Operations Director',
    bio: 'Specialist in insurance operations and regulatory compliance. Ensures that every claim is processed correctly.',
    photo: '/team/luis.jpg',
    linkedin: 'https://linkedin.com/in/luis-torres',
    expertise: ['Operations', 'Compliance', 'Claims']
  }
]

const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'MicroInsurance was born with the mission to democratize access to insurance in Mexico',
    icon: <Rocket className="w-8 h-8 text-green-400" />
  },
  {
    year: '2021',
    title: 'First Product',
    description: 'We launched Micro-Health, our first parametric insurance',
    icon: <Heart className="w-8 h-8 text-red-400" />
  },
  {
    year: '2022',
    title: 'Expansion',
    description: 'We reached 10,000 protected families across Mexico',
    icon: <Users className="w-8 h-8 text-blue-400" />
  },
  {
    year: '2023',
    title: 'Advanced Technology',
    description: 'We implemented AI and blockchain for automatic payments',
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  },
  {
    year: '2024',
    title: 'Market Leader',
    description: 'We became the largest micro-insurance platform in Mexico',
    icon: <Award className="w-8 h-8 text-purple-400" />
  }
]

const values = [
  {
    icon: <Heart className="w-12 h-12 text-red-400" />,
    title: 'Empathy',
    description: 'We understand the real needs of Mexican families'
  },
  {
    icon: <Shield className="w-12 h-12 text-green-400" />,
    title: 'Transparency',
    description: '100% transparent in prices, coverage and processes'
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    title: 'Innovation',
    description: 'We use cutting-edge technology to serve better'
  },
  {
    icon: <Users className="w-12 h-12 text-blue-400" />,
    title: 'Inclusion',
    description: 'Accessible insurance for everyone, without discrimination'
  }
]

export function AboutUs() {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our History
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            MicroInsurance was born from a simple question: Why are insurance policies so expensive and complicated 
            for the people who need them most? In 2020, we decided to change that.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8"
          >
            <Target className="w-16 h-16 text-green-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Democratize access to quality insurance, making financial protection 
              accessible to all Mexican families, regardless of their income level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8"
          >
            <Globe className="w-16 h-16 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To be the leading micro-insurance platform in Latin America, protecting millions 
              of families with innovative technology and exceptional service.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {milestone.icon}
                        <span className="text-2xl font-bold text-white">{milestone.year}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                <p className="text-green-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Employees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">32</div>
            <div className="text-gray-400">States</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
            <div className="text-gray-400">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to know more about us?
          </h3>
          <p className="text-gray-300 mb-6">
            We're here to answer all your questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/20 transition-colors">
              <Mail className="w-5 h-5" />
              Email
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/20 transition-colors">
              <Phone className="w-5 h-5" />
              Llamar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
