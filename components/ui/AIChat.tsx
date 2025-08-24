'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { AIChatAssistant, ChatResponse } from '@/lib/ai/chat-assistant'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your MicroInsurance AI assistant. How can I help you today? I can help you with:\n\n• Insurance quotes and coverage\n• Product information\n• Claims assistance\n• General questions about our services',
    sender: 'ai',
    timestamp: new Date()
  }
]

const quickReplies = [
  'Get insurance quote',
  'Product information',
  'Claims assistance', 
  'Contact support',
  'Use calculator',
  'How much does it cost?',
  'What coverage do I need?',
  'File a claim',
  'Check policy status',
  'Emergency contact'
]

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateAIResponse = async (userMessage: string): Promise<ChatResponse> => {
    return await AIChatAssistant.generateResponse(userMessage)
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(content)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:shadow-xl transition-all"
        aria-label="Open AI chat"
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                         className="fixed bottom-24 right-6 w-72 h-80 md:w-80 md:h-96 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col"
          >
                         {/* Chat Header */}
             <div className="flex items-center justify-between p-3 border-b border-gray-700">
               <div className="flex items-center space-x-2">
                 <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                   <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div>
                   <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                   <p className="text-green-400 text-xs flex items-center">
                     <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                     Online
                   </p>
                 </div>
               </div>
               
               <div className="flex items-center space-x-1">
                 <button
                   onClick={() => setIsMinimized(!isMinimized)}
                   className="p-1 text-gray-400 hover:text-white transition-colors"
                   aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                 >
                   {isMinimized ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                 </button>
                 <button
                   onClick={() => setIsOpen(false)}
                   className="p-1 text-gray-400 hover:text-white transition-colors"
                   aria-label="Close chat"
                 >
                   <X className="w-3 h-3" />
                 </button>
               </div>
             </div>

            {/* Chat Messages */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex-1 overflow-hidden flex flex-col"
                >
                                     <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                                                 <div
                           className={`max-w-[85%] p-2 rounded-xl ${
                             message.sender === 'user'
                               ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                               : 'bg-gray-800 text-gray-100'
                           }`}
                         >
                          <div className="flex items-start space-x-2">
                            {message.sender === 'ai' && (
                              <Bot className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            )}
                                                         <div className="whitespace-pre-wrap text-xs">
                               {message.content}
                             </div>
                          </div>
                                                     <div className={`text-xs mt-1 ${
                             message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                           }`}>
                             {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </div>
                        </div>
                      </motion.div>
                    ))}
                    
                                         {isLoading && (
                       <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="flex justify-start"
                       >
                         <div className="bg-gray-800 text-gray-100 p-2 rounded-xl">
                           <div className="flex items-center space-x-2">
                             <Bot className="w-4 h-4 text-green-400" />
                             <div className="flex items-center space-x-1">
                               <Loader2 className="w-4 h-4 animate-spin" />
                               <span className="text-xs">AI is typing...</span>
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                                     {/* Quick Replies */}
                   {messages.length === 1 && (
                     <div className="px-3 pb-3">
                       <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                         {quickReplies.map((reply) => (
                           <button
                             key={reply}
                             onClick={() => handleQuickReply(reply)}
                             className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-1.5 rounded-lg transition-colors"
                           >
                             {reply}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* AI Suggested Actions */}
                   {messages.length > 1 && messages[messages.length - 1].sender === 'ai' && (
                     <div className="px-3 pb-3">
                       <div className="flex flex-wrap gap-1">
                         {['Get Quote', 'Product Info', 'Contact Support', 'Use Calculator'].map((action) => (
                           <button
                             key={action}
                             onClick={() => handleQuickReply(action)}
                             className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded-lg transition-colors"
                           >
                             {action}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}

                                     {/* Input Area */}
                   <div className="p-3 border-t border-gray-700">
                     <div className="flex items-center space-x-2">
                       <input
                         ref={inputRef}
                         type="text"
                         value={inputValue}
                         onChange={(e) => setInputValue(e.target.value)}
                         onKeyPress={handleKeyPress}
                         placeholder="Type your message..."
                         className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                         disabled={isLoading}
                       />
                       <button
                         onClick={() => handleSendMessage(inputValue)}
                         disabled={!inputValue.trim() || isLoading}
                         className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                         aria-label="Send message"
                       >
                         <Send className="w-3 h-3" />
                       </button>
                     </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
