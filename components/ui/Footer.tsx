'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Heart,
  Globe,
  Users,
  FileText,
  TrendingUp,
  Building
} from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  products: [
    { name: 'Micro-Health', href: '/salud' },
    { name: 'Micro-Climatete', href: '/clima' },
    { name: 'Micro-Security', href: '/seguridad' },
    { name: 'Micro-Mobility', href: '/movilidad' }
  ],
  community: [
    { name: 'Statistics', href: '/estadisticas' },
    { name: 'Testimonials', href: '/testimonios' },
    { name: 'Groups', href: '/grupos' },
    { name: 'Blog', href: '/blog' }
  ],
  resources: [
    { name: 'Calculator', href: '/calculadora' },
    { name: 'Risk Assessment', href: '/evaluacion-riesgo' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Help Center', href: '/ayuda' }
  ],
  company: [
    { name: 'About Us', href: '/nosotros' },
    { name: 'Careers', href: '/carreras' },
    { name: 'Press', href: '/prensa' },
    { name: 'Contact', href: '/contacto' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/microseguro' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/microseguro' },
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/microseguro' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/microseguro' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/microseguro' }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  MicroInsurance
                </span>
              </div>
                             <p className="text-gray-400 mb-6 leading-relaxed">
                 Democratizing access to insurance in Mexico with blockchain technology. 
                 Intelligent, transparent, and accessible protection for everyone.
               </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>800-MICRO-SEGURO</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>info@microseguro.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>CDMX, México</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
                         <h3 className="text-white font-semibold mb-4 flex items-center">
               <Shield className="w-4 h-4 mr-2" />
               Products
             </h3>
             <ul className="space-y-3">
               {footerLinks.products.map((link) => (
                 <li key={link.name}>
                   <Link 
                     href={link.href}
                     className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                   >
                     <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
                         <h3 className="text-white font-semibold mb-4 flex items-center">
               <Users className="w-4 h-4 mr-2" />
               Community
             </h3>
             <ul className="space-y-3">
               {footerLinks.community.map((link) => (
                 <li key={link.name}>
                   <Link 
                     href={link.href}
                     className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                   >
                     <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
                         <h3 className="text-white font-semibold mb-4 flex items-center">
               <FileText className="w-4 h-4 mr-2" />
               Resources
             </h3>
             <ul className="space-y-3">
               {footerLinks.resources.map((link) => (
                 <li key={link.name}>
                   <Link 
                     href={link.href}
                     className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                   >
                     <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
                         <h3 className="text-white font-semibold mb-4 flex items-center">
               <Building className="w-4 h-4 mr-2" />
               Company
             </h3>
             <ul className="space-y-3">
               {footerLinks.company.map((link) => (
                 <li key={link.name}>
                   <Link 
                     href={link.href}
                     className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                   >
                     <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
                         <h3 className="text-white text-xl font-semibold mb-2">
               Stay Informed
             </h3>
             <p className="text-gray-400 mb-6">
               Receive the latest news about micro-insurance and product updates
             </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                             <input
                 type="email"
                 placeholder="Your email address"
                 className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
               />
               <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all">
                 Subscribe
               </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-gray-400 text-sm"
            >
                                           <span>&copy; {currentYear} MicroInsurance. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made By <a href="https://t.me/Vai0sx" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">@Vaios0x</a></span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-sm"
            >
                             <Link href="/privacidad" className="text-gray-400 hover:text-green-400 transition-colors">
                 Privacy Policy
               </Link>
               <Link href="/terminos" className="text-gray-400 hover:text-green-400 transition-colors">
                 Terms of Service
               </Link>
               <Link href="/cookies" className="text-gray-400 hover:text-green-400 transition-colors">
                 Cookies
               </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
