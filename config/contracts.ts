// Direcciones de los contratos desplegados en Monad Testnet
export const DEPLOYED_CONTRACTS = {
  // Network Info
  NETWORK: 'monad-testnet',
  CHAIN_ID: 10143,
  RPC_URL: 'https://testnet-rpc.monad.xyz/',
  EXPLORER_URL: 'https://explorer.testnet.monad.xyz',
  
  // Deployed Contract Addresses
  ORACLE: '0x9b9fD4934ba07cDf95911A20FD2FA4662C0ec589',
  REINSURANCE_TOKEN: '0xf40eF74BB8bCfacD5CBB08F950B5C73F59e99D19',
  POLICY_NFT: '0x08d8F4DA2022898bbEF64100997C55a96ab35b87',
  INSURANCE_POOL: '0x91719B6256d288f2c1247Dd8Bfb4E71032d4a45d',
  
  // Deployment Info
  DEPLOYER: '0x8eC3829793D0a2499971d0D853935F17aB52F800',
  DEPLOYMENT_DATE: '2025-08-23',
  
  // Explorer Links
  ORACLE_EXPLORER: 'https://explorer.testnet.monad.xyz/address/0x9b9fD4934ba07cDf95911A20FD2FA4662C0ec589',
  REINSURANCE_TOKEN_EXPLORER: 'https://explorer.testnet.monad.xyz/address/0xf40eF74BB8bCfacD5CBB08F950B5C73F59e99D19',
  POLICY_NFT_EXPLORER: 'https://explorer.testnet.monad.xyz/address/0x08d8F4DA2022898bbEF64100997C55a96ab35b87',
  INSURANCE_POOL_EXPLORER: 'https://explorer.testnet.monad.xyz/address/0x91719B6256d288f2c1247Dd8Bfb4E71032d4a45d',
  
  // Contract ABIs (importar desde typechain)
  ABIS: {
    ORACLE: require('../typechain-types/contracts/Oracle.sol/Oracle.json').abi,
    REINSURANCE_TOKEN: require('../typechain-types/contracts/ReinsuranceToken.sol/ReinsuranceToken.json').abi,
    POLICY_NFT: require('../typechain-types/contracts/PolicyNFT.sol/PolicyNFT.json').abi,
    INSURANCE_POOL: require('../typechain-types/contracts/InsurancePool.sol/InsurancePool.json').abi,
  }
} as const

// Helper functions para interactuar con los contratos
export const getContractAddress = (contractName: keyof typeof DEPLOYED_CONTRACTS) => {
  return DEPLOYED_CONTRACTS[contractName]
}

export const getExplorerLink = (address: string) => {
  return `${DEPLOYED_CONTRACTS.EXPLORER_URL}/address/${address}`
}

export const getTransactionLink = (txHash: string) => {
  return `${DEPLOYED_CONTRACTS.EXPLORER_URL}/tx/${txHash}`
}
