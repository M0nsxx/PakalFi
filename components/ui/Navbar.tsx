'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Shield, 
  ChevronDown, 
  User,
  Wallet,
  Settings,
  HelpCircle,
  FileText,
  TrendingUp,
  Users,
  Building,
  Clock,
  Play
} from 'lucide-react'
import { WalletButton } from './WalletButton'
import { MonadStatus } from './MonadStatus'
import { PWAInstallButton } from './PWAInstallButton'
import { useWallet } from '@/hooks/useWallet'
import { Button } from './Button'

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
  { label: 'Demo', href: '/hackathon-demo', icon: <Play className="w-4 h-4" /> },
  { label: 'About Us', href: '/nosotros', icon: <Building className="w-4 h-4" /> },
  { label: 'Dashboard', href: '/dashboard', icon: <TrendingUp className="w-4 h-4" /> }
]

export function Navbar() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setActiveDropdown(null)
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Monad Status */}
            <div className="flex items-center space-x-4">
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
                  PakalFi
                </span>
              </motion.button>

              {/* Monad Status Indicators */}
              <div className="hidden lg:flex">
                <MonadStatus />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => {
                // Hide Dashboard if not connected
                if (item.label === 'Dashboard' && !isConnected) {
                  return null
                }
                return (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors py-2 px-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm"
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
                      className="flex items-center space-x-1 text-white hover:text-green-400 transition-colors py-2 px-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm"
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
              )
              })}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <WalletButton className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full font-medium hover:shadow-lg transition-all text-sm" />
              
              <PWAInstallButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-white hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg hover:bg-white/10"
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

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Menu Content */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-md border-b border-white/10 shadow-2xl z-50"
                >
                <div className="px-4 py-6 max-h-[80vh] overflow-y-auto">
                  {/* Mobile Monad Status */}
                  <div className="mb-6">
                    <MonadStatus />
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="space-y-2 mb-6">
                    {navItems.map((item) => {
                      // Hide Dashboard if not connected
                      if (item.label === 'Dashboard' && !isConnected) {
                        return null
                      }
                      return (
                      <div key={item.label} className="border-b border-white/5 last:border-b-0">
                        {item.children ? (
                          <div>
                            <button
                              onClick={() => toggleDropdown(item.label)}
                              className="w-full flex items-center justify-between text-white hover:text-green-400 transition-colors py-4 px-3 rounded-lg hover:bg-white/5 focus:outline-none focus:bg-white/5"
                              aria-expanded={activeDropdown === item.label}
                              aria-haspopup="true"
                              tabIndex={0}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {activeDropdown === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-gray-800/30 rounded-lg mx-3 mb-2"
                                >
                                  {item.children.map((child, index) => (
                                    <button
                                      key={child.label}
                                      onClick={() => handleNavClick(child.href)}
                                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/5 first:rounded-t-lg last:rounded-b-lg"
                                      tabIndex={0}
                                    >
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        {child.icon}
                                      </div>
                                      <span className="text-sm">{child.label}</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className="w-full flex items-center space-x-3 text-white hover:text-green-400 transition-colors py-4 px-3 rounded-lg hover:bg-white/5 focus:outline-none focus:bg-white/5"
                            tabIndex={0}
                          >
                            <div className="w-5 h-5 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </button>
                        )}
                      </div>
                    )
                    })}
                  </div>
                  
                  {/* Mobile CTA Buttons */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <WalletButton className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full font-medium hover:shadow-lg transition-all" />
                    
                    <PWAInstallButton className="w-full" />
                  </div>
                </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>


    </>
  )
}
