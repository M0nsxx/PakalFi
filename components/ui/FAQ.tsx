'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Shield, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Phone,
  MessageCircle,
  FileText,
  Users,
  Globe,
  Zap,
  Info,
  CreditCard,
  Headphones
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'claims' | 'pricing' | 'coverage' | 'technical'
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is parametric insurance?',
    answer: 'Parametric insurance pays automatically when specific conditions are met (like rainfall exceeding 50mm in 24 hours), without the need for traditional claims processes. This makes payments faster and more transparent.',
    category: 'general'
  },
  {
    id: '2',
    question: 'How do automatic payments work?',
    answer: 'Our system uses blockchain technology and smart contracts to automatically detect when insurance conditions are met and make payments directly to your wallet or bank account within 24 hours.',
    category: 'payments'
  },
  {
    id: '3',
    question: 'What happens if I don\'t have a smartphone?',
    answer: 'You can access our services through any device with internet connection, including computers, tablets, or even through our customer service center. We also offer SMS notifications.',
    category: 'accessibility'
  },
  {
    id: '4',
    question: 'Are the premiums really affordable?',
    answer: 'Yes! Our premiums start from just $2 USD per month. We use technology to reduce operational costs and pass those savings on to our customers.',
    category: 'pricing'
  },
  {
    id: '5',
    question: 'What documents do I need to sign up?',
    answer: 'Just your official ID (INE) and proof of address. The entire process takes less than 5 minutes and can be done entirely online.',
    category: 'registration'
  },
  {
    id: '6',
    question: 'How do I know if I\'m covered?',
    answer: 'You\'ll receive a digital policy immediately after payment. You can check your coverage status anytime through our app or website.',
    category: 'coverage'
  },
  {
    id: '7',
    question: 'What if I need to cancel my policy?',
    answer: 'You can cancel anytime through the app. We\'ll refund any unused premium for the current period.',
    category: 'cancellation'
  },
  {
    id: '8',
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption and blockchain technology to protect your personal information. We never share your data with third parties.',
    category: 'security'
  },
  {
    id: '9',
    question: 'Can I insure my entire family?',
    answer: 'Yes! We offer family plans that cover multiple members at a discounted rate. Contact our customer service for more details.',
    category: 'family'
  },
  {
    id: '10',
    question: 'What if I have a complaint?',
    answer: 'We have a dedicated customer service team available 24/7. You can contact us through the app, phone, or email. We respond within 2 hours.',
    category: 'support'
  },
  {
    id: '11',
    question: 'Do you offer coverage in rural areas?',
    answer: 'Yes! Our parametric insurance works anywhere there\'s internet connection. We have special programs for rural communities.',
    category: 'coverage'
  },
  {
    id: '12',
    question: 'How do you calculate risk?',
    answer: 'We use AI algorithms that analyze historical data, weather patterns, and local conditions to determine fair and accurate premiums.',
    category: 'risk'
  }
]

const categories = [
  { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'general', label: 'General', icon: <Info className="w-4 h-4" /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'coverage', label: 'Coverage', icon: <Shield className="w-4 h-4" /> },
  { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'support', label: 'Support', icon: <Headphones className="w-4 h-4" /> }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Find answers to the most common questions about our micro-insurance services
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none text-lg"
            />
            <HelpCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {filteredFAQ.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 font-bold text-sm">{item.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.question}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="w-6 h-6 text-green-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-300 mb-6">
              Our customer service team is here to help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/20 transition-colors">
                <Phone className="w-5 h-5" />
                Llamar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
