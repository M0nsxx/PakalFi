'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, User, LogOut, Copy, Check, Loader2, AlertTriangle, Shield } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWallet } from '@/hooks/useWallet'

export function WalletButton({ className = '' }: { className?: string }) {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    error, 
    userData, 
    connectWallet, 
    disconnectWallet, 
    openWalletModal,
    switchToMonad 
  } = useWallet()
  
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDisconnect = async () => {
    await disconnectWallet()
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

  // Show loading state
  if (isConnecting) {
    return (
      <button
        disabled
        className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg opacity-75 cursor-not-allowed ${className}`}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Conectando...</span>
      </button>
    )
  }

  // Show error state
  if (error) {
    return (
      <button
        onClick={connectWallet}
        className={`flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${className}`}
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Reintentar</span>
      </button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${className}`}
        >
          {userData ? (
            <User className="w-4 h-4" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
          <span>
            {userData ? userData.name : formatAddress(address)}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50"
            >
              <div className="p-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    {userData ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Wallet className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {userData ? userData.name : 'Wallet Conectada'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {userData ? userData.email : formatAddress(address)}
                    </p>
                    {userData && (
                      <p className="text-green-400 text-xs">
                        Conectado con Reown AppKit
                      </p>
                    )}
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                  <p className="text-gray-400 text-xs mb-1">Dirección de Wallet</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-mono">{formatAddress(address)}</p>
                    <button
                      onClick={copyAddress}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={switchToMonad}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Cambiar a Monad</span>
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

  // Show connect button with Reown AppKit
  return (
    <button
      onClick={openWalletModal}
      className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all ${className}`}
    >
      <Wallet className="w-4 h-4" />
      <span>Conectar Wallet</span>
    </button>
  )
}

