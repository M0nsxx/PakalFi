'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useReownInsurance } from '@/lib/integrations/reownIntegration'

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })
  const { switchChain } = useSwitchChain()
  
  // Reown AppKit integration
  const { appKit, isConnected: reownConnected, userData, connect: reownConnect, disconnect: reownDisconnect } = useReownInsurance()
  
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // Use Reown connection status if available, otherwise fall back to wagmi
  const isWalletConnected = reownConnected || isConnected
  const walletAddress = address
  const walletUserData = userData

  // Función para limpiar propuestas expiradas
  const cleanupExpiredProposals = () => {
    if (typeof window !== 'undefined') {
      try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.includes('wc_') || key.includes('walletconnect')) {
            console.log('🧹 Limpiando propuesta expirada:', key)
            localStorage.removeItem(key)
          }
        })
        console.log('✅ Propuestas expiradas limpiadas')
      } catch (error) {
        console.warn('⚠️ Error limpiando propuestas:', error)
      }
    }
  }

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      setConnectionError(null)
      
      // Limpiar propuestas expiradas antes de conectar
      cleanupExpiredProposals()
      
      // Obtener el AppKit global
      const globalAppKit = (typeof window !== 'undefined' && (window as any).reownAppKit) || appKit
      
      // Try Reown AppKit first
      if (globalAppKit) {
        console.log('🔗 Conectando con Reown AppKit...')
        await reownConnect()
      } else {
        console.log('🔗 Fallback a wagmi connectors...')
        // Fallback to wagmi connectors
        if (connectors.length > 0 && connectors[0]) {
          await connect({ connector: connectors[0] })
        }
      }
    } catch (error) {
      console.error('❌ Error connecting wallet:', error)
      
      // Si es un error de propuesta expirada, limpiar y reintentar
      if (error instanceof Error && error.message.includes('Proposal expired')) {
        console.log('🔄 Propuesta expirada, limpiando y reintentando...')
        cleanupExpiredProposals()
        setConnectionError('Propuesta expirada. Por favor, intenta de nuevo.')
      } else {
        setConnectionError(error instanceof Error ? error.message : 'Failed to connect wallet')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      console.log('🔌 Desconectando wallet...')
      
      // Limpiar propuestas expiradas al desconectar
      cleanupExpiredProposals()
      
      // Obtener el AppKit global
      const globalAppKit = (typeof window !== 'undefined' && (window as any).reownAppKit) || appKit
      
      // Try Reown disconnect first
      if (globalAppKit) {
        console.log('🔌 Desconectando de Reown AppKit...')
        await reownDisconnect()
      } else {
        console.log('🔌 Fallback a wagmi disconnect...')
        // Fallback to wagmi disconnect
        disconnect()
      }
      
      console.log('✅ Wallet desconectada correctamente')
    } catch (error) {
      console.error('❌ Error disconnecting wallet:', error)
      // Forzar desconexión de wagmi como fallback
      try {
        disconnect()
      } catch (fallbackError) {
        console.error('❌ Error en fallback disconnect:', fallbackError)
      }
    }
  }

  const openWalletModal = async () => {
    try {
      console.log('🚀 Abriendo modal de Reown AppKit...')
      
      // Limpiar propuestas expiradas antes de abrir el modal
      cleanupExpiredProposals()
      
      // Obtener el AppKit global
      const globalAppKit = (typeof window !== 'undefined' && (window as any).reownAppKit) || appKit
      
      if (globalAppKit) {
        console.log('✅ AppKit encontrado, abriendo modal...')
        // Abrir el modal de Reown con vista de conexión
        await globalAppKit.open({ 
          view: 'Connect',
          // Forzar que se muestre el modal de login social
          includeWalletIds: [
            'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
            '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
            'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
          ]
        })
        console.log('✅ Modal de Reown abierto correctamente')
      } else {
        console.log('⚠️ AppKit no encontrado, fallback a connectWallet...')
        await connectWallet()
      }
    } catch (error) {
      console.error('❌ Error opening wallet modal:', error)
      
      // Si es un error de propuesta expirada, limpiar y reintentar
      if (error instanceof Error && error.message.includes('Proposal expired')) {
        console.log('🔄 Propuesta expirada, limpiando y reintentando...')
        cleanupExpiredProposals()
        setConnectionError('Propuesta expirada. Por favor, intenta de nuevo.')
      } else {
        // Fallback a connectWallet si falla el modal
        try {
          await connectWallet()
        } catch (fallbackError) {
          console.error('❌ Error en fallback connectWallet:', fallbackError)
        }
      }
    }
  }

  const switchToMonad = async () => {
    try {
      await switchChain({ chainId: 10143 }) // Monad testnet
    } catch (error) {
      console.error('❌ Error switching to Monad:', error)
    }
  }

  // Clear error after 5 seconds
  useEffect(() => {
    if (connectionError) {
      const timer = setTimeout(() => {
        setConnectionError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [connectionError])

  return {
    address: walletAddress,
    isConnected: isWalletConnected,
    isConnecting: isConnecting || isPending,
    error: connectionError || error,
    connectWallet,
    disconnectWallet,
    openWalletModal,
    connectors,
    chainId,
    balance: balance?.formatted || '0',
    userData: walletUserData,
    appKit: (typeof window !== 'undefined' && (window as any).reownAppKit) || appKit,
    switchToMonad,
    cleanupExpiredProposals
  }
}
