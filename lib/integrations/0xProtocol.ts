import { ethers } from 'ethers';
import { getContracts } from '@/config/contracts';

export interface PremiumPayment {
  policyHolder: string;
  premiumAmount: string;
  insuranceType: string;
  currency: string;
  region?: string;
}

export interface ClaimPayout {
  claimId: string;
  beneficiary: string;
  amount: string;
  preferredCurrency: string;
  region?: string;
}

export interface ReinsuranceSettlement {
  reinsurerId: string;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  region?: string;
}

export interface SwapQuote {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  gasCost: string;
  gaslessSupported: boolean;
  processingTime: string;
}

export class ZeroXInsuranceIntegration {
  private apiKey: string;
  private baseUrl: string;
  private provider: ethers.Provider;
  private contracts: any;
  private chainId: number;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_0X_API_KEY || '';
    this.baseUrl = 'https://api.0x.org';
    this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_MONAD_TESTNET_RPC);
    this.contracts = getContracts(10143); // Monad testnet chain ID
    this.chainId = 10143; // Monad testnet
  }

  // GASLESS PREMIUM PAYMENTS - Updated for 0x API v2
  async executeGaslessPremiumPayment(params: PremiumPayment) {
    try {
      // Step 1: Get swap quote using our API endpoint
      const quoteResponse = await fetch(`/api/0x/swap?sellToken=USDC&buyToken=${params.currency || 'MXN'}&sellAmount=${params.premiumAmount}&takerAddress=${params.policyHolder}&slippagePercentage=1`);
      
      if (!quoteResponse.ok) {
        throw new Error('Failed to get swap quote');
      }

      const swapQuote = await quoteResponse.json();

      // Step 2: Execute gasless transaction using our API endpoint
      const gaslessResponse = await fetch('/api/0x/gasless', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trade: swapQuote,
          signature: await this.signWithBiometrics(),
          metadata: {
            insuranceType: params.insuranceType,
            recurring: true,
            policyHolder: params.policyHolder,
            gaslessPaymentHandler: this.contracts.gaslessPaymentHandler,
            region: params.region || 'LATAM',
            type: 'premium_payment'
          }
        })
      });

      if (!gaslessResponse.ok) {
        throw new Error(`Gasless payment failed: ${gaslessResponse.statusText}`);
      }

      const result = await gaslessResponse.json();
      
      // Track analytics
      this.trackGaslessPayment({
        amount: params.premiumAmount,
        insuranceType: params.insuranceType,
        gasSaved: result.insurance?.gasSaved || '0.001',
        success: true,
        region: params.region || 'LATAM'
      });

      return result;
    } catch (error) {
      console.error('Gasless premium payment error:', error);
      this.trackGaslessPayment({
        amount: params.premiumAmount,
        insuranceType: params.insuranceType,
        gasSaved: '0',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        region: params.region || 'LATAM'
      });
      throw error;
    }
  }

  // INSTANT CLAIM PAYOUTS - Updated for 0x API v2
  async processGaslessClaim(params: ClaimPayout) {
    try {
      // Step 1: Get swap quote for claim payout
      const quoteResponse = await fetch(`/api/0x/swap?sellToken=USDC&buyToken=${params.preferredCurrency}&sellAmount=${params.amount}&takerAddress=${params.beneficiary}&slippagePercentage=1`);
      
      if (!quoteResponse.ok) {
        throw new Error('Failed to get swap quote for claim payout');
      }

      const swapQuote = await quoteResponse.json();

      // Step 2: Execute gasless payout
      const gaslessResponse = await fetch('/api/0x/gasless', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trade: swapQuote,
          signature: await this.signWithBiometrics(),
          metadata: {
            claimId: params.claimId,
            beneficiary: params.beneficiary,
            type: 'claim_payout',
            region: params.region || 'LATAM',
            gaslessPaymentHandler: this.contracts.gaslessPaymentHandler
          }
        })
      });

      if (!gaslessResponse.ok) {
        throw new Error(`Gasless claim payout failed: ${gaslessResponse.statusText}`);
      }

      const result = await gaslessResponse.json();

      // Track claim payout
      this.trackClaimPayout({
        claimId: params.claimId,
        amount: params.amount,
        currency: params.preferredCurrency,
        processingTime: Date.now(),
        success: true,
        region: params.region || 'LATAM'
      });

      return result;
    } catch (error) {
      console.error('Gasless claim payout error:', error);
      this.trackClaimPayout({
        claimId: params.claimId,
        amount: params.amount,
        currency: params.preferredCurrency,
        processingTime: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        region: params.region || 'LATAM'
      });
      throw error;
    }
  }

  // CROSS-BORDER REINSURANCE SETTLEMENTS
  async settleReinsurance(params: ReinsuranceSettlement) {
    try {
      const quotes = await Promise.all([
        this.getSwapQuote({
          sellToken: params.fromCurrency,
          buyToken: 'USDC',
          sellAmount: params.amount,
          takerAddress: params.reinsurerId,
          slippagePercentage: 1
        }),
        this.getSwapQuote({
          sellToken: 'USDC',
          buyToken: params.toCurrency,
          sellAmount: params.amount,
          takerAddress: params.reinsurerId,
          slippagePercentage: 1
        })
      ]);

      const bestRoute = this.findBestRoute(quotes);
      
      // Execute cross-border settlement
      const result = await this.executeCrossBorderSettlement({
        route: bestRoute,
        reinsurerId: params.reinsurerId,
        amount: params.amount
      });

      return result;
    } catch (error) {
      console.error('Reinsurance settlement error:', error);
      throw error;
    }
  }

  // Get swap quote from 0x Protocol v2
  async getSwapQuote(params: {
    sellToken: string;
    buyToken: string;
    sellAmount: string;
    takerAddress: string;
    slippagePercentage: number;
  }): Promise<SwapQuote> {
    try {
      // Use our API endpoint for better error handling and insurance metadata
      const response = await fetch(
        `/api/0x/swap?` +
        `sellToken=${params.sellToken}&` +
        `buyToken=${params.buyToken}&` +
        `sellAmount=${params.sellAmount}&` +
        `takerAddress=${params.takerAddress}&` +
        `slippagePercentage=${params.slippagePercentage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to get swap quote: ${response.statusText}`);
      }

      const quote = await response.json();
      
      return {
        sellToken: quote.sellToken,
        buyToken: quote.buyToken,
        sellAmount: quote.sellAmount,
        buyAmount: quote.buyAmount,
        gasCost: quote.insurance?.estimatedGasSavings || '0.001',
        gaslessSupported: quote.insurance?.gaslessSupported || true,
        processingTime: quote.insurance?.processingTime || '3 seconds'
      };
    } catch (error) {
      console.error('Error getting swap quote:', error);
      throw error;
    }
  }

  // Execute gasless swap
  private async executeGaslessSwap(params: any) {
    const response = await fetch(`${this.baseUrl}/gasless/v1/swap`, {
      method: 'POST',
      headers: {
        '0x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trade: params.quote,
        chainId: 41454,
        signature: await this.signWithBiometrics(),
        metadata: {
          claimId: params.claimId,
          beneficiary: params.beneficiary,
          type: 'claim_payout'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gasless swap failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Find best route for cross-border settlements
  private findBestRoute(quotes: any[]) {
    // Simple route optimization - in production, implement more sophisticated routing
    return quotes.reduce((best, current) => {
      const bestRate = parseFloat(best.grossPrice || '0');
      const currentRate = parseFloat(current.grossPrice || '0');
      return currentRate > bestRate ? current : best;
    });
  }

  // Execute cross-border settlement
  private async executeCrossBorderSettlement(params: any) {
    const response = await fetch(`${this.baseUrl}/gasless/v1/swap`, {
      method: 'POST',
      headers: {
        '0x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trade: params.route,
        chainId: 41454,
        signature: await this.signWithBiometrics(),
        metadata: {
          reinsurerId: params.reinsurerId,
          amount: params.amount,
          type: 'reinsurance_settlement'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Cross-border settlement failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Sign with biometrics (simulated for demo)
  private async signWithBiometrics(): Promise<string> {
    // In production, integrate with actual biometric authentication
    // For demo purposes, return a mock signature
    return ethers.randomBytes(32).toString('hex');
  }

  // Analytics tracking
  private trackGaslessPayment(data: {
    amount: string;
    insuranceType: string;
    gasSaved: string;
    success: boolean;
    error?: string;
    region?: string;
  }) {
    // Send analytics to backend
    fetch('/api/analytics/gasless-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        gaslessPaymentHandler: this.contracts.gaslessPaymentHandler,
        chainId: this.chainId,
        platform: 'MicroInsurance'
      })
    }).catch(console.error);
  }

  private trackClaimPayout(data: {
    claimId: string;
    amount: string;
    currency: string;
    processingTime: number;
    success: boolean;
    error?: string;
    region?: string;
  }) {
    // Send analytics to backend
    fetch('/api/analytics/claim-payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        gaslessPaymentHandler: this.contracts.gaslessPaymentHandler,
        chainId: this.chainId,
        platform: 'MicroInsurance'
      })
    }).catch(console.error);

    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'claim_payout', {
        event_category: 'insurance',
        event_label: data.currency,
        value: parseFloat(data.amount),
        custom_parameter_1: data.processingTime,
        custom_parameter_2: data.success,
        custom_parameter_3: data.region || 'LATAM'
      });
    }
  }

  // Get supported tokens for insurance payments
  async getSupportedTokens() {
    const response = await fetch(`${this.baseUrl}/tokens/v1`, {
      headers: { '0x-api-key': this.apiKey }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch supported tokens');
    }

    const tokens = await response.json();
    return tokens.records.filter((token: any) => 
      ['USDC', 'MXN', 'BRL', 'NGN', 'KES', 'INR', 'PHP'].includes(token.symbol)
    );
  }

  // Get gas estimates for traditional vs gasless
  async getGasComparison(amount: string, currency: string) {
    const gaslessQuote = await this.getSwapQuote({
      sellToken: 'USDC',
      buyToken: currency,
      sellAmount: amount,
      takerAddress: '0x0000000000000000000000000000000000000000',
      slippagePercentage: 1
    });

    // Estimate traditional gas cost (simplified)
    const traditionalGasCost = 0.001; // ETH
    const gaslessGasCost = 0;

    return {
      traditional: {
        gasCost: traditionalGasCost,
        totalCost: parseFloat(amount) + traditionalGasCost
      },
      gasless: {
        gasCost: gaslessGasCost,
        totalCost: parseFloat(amount),
        savings: traditionalGasCost
      }
    };
  }
}

// Hook for React components
export function use0xInsurance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const zeroX = new ZeroXInsuranceIntegration();

  const payPremiumGasless = async (premium: PremiumPayment) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await zeroX.executeGaslessPremiumPayment(premium);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processClaimPayout = async (claim: ClaimPayout) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await zeroX.processGaslessClaim(claim);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const settleReinsurance = async (settlement: ReinsuranceSettlement) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await zeroX.settleReinsurance(settlement);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    payPremiumGasless, 
    processClaimPayout, 
    settleReinsurance, 
    loading, 
    error 
  };
}
