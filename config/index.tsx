import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Definir la cadena de Monad testnet
export const monadTestnet = {
  id: 10143, // ID correcto para Monad testnet
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MONAD',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.monad.xyz'] },
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    etherscan: { name: 'Monad Explorer', url: 'https://explorer.testnet.monad.xyz' },
    default: { name: 'Monad Explorer', url: 'https://explorer.testnet.monad.xyz' },
  },
} as const

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'cb15092896929e9aa4d5afdc5d03b86f'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [monadTestnet]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
