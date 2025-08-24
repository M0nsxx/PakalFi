'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react'
import { getContracts } from '@/config/contracts'

export function WhatsAppWidget() {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
  }>>([
    {
      id: '1',
              text: 'Hello! I\'m your PakalFi assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const quickReplies = [
    'Get insurance quote',
    'View my policies',
    'File a claim',
    'Payment information',
    'Contact agent'
  ]
  
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    
    // Simulate bot response
    setTimeout(async () => {
      const botResponse = await generateBotResponse(message)
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }
  
  const generateBotResponse = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase()
    
    try {
      // Get deployed contracts for real data
      const contracts = getContracts(10143) // Monad testnet
      
      if (lowerMessage.includes('quote') || lowerMessage.includes('price')) {
        if (contracts?.insurancePool) {
          return 'Perfect! I\'m connected to our smart contracts on Monad testnet. To get your insurance quote I need some information:\n\n1️⃣ What type of insurance are you interested in? (Health, Climate, Security, Mobility)\n2️⃣ What is your age?\n3️⃣ What city do you live in?\n\nI\'ll calculate your premium using our real-time oracle data and smart contracts.'
        }
        return 'Perfect! To get your insurance quote I need some information:\n\n1️⃣ What type of insurance are you interested in? (Health, Climate, Security, Mobility)\n2️⃣ What is your age?\n3️⃣ What city do you live in?\n\nAnswer these questions and I\'ll give you a personalized quote.'
      }
      
      if (lowerMessage.includes('policy') || lowerMessage.includes('policies')) {
        if (contracts?.policyNFT) {
          return 'To view your policies, I need to verify your identity. Your policies are stored as NFTs on the blockchain. Please send your registered phone number or policy number. Contract: ' + contracts.policyNFT.substring(0, 10) + '...'
        }
        return 'To view your policies, I need to verify your identity. Please send your registered phone number or policy number.'
      }
      
      if (lowerMessage.includes('claim') || lowerMessage.includes('incident')) {
        if (contracts?.oracle) {
          return 'I understand you need to file a claim. Our oracle contract will automatically verify your claim using real-world data. Let me help you process it:\n\n1️⃣ What type of incident occurred?\n2️⃣ When did it happen?\n3️⃣ Do you have any documents or photos?\n\nOracle contract: ' + contracts.oracle.substring(0, 10) + '...'
        }
        return 'I understand you need to file a claim. Let me help you process it:\n\n1️⃣ What type of incident occurred?\n2️⃣ When did it happen?\n3️⃣ Do you have any documents or photos?\n\nOnce I have this information, I\'ll process your claim automatically.'
      }
      
      if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
        if (contracts?.gaslessPaymentHandler) {
          return 'You have several options to pay your premium:\n\n💳 Credit/debit card\n🏪 OXXO (barcode)\n📱 SPEI\n💰 Cash at branch\n🔗 Gasless payments (no gas fees)\n\nOur gasless payment system is live at: ' + contracts.gaslessPaymentHandler.substring(0, 10) + '...'
        }
        return 'You have several options to pay your premium:\n\n💳 Credit/debit card\n🏪 OXXO (barcode)\n📱 SPEI\n💰 Cash at branch\n\nWhich do you prefer? I\'ll send you the details.'
      }
      
      if (lowerMessage.includes('agent') || lowerMessage.includes('human')) {
        return 'I\'ll connect you with a specialized agent. You\'ll receive a call from our team in less than 2 minutes. Is that okay?'
      }
      
      return 'Thank you for your message. Can I help you with any of these options?\n\n• Get insurance quote\n• View your policies\n• File a claim\n• Payment information\n• Contact agent'
    } catch (error) {
      console.error('Error generating bot response:', error)
      return 'Thank you for your message. Can I help you with any of these options?\n\n• Get insurance quote\n• View your policies\n• File a claim\n• Payment information\n• Contact agent'
    }
  }
  
  const openWhatsApp = () => {
    const phoneNumber = '525512345678'
    const message = encodeURIComponent('Hello, I\'m interested in getting an insurance quote with PakalFi')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }
  
  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
      
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">PakalFi</h3>
                  <p className="text-sm opacity-90">Virtual assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1" suppressHydrationWarning>
                      {isMounted ? message.timestamp.toLocaleTimeString() : '00:00:00'}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(reply)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(inputMessage)}
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Info */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            className="fixed bottom-6 left-6 bg-white rounded-2xl shadow-lg p-4 z-40"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-500" />
                <span>55 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-green-500" />
                <span>hello@pakalfi.mx</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-green-500" />
                <span>24/7 available</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
