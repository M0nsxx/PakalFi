'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Shield, 
  DollarSign,
  Clock,
  CheckCircle,
  Users,
  MapPin,
  Calendar
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  location: string
  age: number
  occupation: string
  story: string
  rating: number
  category: 'health' | 'weather' | 'security' | 'mobility'
  claimAmount: number
  claimTime: string
  photo: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Small Business Owner',
    location: 'Guadalajara, Jalisco',
    content: 'MicroInsurance saved my business when a flood damaged my store. The automatic payment arrived in less than 24 hours, allowing me to reopen quickly. The process was incredibly simple!',
    rating: 5,
    product: 'Micro-Climate',
    avatar: '/testimonials/maria.jpg',
    verified: true
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Taxi Driver',
    location: 'Mexico City',
    content: 'As a taxi driver, I was always worried about accidents. With MicroInsurance, I feel protected and the premiums are very affordable. The app is easy to use and customer service is excellent.',
    rating: 5,
    product: 'Micro-Mobility',
    avatar: '/testimonials/carlos.jpg',
    verified: true
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role: 'Housewife',
    location: 'Monterrey, Nuevo León',
    content: 'I never thought I could afford health insurance. MicroInsurance made it possible with their affordable plans. When my son got sick, the coverage was perfect and the claims process was very fast.',
    rating: 5,
    product: 'Micro-Health',
    avatar: '/testimonials/ana.jpg',
    verified: true
  },
  {
    id: '4',
    name: 'Luis Torres',
    role: 'Farmer',
    location: 'Sinaloa',
    content: 'The climate insurance is a lifesaver for farmers like me. When drought affected my crops, I received the payment automatically. No paperwork, no delays. This is the future of insurance!',
    rating: 5,
    product: 'Micro-Climate',
    avatar: '/testimonials/luis.jpg',
    verified: true
  },
  {
    id: '5',
    name: 'Patricia López',
    role: 'Teacher',
    location: 'Puebla',
    content: 'I love how transparent everything is. I can see exactly what I\'m covered for and the premiums are very clear. The mobile app is intuitive and the customer service team is always helpful.',
    rating: 5,
    product: 'Micro-Health',
    avatar: '/testimonials/patricia.jpg',
    verified: true
  },
  {
    id: '6',
    name: 'Roberto Silva',
    role: 'Construction Worker',
    location: 'Tijuana, Baja California',
    content: 'Working in construction is risky, but MicroInsurance gives me peace of mind. The security coverage is comprehensive and the automatic payments work perfectly. Highly recommended!',
    rating: 5,
    product: 'Micro-Security',
    avatar: '/testimonials/roberto.jpg',
    verified: true
  }
]

const categories = [
  { id: 'all', label: 'Todos', icon: Users },
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'weather', label: 'Clima', icon: Shield },
  { id: 'security', label: 'Seguridad', icon: DollarSign },
  { id: 'mobility', label: 'Movilidad', icon: Clock }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTestimonials = testimonials.filter(
    testimonial => selectedCategory === 'all' || testimonial.category === selectedCategory
  )

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = filteredTestimonials[currentIndex]

  return (
    <section id="testimonios" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Real stories from Mexican families who have experienced the benefits of micro-insurance
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentIndex(0)
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </button>
            )
          })}
        </motion.div>

        {/* Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {currentTestimonial && (
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Testimonial Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Quote className="w-8 h-8 text-green-400" />
                      <div className="flex items-center gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      {currentTestimonial.verified && (
                        <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Verified</span>
                        </div>
                      )}
                    </div>

                    <blockquote className="text-xl text-gray-300 leading-relaxed mb-6">
                      "{currentTestimonial.story}"
                    </blockquote>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {currentTestimonial.name}
                        </h4>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {currentTestimonial.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {currentTestimonial.age} years
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">{currentTestimonial.occupation}</p>
                      </div>
                    </div>

                    {/* Claim Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <span className="text-gray-400 text-sm">Claim Amount</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          ${currentTestimonial.claimAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <span className="text-gray-400 text-sm">Claim Time</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          {currentTestimonial.claimTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-8 text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Real Protection
                      </h3>
                      <p className="text-gray-300">
                        Stories like this repeat thousands of times every month in Mexico
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-green-500' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              10,000+
            </div>
            <div className="text-gray-400">Protected Families</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              95%
            </div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              &lt; 24h
            </div>
            <div className="text-gray-400">Average Claim Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              $5.0M
            </div>
            <div className="text-gray-400">Claims Paid</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
