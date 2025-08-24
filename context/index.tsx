'use client'

import { wagmiAdapter, projectId, monadTestnet } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'MicroInsurance - Global Platform',
  description: 'Democratizing insurance access for 1.7B unbanked people globally',
  url: 'https://microinsurance.global',
  icons: ['https://microinsurance.global/icon.png']
}

// Create the modal with enhanced features
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [monadTestnet],
  defaultNetwork: monadTestnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: true,
    socials: ['google', 'apple'],
    swaps: true,
    onramp: true
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#10b981',
    '--w3m-color-mix-strength': 40,
    '--w3m-font-family': 'Inter, sans-serif'
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
