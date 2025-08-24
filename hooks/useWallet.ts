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

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      setConnectionError(null)
      
      // Try Reown AppKit first
      if (appKit) {
        await reownConnect()
      } else {
        // Fallback to wagmi connectors
        if (connectors.length > 0 && connectors[0]) {
          await connect({ connector: connectors[0] })
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      // Try Reown disconnect first
      if (appKit) {
        await reownDisconnect()
      } else {
        // Fallback to wagmi disconnect
        disconnect()
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  const openWalletModal = () => {
    // This function opens the Reown AppKit modal
    if (appKit) {
      reownConnect()
    } else {
      connectWallet()
    }
  }

  const switchToMonad = async () => {
    try {
      await switchChain({ chainId: 10143 }) // Monad testnet
    } catch (error) {
      console.error('Error switching to Monad:', error)
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
    appKit,
    switchToMonad
  }
}
