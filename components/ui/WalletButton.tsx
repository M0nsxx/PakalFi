'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, User, LogOut, Copy, Check, Loader2, AlertTriangle } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'

export function WalletButton({ className = '' }: { className?: string }) {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
  }

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy address:', err)
      }
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${className}`}
        >
          <User className="w-4 h-4" />
          <span>{formatAddress(address)}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700"
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Wallet Conectada</p>
                    <p className="text-gray-400 text-sm">{formatAddress(address)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={copyAddress}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar dirección</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDisconnect}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Desconectar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <appkit-button className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all ${className}`}>
      <Wallet className="w-4 h-4" />
      <span>Conectar Wallet</span>
    </appkit-button>
  )
}

