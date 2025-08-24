'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Shield, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  User,
  Wallet,
  Settings,
  HelpCircle,
  FileText,
  TrendingUp,
  Users,
  Building,
  Mail,
  MapPin,
  Clock
} from 'lucide-react'
import { WalletButton } from './WalletButton'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Products',
    href: '#productos',
    icon: <Shield className="w-4 h-4" />,
    children: [
      { label: 'Micro-Health', href: '/salud', icon: <Shield className="w-4 h-4" /> },
      { label: 'Micro-Climate', href: '/clima', icon: <Shield className="w-4 h-4" /> },
      { label: 'Micro-Security', href: '/seguridad', icon: <Shield className="w-4 h-4" /> },
      { label: 'Micro-Mobility', href: '/movilidad', icon: <Shield className="w-4 h-4" /> }
    ]
  },
  {
    label: 'Community',
    href: '#comunidad',
    icon: <Users className="w-4 h-4" />,
    children: [
      { label: 'Statistics', href: '/estadisticas', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Testimonials', href: '/testimonios', icon: <Users className="w-4 h-4" /> },
      { label: 'Groups', href: '/grupos', icon: <Building className="w-4 h-4" /> }
    ]
  },
  {
    label: 'Resources',
    href: '#recursos',
    icon: <FileText className="w-4 h-4" />,
    children: [
      { label: 'Calculator', href: '/calculadora', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Risk Assessment', href: '/evaluacion-riesgo', icon: <Shield className="w-4 h-4" /> },
      { label: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 h-4" /> }
    ]
  },
  { label: 'About Us', href: '/nosotros', icon: <Building className="w-4 h-4" /> }
]

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setActiveDropdown(null)
    
    // Check if it's a page route (starts with /)
    if (href.startsWith('/')) {
      router.push(href)
    } else {
      // Smooth scroll to section for hash links
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const openContactModal = () => {
    setShowContactModal(true)
    setIsOpen(false)
    setActiveDropdown(null)
  }

  const openQuoteModal = () => {
    setShowQuoteModal(true)
    setIsOpen(false)
    setActiveDropdown(null)
  }

  const openWhatsApp = () => {
    const phoneNumber = '525512345678'
    const message = encodeURIComponent('Hello, I\'m interested in getting an insurance quote with MicroInsurance')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => router.push('/')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-1"
              aria-label="Go to home"
              tabIndex={0}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white">
                MicroInsurance
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      tabIndex={0}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      tabIndex={0}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl"
                          onMouseEnter={() => setActiveDropdown(item.label)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="py-2">
                            {item.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => handleNavClick(child.href)}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:text-green-400 hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/5"
                                tabIndex={0}
                              >
                                {child.icon}
                                <span>{child.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <WalletButton />
              
              <button
                onClick={openContactModal}
                className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                tabIndex={0}
                aria-label="Contact us"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </button>
              
              <button
                onClick={openQuoteModal}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                tabIndex={0}
                aria-label="Get insurance quote"
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Quote</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              tabIndex={0}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-white/10">
                  {navItems.map((item) => (
                    <div key={item.label} className="mb-2">
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(item.label)}
                            className="w-full flex items-center justify-between text-white hover:text-green-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 focus:outline-none focus:bg-white/5"
                            aria-expanded={activeDropdown === item.label}
                            aria-haspopup="true"
                            tabIndex={0}
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-8 overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <button
                                    key={child.label}
                                    onClick={() => handleNavClick(child.href)}
                                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-green-400 transition-colors focus:outline-none"
                                    tabIndex={0}
                                  >
                                    {child.icon}
                                    <span>{child.label}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="w-full flex items-center space-x-3 text-white hover:text-green-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 focus:outline-none focus:bg-white/5"
                          tabIndex={0}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile CTA Buttons */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                    <WalletButton className="w-full" />
                    
                    <button
                      onClick={openContactModal}
                      className="w-full flex items-center justify-center space-x-2 text-white hover:text-green-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 focus:outline-none focus:bg-white/5"
                      tabIndex={0}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Contact</span>
                    </button>
                    
                    <button
                      onClick={openQuoteModal}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Get Quote</span>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
                <p className="text-gray-300">Get in touch with our team</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold">800-MICRO-SEGURO</p>
                    <p className="text-gray-400 text-sm">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold">info@microseguro.com</p>
                    <p className="text-gray-400 text-sm">Response within 24h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold">CDMX, Mexico</p>
                    <p className="text-gray-400 text-sm">Visit our offices</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuoteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Get Your Quote</h2>
                <p className="text-gray-300">Choose how you'd like to get your insurance quote</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Get Quote via WhatsApp</span>
                </button>

                <button
                  onClick={() => router.push('/calculadora')}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Use Our Calculator</span>
                </button>

                <button
                  onClick={() => router.push('/evaluacion-riesgo')}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Risk Assessment</span>
                </button>
              </div>

              <button
                onClick={() => setShowQuoteModal(false)}
                className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-full font-semibold transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
