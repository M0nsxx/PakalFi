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
  CheckCircle
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
        answer: 'Los micro-seguros son productos de seguro diseñados específicamente para personas de bajos ingresos y grupos vulnerables. Ofrecen cobertura básica a precios accesibles, permitiendo que más personas tengan acceso a protección financiera.'
      },
      {
        id: 'general-2',
        question: 'Who can get micro-insurance?',
        answer: 'Cualquier persona mayor de 18 years puede contratar un micro-seguro. No hay restricciones de ingresos mínimos y el proceso de contratación es simple y rápido.'
      },
      {
        id: 'general-3',
        question: 'What is the difference between micro-insurance and traditional insurance?',
        answer: 'Los micro-seguros tienen primas más bajas, coberturas más simples, procesos de contratación más rápidos y están diseñados para personas que tradicionalmente no tienen acceso a seguros convencionales.'
      },
      {
        id: 'general-4',
        question: 'Are micro-insurance regulated?',
        answer: 'Sí, todos nuestros micro-seguros están regulados por la Comisión Nacional de Insurances y Fianzas (CNSF) y cumplen con todas las normativas mexicanas aplicables.'
      }
    ],
    productos: [
      {
        id: 'productos-1',
        question: 'What types of micro-insurance do you offer?',
        answer: 'Ofrecemos cuatro tipos principales: Micro-Health (gastos médicos), Micro-Climate (protección agrícola), Micro-Security (bienes personales) y Micro-Mobility (accidentes de tránsito).'
      },
      {
        id: 'productos-2',
        question: 'Can I get multiple micro-insurance?',
        answer: 'Sí, puedes contratar varios micro-seguros según tus necesidades. Cada producto es independiente y puedes personalizar las coberturas.'
      },
      {
        id: 'productos-3',
        question: 'Are there age limits to get coverage?',
        answer: 'La edad mínima es 18 years. Para Micro-Health, la edad máxima es 65 years. Para otros productos, la edad máxima es 70 years.'
      },
      {
        id: 'productos-4',
        question: 'Can I modify my coverage after getting it?',
        answer: 'Sí, puedes modificar tu cobertura en cualquier momento. Los cambios se aplican al siguiente período de renovación.'
      }
    ],
    pagos: [
      {
        id: 'pagos-1',
        question: 'What payment methods do you accept?',
        answer: 'Aceptamos pagos con tarjeta de crédito/débito, transferencias bancarias, pagos en efectivo en tiendas autorizadas y pagos a través de billeteras digitales.'
      },
      {
        id: 'pagos-2',
        question: 'Can I pay in installments?',
        answer: 'Sí, ofrecemos opciones de pago mensual, trimestral y anual. El pago anual incluye un discount del 10%.'
      },
      {
        id: 'pagos-3',
        question: 'What happens if I cannot pay my premium?',
        answer: 'Ofrecemos un período de gracia de 30 días. Si no pagas después de este período, tu póliza se suspende temporalmente. Puedes reactivarla pagando las primas pendientes.'
      },
      {
        id: 'pagos-4',
        question: 'Can I cancel my policy at any time?',
        answer: 'Sí, puedes cancelar tu póliza en cualquier momento. Te reembolsaremos la prima proporcional por el período no utilizado.'
      }
    ],
    siniestros: [
      {
        id: 'siniestros-1',
        question: 'How do I report a claim?',
        answer: 'Puedes reportar un siniestro a través de nuestra app, llamando al 800-MICRO-SEGURO, o enviando un correo a siniestros@microseguro.com. El proceso es simple y rápido.'
      },
      {
        id: 'siniestros-2',
        question: 'What documents do I need for a claim?',
        answer: 'Los documentos varían según el tipo de siniestro. Generalmente necesitas: identificación oficial, póliza vigente, evidencia del daño (fotos, reportes) y facturas de gastos relacionados.'
      },
      {
        id: 'siniestros-3',
        question: 'How long does claim payment take?',
        answer: 'Los siniestros simples se pagan en 3-5 días hábiles. Los casos más complejos pueden tomar hasta 15 días hábiles. Mantenemos informado al cliente durante todo el proceso.'
      },
      {
        id: 'siniestros-4',
        question: 'Are there deductibles in micro-insurance?',
        answer: 'Sí, aplican deducibles que varían según el producto y la cobertura seleccionada. Los deducibles son más bajos que en seguros tradicionales para mantener la accesibilidad.'
      }
    ],
    tecnologia: [
      {
        id: 'tecnologia-1',
        question: '¿Cómo funciona la app de MicroInsurance?',
        answer: 'Nuestra app te permite contratar pólizas, hacer pagos, reportar siniestros y gestionar tu cuenta desde tu smartphone. Es gratuita y está disponible para iOS y Android.'
      },
      {
        id: 'tecnologia-2',
        question: 'Is it safe to use the app?',
        answer: 'Sí, utilizamos tecnología de encriptación de nivel bancario para proteger toda tu información personal y financiera. Cumplimos con los más altos estándares de seguridad.'
      },
      {
        id: 'tecnologia-3',
        question: 'Can I get micro-insurance without using the app?',
        answer: 'Sí, puedes contratar por teléfono, en nuestras oficinas o a través de nuestros agentes autorizados. La app es solo una opción adicional para mayor conveniencia.'
      },
      {
        id: 'tecnologia-4',
        question: 'What if I have technical problems?',
        answer: 'Nuestro equipo de soporte técnico está disponible 24/7. Puedes contactarnos por chat en vivo, correo electrónico o llamada telefónica.'
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to the most common questions about our micro-insurance. 
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
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron resultados</h3>
              <p className="text-gray-400 mb-6">
                No encontramos preguntas que coincidan con tu búsqueda. 
                Intenta con otros términos o contáctanos directamente.
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
              <p className="text-gray-300 mb-4">800-MICRO-SEGURO</p>
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
                <div className="text-purple-100">Inmediato</div>
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
              <p className="text-gray-300 mb-4">soporte@microseguro.com</p>
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
