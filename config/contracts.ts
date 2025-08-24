// Direcciones de los contratos desplegados en Monad Testnet
export const CONTRACTS = {
  // Monad Testnet - Deployed Contracts
  monadTestnet: {
    oracle: "0xaF9bAD18233d180BB7F763A0be4A252bDf16c776",
    reinsuranceToken: "0x47EdA49ea71f20738085f8774Be3f881A02354Af",
    policyNFT: "0xdaAb335F3B2dAc3e963809EE7dD8102A890870a3",
    insurancePool: "0x5b33069977773557D07023A73468fD16F83ebaea",
    gaslessPaymentHandler: "0xd5de766cdAAA47c9dB756c0f0c01d0F0494571D0",
    savingsGoalHandler: "0xE01592cE50FeFF1e9FB65888c66Dd5c6c4C85637"
  },
  
  // Polygon Mumbai (for Asia expansion)
  polygonMumbai: {
    oracle: "0x0000000000000000000000000000000000000000", // To be deployed
    reinsuranceToken: "0x0000000000000000000000000000000000000000", // To be deployed
    policyNFT: "0x0000000000000000000000000000000000000000", // To be deployed
    insurancePool: "0x0000000000000000000000000000000000000000", // To be deployed
    gaslessPaymentHandler: "0x0000000000000000000000000000000000000000", // To be deployed
    savingsGoalHandler: "0x0000000000000000000000000000000000000000" // To be deployed
  },
  
  // Arbitrum Sepolia (for Africa expansion)
  arbitrumSepolia: {
    oracle: "0x0000000000000000000000000000000000000000", // To be deployed
    reinsuranceToken: "0x0000000000000000000000000000000000000000", // To be deployed
    policyNFT: "0x0000000000000000000000000000000000000000", // To be deployed
    insurancePool: "0x0000000000000000000000000000000000000000", // To be deployed
    gaslessPaymentHandler: "0x0000000000000000000000000000000000000000", // To be deployed
    savingsGoalHandler: "0x0000000000000000000000000000000000000000" // To be deployed
  }
}

export const NETWORKS = {
  monadTestnet: {
    chainId: 10143,
    name: "Monad Testnet",
    rpcUrl: "https://testnet-rpc.monad.xyz/",
    explorer: "https://explorer.testnet.monad.xyz",
    nativeCurrency: {
      name: "MONAD",
      symbol: "MONAD",
      decimals: 18
    }
  },
  polygonMumbai: {
    chainId: 80001,
    name: "Polygon Mumbai",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    explorer: "https://mumbai.polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    }
  },
  arbitrumSepolia: {
    chainId: 421614,
    name: "Arbitrum Sepolia",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    explorer: "https://sepolia.arbiscan.io",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    }
  }
}

// Get contracts for current network
export function getContracts(chainId: number) {
  switch (chainId) {
    case 10143:
      return CONTRACTS.monadTestnet;
    case 80001:
      return CONTRACTS.polygonMumbai;
    case 421614:
      return CONTRACTS.arbitrumSepolia;
    default:
      return CONTRACTS.monadTestnet; // Default to Monad Testnet
  }
}

// Get network info for chain ID
export function getNetwork(chainId: number) {
  switch (chainId) {
    case 10143:
      return NETWORKS.monadTestnet;
    case 80001:
      return NETWORKS.polygonMumbai;
    case 421614:
      return NETWORKS.arbitrumSepolia;
    default:
      return NETWORKS.monadTestnet; // Default to Monad Testnet
  }
}

// Validate contract addresses
export function validateContracts(contracts: any): boolean {
  const requiredContracts = [
    'oracle',
    'reinsuranceToken', 
    'policyNFT',
    'insurancePool',
    'gaslessPaymentHandler',
    'savingsGoalHandler'
  ];

  for (const contract of requiredContracts) {
    if (!contracts[contract] || contracts[contract] === "0x0000000000000000000000000000000000000000") {
      console.warn(`Missing or invalid contract address for ${contract}`);
      return false;
    }
  }

  return true;
}

// Get contract ABI (placeholder for now)
export function getContractABI(contractName: string): any[] {
  // This would typically import the actual ABI from typechain-types
  // For now, return an empty array as placeholder
  return [];
}

// Contract deployment verification
export const DEPLOYMENT_INFO = {
  network: "monadTestnet",
  chainId: 10143,
  deployer: "0x703b1eAdE96B27867327Ad5AC2fE788342C6117A",
  deploymentTime: "2025-08-24T07:30:16.098Z",
  features: {
    multiChain: true,
    multiCurrency: true,
    regionalPools: true,
    gaslessPayments: true,
    savingsGoals: true,
    crossChainMessaging: true,
    sdgTracking: true,
    parametricTriggers: true
  }
};

// Export default contracts for easy import
export default CONTRACTS.monadTestnet;
