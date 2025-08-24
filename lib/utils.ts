import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ethers } from 'ethers';
import { getContracts, validateContracts } from '@/config/contracts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'MXN') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function generatePolicyNumber() {
  return 'MSP-' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

export function calculateAge(birthDate: Date) {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function validatePhoneNumber(phone: string) {
  const phoneRegex = /^(\+52)?[1-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Contract interaction utilities
export class ContractUtils {
  private provider: ethers.Provider;
  private contracts: any;

  constructor(chainId: number = 10143) {
    this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_MONAD_TESTNET_RPC);
    this.contracts = getContracts(chainId);
    
    if (!validateContracts(this.contracts)) {
      console.error('Invalid contract configuration');
    }
  }

  // Get contract instance
  async getContract(contractName: string, signer?: ethers.Signer) {
    try {
      const address = this.contracts[contractName];
      if (!address) {
        throw new Error(`Contract ${contractName} not found`);
      }

      // Import contract ABI from typechain-types
      const { abi } = await import(`@/typechain-types/contracts/${contractName}.ts`);
      
      if (signer) {
        return new ethers.Contract(address, abi, signer);
      } else {
        return new ethers.Contract(address, abi, this.provider);
      }
    } catch (error) {
      console.error(`Error getting contract ${contractName}:`, error);
      throw error;
    }
  }

  // Get all contract instances
  async getAllContracts(signer?: ethers.Signer) {
    const contractNames = [
      'oracle',
      'reinsuranceToken',
      'policyNFT', 
      'insurancePool',
      'gaslessPaymentHandler',
      'savingsGoalHandler'
    ];

    const contracts: any = {};
    
    for (const name of contractNames) {
      try {
        contracts[name] = await this.getContract(name, signer);
      } catch (error) {
        console.error(`Failed to get contract ${name}:`, error);
      }
    }

    return contracts;
  }

  // Validate contract deployment
  async validateDeployment(): Promise<boolean> {
    try {
      const contracts = await this.getAllContracts();
      
      for (const [name, contract] of Object.entries(contracts)) {
        if (!contract) {
          console.error(`Contract ${name} is not deployed`);
          return false;
        }

        // Try to call a basic function to verify contract is working
        try {
          if (name === 'policyNFT') {
            await contract.name();
          } else if (name === 'reinsuranceToken') {
            await contract.name();
          } else if (name === 'insurancePool') {
            await contract.MIN_PREMIUM();
          }
        } catch (error) {
          console.error(`Contract ${name} validation failed:`, error);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Deployment validation failed:', error);
      return false;
    }
  }

  // Get contract addresses
  getContractAddresses() {
    return this.contracts;
  }

  // Format contract address for display
  formatAddress(address: string): string {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  // Get explorer URL for contract
  getExplorerUrl(address: string, chainId: number = 10143): string {
    const networks = {
      10143: 'https://explorer.testnet.monad.xyz/address/',
      80001: 'https://mumbai.polygonscan.com/address/',
      421614: 'https://sepolia.arbiscan.io/address/'
    };
    
    return `${networks[chainId as keyof typeof networks] || networks[10143]}${address}`;
  }
}

// Utility functions for contract interactions
export async function createPolicy(
  params: {
    insuranceType: number;
    premium: string;
    duration: number;
    metadata: string;
  },
  signer: ethers.Signer
) {
  try {
    const contractUtils = new ContractUtils();
    const insurancePool = await contractUtils.getContract('insurancePool', signer);
    
    const tx = await insurancePool.createPolicy(
      params.insuranceType,
      ethers.parseEther(params.premium),
      params.duration,
      params.metadata,
      { value: ethers.parseEther(params.premium) }
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
}

export async function getPolicyInfo(policyId: number) {
  try {
    const contractUtils = new ContractUtils();
    const insurancePool = await contractUtils.getContract('insurancePool');
    
    const policy = await insurancePool.policies(policyId);
    return policy;
  } catch (error) {
    console.error('Error getting policy info:', error);
    throw error;
  }
}

export async function getUserPolicies(userAddress: string) {
  try {
    const contractUtils = new ContractUtils();
    const insurancePool = await contractUtils.getContract('insurancePool');
    
    const policyIds = await insurancePool.userPolicies(userAddress);
    const policies = [];
    
    for (const id of policyIds) {
      const policy = await insurancePool.policies(id);
      policies.push({
        id: id.toString(),
        ...policy
      });
    }
    
    return policies;
  } catch (error) {
    console.error('Error getting user policies:', error);
    throw error;
  }
}

// Gasless payment utilities
export async function processGaslessPayment(
  params: {
    payer: string;
    recipient: string;
    amount: string;
    currency: string;
    signature: string;
  },
  signer: ethers.Signer
) {
  try {
    const contractUtils = new ContractUtils();
    const gaslessHandler = await contractUtils.getContract('gaslessPaymentHandler', signer);
    
    const tx = await gaslessHandler.processGaslessPayment(
      params.payer,
      params.recipient,
      ethers.parseEther(params.amount),
      params.currency,
      params.signature
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error processing gasless payment:', error);
    throw error;
  }
}

// Savings goal utilities
export async function createSavingsGoal(
  params: {
    targetAmount: string;
    monthlyDeposit: string;
    insuranceType: string;
    deadline: number;
  },
  signer: ethers.Signer
) {
  try {
    const contractUtils = new ContractUtils();
    const savingsHandler = await contractUtils.getContract('savingsGoalHandler', signer);
    
    const tx = await savingsHandler.createSavingsGoal(
      ethers.parseEther(params.targetAmount),
      ethers.parseEther(params.monthlyDeposit),
      params.insuranceType,
      params.deadline
    );
    
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error creating savings goal:', error);
    throw error;
  }
}

// Oracle utilities
export async function getOracleData(dataType: string) {
  try {
    const contractUtils = new ContractUtils();
    const oracle = await contractUtils.getContract('oracle');
    
    const data = await oracle.getData(dataType);
    return data;
  } catch (error) {
    console.error('Error getting oracle data:', error);
    throw error;
  }
}

// Reinsurance utilities
export async function getReinsurancePoolInfo(poolId: number) {
  try {
    const contractUtils = new ContractUtils();
    const reinsuranceToken = await contractUtils.getContract('reinsuranceToken');
    
    const pool = await reinsuranceToken.pools(poolId);
    return pool;
  } catch (error) {
    console.error('Error getting reinsurance pool info:', error);
    throw error;
  }
}

// Export default instance
export const contractUtils = new ContractUtils();
