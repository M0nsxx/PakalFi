'use client'

import { motion } from 'framer-motion'
import { 
  Star, 
  Quote, 
  Play, 
  Heart, 
  Shield, 
  Users,
  Award,
  CheckCircle,
  MessageCircle,
  Calendar,
  MapPin,
  CloudRain,
  Globe,
  TrendingUp
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function TestimoniosPage() {
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      role: 'Entrepreneur',
      location: 'Guadalajara, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Health',
      story: 'When my son became seriously ill, Micro-Health saved me from a huge debt. The process was super fast and the support was incredible.',
      amount: '$2,500',
      time: '3 months ago',
      video: true,
      verified: true
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      role: 'Farmer',
      location: 'Sinaloa, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Climate',
      story: 'Heavy rains destroyed my harvest, but thanks to Micro-Climate I was able to recover quickly and replant. It was a huge relief.',
      amount: '$8,000',
      time: '1 month ago',
      video: false,
      verified: true
    },
    {
      id: 3,
      name: 'Ana López',
      role: 'Student',
      location: 'Monterrey, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Security',
      story: 'They stole my laptop at university. Micro-Security helped me replace it without any problems. The service was excellent.',
      amount: '$1,200',
      time: '2 weeks ago',
      video: true,
      verified: true
    },
    {
      id: 4,
      name: 'Luis Martínez',
      role: 'Delivery Driver',
      location: 'CDMX, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Mobility',
      story: 'I had an accident with my motorcycle. Micro-Mobility covered medical expenses and repairs. Highly recommended for delivery drivers.',
      amount: '$3,800',
      time: '1 week ago',
      video: false,
      verified: true
    },
    {
      id: 5,
      name: 'Sofia Pérez',
      role: 'Artisan',
      location: 'Oaxaca, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Health',
      story: 'As an independent artisan, I didn\'t have medical insurance. Micro-Health gave me the peace of mind I needed for my family.',
      amount: '$1,500',
      time: '4 months ago',
      video: true,
      verified: true
    },
    {
      id: 6,
      name: 'Roberto Silva',
      role: 'Taxi Driver',
      location: 'Tijuana, México',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      product: 'Micro-Mobility',
      story: 'A customer scratched my car. Micro-Mobility covered the paintwork without any problems. Excellent service and speed.',
      amount: '$800',
      time: '3 weeks ago',
      video: false,
      verified: true
    }
  ]

  const stats = [
    { number: '15,432', label: 'Satisfied Users', icon: <Users className="w-6 h-6" /> },
    { number: '98.5%', label: 'Satisfaction Rate', icon: <Heart className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Average Rating', icon: <Star className="w-6 h-6" /> },
    { number: '2,847', label: 'Successful Cases', icon: <CheckCircle className="w-6 h-6" /> }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
  }

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
              Customer Testimonials
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Real stories from families globally who have experienced the benefits of micro-insurance. 
              See how we've helped protect thousands of lives across 15+ countries.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-6 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Health Stories</h3>
              <p className="text-gray-300 text-sm">Medical coverage experiences</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-6 text-center">
              <CloudRain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Climate Protection</h3>
              <p className="text-gray-300 text-sm">Weather event coverage</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Security Success</h3>
              <p className="text-gray-300 text-sm">Theft and damage protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Global Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stories from our global community across Latin America, Africa, and Southeast Asia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8 text-center"
            >
              <Globe className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Latin America</h3>
              <p className="text-gray-300 mb-6">Mexico, Brazil, Colombia, Argentina, Peru</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 5,000+ families protected</div>
                <div>• $2.5M in claims paid</div>
                <div>• 98% satisfaction rate</div>
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
              <p className="text-gray-300 mb-6">Nigeria, Kenya, South Africa, Ghana, Egypt</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 3,200+ families protected</div>
                <div>• $1.8M in claims paid</div>
                <div>• Mobile money integration</div>
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
              <p className="text-gray-300 mb-6">Indonesia, Philippines, Vietnam, India, Bangladesh</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 7,200+ families protected</div>
                <div>• $3.2M in claims paid</div>
                <div>• High remittance adoption</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Inspiring stories from our global community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur border border-green-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">MG</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">María González</h3>
                  <p className="text-gray-300 text-sm">Small Business Owner</p>
                  <p className="text-gray-400 text-sm">Guadalajara, Mexico</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "MicroInsurance saved my business when a flood damaged my store. The automatic payment arrived in less than 24 hours, allowing me to reopen quickly. The process was incredibly simple!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-green-400 text-sm font-semibold">Micro-Climate</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">CR</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Carlos Rodríguez</h3>
                  <p className="text-gray-300 text-sm">Taxi Driver</p>
                  <p className="text-gray-400 text-sm">Mexico City</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "As a taxi driver, I was always worried about accidents. With MicroInsurance, I feel protected and the premiums are very affordable. The app is easy to use and customer service is excellent."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-blue-400 text-sm font-semibold">Micro-Mobility</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">AM</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ana Martínez</h3>
                  <p className="text-gray-300 text-sm">Housewife</p>
                  <p className="text-gray-400 text-sm">Monterrey, Mexico</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "I never thought I could afford health insurance. MicroInsurance made it possible with their affordable plans. When my son got sick, the coverage was perfect and the claims process was very fast."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-purple-400 text-sm font-semibold">Micro-Health</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Read more testimonials from our satisfied customers globally
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur border border-orange-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">LT</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Luis Torres</h3>
                  <p className="text-gray-300 text-sm">Farmer</p>
                  <p className="text-gray-400 text-sm">Sinaloa, Mexico</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "The climate insurance is a lifesaver for farmers like me. When drought affected my crops, I received the payment automatically. No paperwork, no delays. This is the future of insurance!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-orange-400 text-sm font-semibold">Micro-Climate</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur border border-red-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">PL</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Patricia López</h3>
                  <p className="text-gray-300 text-sm">Teacher</p>
                  <p className="text-gray-400 text-sm">Puebla, Mexico</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "I love how transparent everything is. I can see exactly what I'm covered for and the premiums are very clear. The mobile app is intuitive and the customer service team is always helpful."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-red-400 text-sm font-semibold">Micro-Health</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur border border-indigo-500/30 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">RS</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Roberto Silva</h3>
                  <p className="text-gray-300 text-sm">Construction Worker</p>
                  <p className="text-gray-400 text-sm">Tijuana, Mexico</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "Working in construction is risky, but MicroInsurance gives me peace of mind. The security coverage is comprehensive and the automatic payments work perfectly. Highly recommended!"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <span className="text-indigo-400 text-sm font-semibold">Micro-Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Share Your Story
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Help others by sharing your experience with MicroInsurance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur border border-green-500/20 rounded-2xl p-6">
              <Users className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Community Impact</h3>
              <p className="text-gray-300 text-sm">
                Join thousands of families sharing their success stories and helping others globally.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur border border-blue-500/20 rounded-2xl p-6">
              <Star className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Verified Reviews</h3>
              <p className="text-gray-300 text-sm">
                All testimonials are verified to ensure authenticity and trust.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur border border-purple-500/20 rounded-2xl p-6">
              <MessageCircle className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Easy Sharing</h3>
              <p className="text-gray-300 text-sm">
                Share your story through our app or website in just a few clicks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur border border-orange-500/20 rounded-2xl p-6">
              <Heart className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Inspire Others</h3>
              <p className="text-gray-300 text-sm">
                Your story can inspire others to get protected and secure their future.
              </p>
            </div>
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
              Join Our Global Community
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Share your story and help others discover the benefits of micro-insurance globally
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
