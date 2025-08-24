'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function useWallet() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  const connectWallet = async () => {
    if (connectors.length > 0 && connectors[0]) {
      connect({ connector: connectors[0] })
    }
  }

  const disconnectWallet = () => {
    disconnect()
  }

  const openWalletModal = () => {
    // Esta función se puede usar para abrir un modal personalizado
    connectWallet()
  }

  return {
    address,
    isConnected,
    isConnecting: isPending,
    error,
    connectWallet,
    disconnectWallet,
    openWalletModal,
    connectors,
    chainId,
    balance: balance?.formatted || '0'
  }
}
