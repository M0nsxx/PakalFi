// Configuration validation for real integrations
export interface IntegrationConfig {
  name: string;
  required: boolean;
  apiKey: string;
  baseUrl: string;
  enabled: boolean;
}

export interface ContractConfig {
  name: string;
  address: string;
  chainId: number;
  deployed: boolean;
}

export class ConfigValidator {
  private integrations: IntegrationConfig[] = [
    {
      name: 'Envio Analytics',
      required: true,
      apiKey: process.env.ENVIO_API_KEY || '',
      baseUrl: process.env.ENVIO_API_URL || 'https://indexer.envio.dev',
      enabled: true
    },
    {
      name: 'Para Insurance',
      required: true,
      apiKey: process.env.PARA_API_KEY || '',
      baseUrl: process.env.PARA_API_URL || 'https://api.para.com',
      enabled: true
    },
    {
      name: 'SDG Impact',
      required: true,
      apiKey: process.env.BGA_API_KEY || '',
      baseUrl: process.env.BGA_API_URL || 'https://api.bga.com',
      enabled: true
    },
    {
      name: '0x Protocol',
      required: true,
      apiKey: process.env.NEXT_PUBLIC_0X_API_KEY || '',
      baseUrl: process.env.NEXT_PUBLIC_0X_API_URL || 'https://api.0x.org',
      enabled: true
    }
  ];

  private contracts: ContractConfig[] = [
    {
      name: 'Oracle',
      address: process.env.NEXT_PUBLIC_ORACLE_ADDRESS || '0xaF9bAD18233d180BB7F763A0be4A252bDf16c776',
      chainId: 10143,
      deployed: true
    },
    {
      name: 'Reinsurance Token',
      address: process.env.NEXT_PUBLIC_REINSURANCE_TOKEN_ADDRESS || '0x47EdA49ea71f20738085f8774Be3f881A02354Af',
      chainId: 10143,
      deployed: true
    },
    {
      name: 'Policy NFT',
      address: process.env.NEXT_PUBLIC_POLICY_NFT_ADDRESS || '0xdaAb335F3B2dAc3e963809EE7dD8102A890870a3',
      chainId: 10143,
      deployed: true
    },
    {
      name: 'Insurance Pool',
      address: process.env.NEXT_PUBLIC_INSURANCE_POOL_ADDRESS || '0x5b33069977773557D07023A73468fD16F83ebaea',
      chainId: 10143,
      deployed: true
    },
    {
      name: 'Gasless Payment Handler',
      address: process.env.NEXT_PUBLIC_GASLESS_PAYMENT_HANDLER_ADDRESS || '0xd5de766cdAAA47c9dB756c0f0c01d0F0494571D0',
      chainId: 10143,
      deployed: true
    },
    {
      name: 'Savings Goal Handler',
      address: process.env.NEXT_PUBLIC_SAVINGS_GOAL_HANDLER_ADDRESS || '0xE01592cE50FeFF1e9FB65888c66Dd5c6c4C85637',
      chainId: 10143,
      deployed: true
    }
  ];

  validateIntegrations(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const integration of this.integrations) {
      if (integration.required && !integration.apiKey) {
        errors.push(`${integration.name}: API key is required`);
      }
      
      if (integration.required && !integration.baseUrl) {
        errors.push(`${integration.name}: Base URL is required`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateContracts(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const contract of this.contracts) {
      if (contract.deployed && (!contract.address || contract.address === '0x0000000000000000000000000000000000000000')) {
        errors.push(`${contract.name}: Contract address is not deployed`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateEnvironment(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_MONAD_TESTNET_RPC',
      'NEXT_PUBLIC_MONAD_TESTNET_CHAIN_ID',
      'NEXT_PUBLIC_MONAD_TESTNET_EXPLORER'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        errors.push(`Environment variable ${envVar} is required`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateAll(): { valid: boolean; errors: string[] } {
    const integrationValidation = this.validateIntegrations();
    const contractValidation = this.validateContracts();
    const environmentValidation = this.validateEnvironment();

    const allErrors = [
      ...integrationValidation.errors,
      ...contractValidation.errors,
      ...environmentValidation.errors
    ];

    return {
      valid: allErrors.length === 0,
      errors: allErrors
    };
  }

  getStatus(): {
    integrations: IntegrationConfig[];
    contracts: ContractConfig[];
    environment: { valid: boolean; errors: string[] };
  } {
    return {
      integrations: this.integrations,
      contracts: this.contracts,
      environment: this.validateEnvironment()
    };
  }
}

// Export singleton instance
export const configValidator = new ConfigValidator();

// Validation helper functions
export function validateConfig() {
  return configValidator.validateAll();
}

export function getConfigStatus() {
  return configValidator.getStatus();
}

// Runtime validation for components
export function assertConfigValid() {
  const validation = validateConfig();
  if (!validation.valid) {
    throw new Error(`Configuration validation failed: ${validation.errors.join(', ')}`);
  }
}
