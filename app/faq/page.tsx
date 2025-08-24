'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Users,
  DollarSign,
  FileText,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Globe
} from 'lucide-react'
import { WalletButton } from '@/components/ui/WalletButton'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const categories = [
    { id: 'general', name: 'General', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'productos', name: 'Products', icon: <Shield className="w-5 h-5" /> },
    { id: 'pagos', name: 'Payments', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'siniestros', name: 'Claims', icon: <FileText className="w-5 h-5" /> },
    { id: 'tecnologia', name: 'Technology', icon: <Users className="w-5 h-5" /> }
  ]

  const faqs = {
    general: [
      {
        id: 'general-1',
        question: 'What are micro-insurance?',
        answer: 'Micro-insurance are insurance products specifically designed for low-income people and vulnerable groups globally. They offer basic coverage at affordable prices, allowing more people to have access to financial protection.'
      },
      {
        id: 'general-2',
        question: 'Who can get micro-insurance?',
        answer: 'Anyone over 18 years old can get micro-insurance. There are no minimum income restrictions and the contracting process is simple and fast.'
      },
      {
        id: 'general-3',
        question: 'What is the difference between micro-insurance and traditional insurance?',
        answer: 'Micro-insurance have lower premiums, simpler coverage, faster contracting processes and are designed for people who traditionally do not have access to conventional insurance.'
      },
      {
        id: 'general-4',
        question: 'Are micro-insurance regulated?',
        answer: 'Yes, all our micro-insurance are regulated by the relevant authorities in each country and comply with all applicable local regulations.'
      }
    ],
    productos: [
      {
        id: 'productos-1',
        question: 'What types of micro-insurance do you offer?',
        answer: 'We offer four main types: Micro-Health (medical expenses), Micro-Climate (agricultural protection), Micro-Security (personal property) and Micro-Mobility (traffic accidents).'
      },
      {
        id: 'productos-2',
        question: 'Can I get multiple micro-insurance?',
        answer: 'Yes, you can contract several micro-insurance according to your needs. Each product is independent and you can customize the coverage.'
      },
      {
        id: 'productos-3',
        question: 'Are there age limits to get coverage?',
        answer: 'The minimum age is 18 years. For Micro-Health, the maximum age is 65 years. For other products, the maximum age is 70 years.'
      },
      {
        id: 'productos-4',
        question: 'Can I modify my coverage after getting it?',
        answer: 'Yes, you can modify your coverage at any time. Changes apply to the next renewal period.'
      }
    ],
    pagos: [
      {
        id: 'pagos-1',
        question: 'What payment methods do you accept?',
        answer: 'We accept credit/debit card payments, bank transfers, cash payments at authorized stores and payments through digital wallets.'
      },
      {
        id: 'pagos-2',
        question: 'Can I pay in installments?',
        answer: 'Yes, we offer monthly, quarterly and annual payment options. Annual payment includes a 10% discount.'
      },
      {
        id: 'pagos-3',
        question: 'What happens if I cannot pay my premium?',
        answer: 'We offer a 30-day grace period. If you do not pay after this period, your policy is temporarily suspended. You can reactivate it by paying the pending premiums.'
      },
      {
        id: 'pagos-4',
        question: 'Can I cancel my policy at any time?',
        answer: 'Yes, you can cancel your policy at any time. We will refund the proportional premium for the unused period.'
      }
    ],
    siniestros: [
      {
        id: 'siniestros-1',
        question: 'How do I report a claim?',
        answer: 'You can report a claim through our app, calling +1-800-MICRO-INS, or sending an email to claims@microinsurance.global. The process is simple and fast.'
      },
      {
        id: 'siniestros-2',
        question: 'What documents do I need for a claim?',
        answer: 'Documents vary depending on the type of claim. Generally you need: official identification, valid policy, evidence of damage (photos, reports) and invoices for related expenses.'
      },
      {
        id: 'siniestros-3',
        question: 'How long does claim payment take?',
        answer: 'Simple claims are paid in 3-5 business days. More complex cases can take up to 15 business days. We keep the customer informed throughout the process.'
      },
      {
        id: 'siniestros-4',
        question: 'Are there deductibles in micro-insurance?',
        answer: 'Yes, deductibles apply that vary according to the product and selected coverage. Deductibles are lower than in traditional insurance to maintain accessibility.'
      }
    ],
    tecnologia: [
      {
        id: 'tecnologia-1',
        question: 'How does the MicroInsurance app work?',
        answer: 'Our app allows you to contract policies, make payments, report claims and manage your account from your smartphone. It is free and available for iOS and Android.'
      },
      {
        id: 'tecnologia-2',
        question: 'Is it safe to use the app?',
        answer: 'Yes, we use bank-level encryption technology to protect all your personal and financial information. We comply with the highest security standards.'
      },
      {
        id: 'tecnologia-3',
        question: 'Can I get micro-insurance without using the app?',
        answer: 'Yes, you can contract by phone, at our offices or through our authorized agents. The app is just an additional option for greater convenience.'
      },
      {
        id: 'tecnologia-4',
        question: 'What if I have technical problems?',
        answer: 'Our technical support team is available 24/7. You can contact us by live chat, email or phone call.'
      }
    ]
  }

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFAQs = Object.entries(faqs).reduce((acc, [category, items]) => {
    if (activeCategory === 'all' || category === activeCategory) {
      const filtered = items.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (filtered.length > 0) {
        (acc as any)[category] = filtered
      }
    }
    return acc
  }, {} as typeof faqs)

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
              Frequently Asked
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Questions</span>
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
              Find answers to the most common questions about our global micro-insurance. 
              If you don't find what you're looking for, contact us directly.
            </p>
          </motion.div>

          {/* Wallet Button */}
          <div className="flex justify-center mb-12">
            <WalletButton />
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Coverage Section */}
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
              Global Coverage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Available in 15+ countries across Latin America, Africa, and Southeast Asia
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
                <div>• Regulatory sandbox programs</div>
                <div>• High crypto adoption</div>
                <div>• Mobile payment integration</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur border border-blue-500/30 rounded-2xl p-8 text-center"
            >
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Africa</h3>
              <p className="text-gray-300 mb-6">Nigeria, Kenya, South Africa, Ghana, Egypt</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Mobile money integration</div>
                <div>• M-Pesa ecosystem</div>
                <div>• Progressive regulation</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8 text-center"
            >
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Southeast Asia</h3>
              <p className="text-gray-300 mb-6">Indonesia, Philippines, Vietnam, India, Bangladesh</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• High remittance flows</div>
                <div>• Digital payment adoption</div>
                <div>• Established microfinance</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 border-b border-gray-700">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {Object.entries(filteredFAQs).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-8 capitalize">
                {categories.find(c => c.id === category)?.name || category}
              </h2>
              
              <div className="space-y-4">
                {items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                    >
                      <h3 className="text-white font-medium pr-4">{item.question}</h3>
                      {expandedItems.has(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedItems.has(item.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* No Results */}
          {Object.keys(filteredFAQs).length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We didn't find questions that match your search. 
                Try with other terms or contact us directly.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                Contact Support
              </button>
            </motion.div>
          )}
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
            <h2 className="text-4xl font-bold text-white mb-4">Didn't Find Your Answer?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our support team is available to help you with any additional questions
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
                <div className="text-2xl font-bold text-white mb-2">Direct Line</div>
                <div className="text-blue-100">24/7</div>
              </div>
              <p className="text-gray-300 mb-4">+1-800-MICRO-INS</p>
              <p className="text-gray-400 text-sm">Phone support available 24 hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl mb-6">
                <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Live Chat</div>
                <div className="text-purple-100">Immediate</div>
              </div>
              <p className="text-gray-300 mb-4">Real Time Support</p>
              <p className="text-gray-400 text-sm">Connect with an agent in seconds</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-xl mb-6">
                <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">Email</div>
                <div className="text-orange-100">24h</div>
              </div>
              <p className="text-gray-300 mb-4">support@microinsurance.global</p>
              <p className="text-gray-400 text-sm">Response in less than 24 hours</p>
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
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have more questions or are ready to contract, we're here to help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletButton />
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                Contact Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
