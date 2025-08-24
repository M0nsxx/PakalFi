// Types for Para integration
export interface InsuranceAppClip {
  qrCode: string;
  policyId: string;
  appClipUrl: string;
  coverageType: string;
  premium: number;
  duration: string;
}

export interface InsuranceGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  monthlyDeposit: number;
  deadline: Date;
  targetInsurance: string;
  autoConvert: boolean;
  walletAddress: string;
  frequency: string;
  savedAmount: number;
  insuranceType: string;
}

export interface GoalFormData {
  insuranceType: string;
  monthlyDeposit: number;
  targetDate: Date;
  initialDeposit: number;
}

export class ParaInsuranceIntegration {
  private apiKey: string;
  private network: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.PARA_API_KEY || '';
    this.network = 'monad-testnet';
    this.baseUrl = 'https://api.para.com';
  }

  // BOUNTY 1: App Clips for instant insurance purchase
  async createInsuranceAppClip(params: {
    coverageType: string;
    premium: number;
    duration: string;
  }): Promise<InsuranceAppClip> {
    try {
      // Generate payment URL for App Clip
      const policy = await this.createPayment({
        amount: params.premium,
        currency: 'USDC',
        type: 'fixed',
        metadata: {
          appClip: true,
          biometric: true,
          insuranceType: params.coverageType,
          duration: params.duration
        }
      });

      const qrCode = await this.generateQRCode(policy.url);
      const appClipUrl = `https://microinsurance.app.clip/insurance/${policy.id}`;

      return {
        qrCode,
        policyId: policy.id,
        appClipUrl,
        coverageType: params.coverageType,
        premium: params.premium,
        duration: params.duration
      };
    } catch (error) {
      console.error('Error creating insurance app clip:', error);
      throw error;
    }
  }

  // BOUNTY 2: Insurance savings goals
  async createInsuranceSavingsGoal(params: {
    userId: string;
    targetCoverage: string;
    monthlyAmount: number;
    targetDate: Date;
  }): Promise<{ wallet: any; goal: InsuranceGoal }> {
    try {
      // Create embedded wallet for insurance savings
      const wallet = await this.createWallet({
        userId: params.userId,
        type: 'savings',
        features: ['timelock', 'recurring', 'insurance']
      });

      // Create savings goal
      const goal: InsuranceGoal = {
        id: `goal_${Date.now()}`,
        targetAmount: params.monthlyAmount * 12, // Annual target
        currentAmount: 0,
        monthlyDeposit: params.monthlyAmount,
        deadline: params.targetDate,
        targetInsurance: params.targetCoverage,
        autoConvert: true,
        walletAddress: wallet.address,
        frequency: 'monthly',
        savedAmount: 0,
        insuranceType: params.targetCoverage
      };

      return { wallet, goal };
    } catch (error) {
      console.error('Error creating insurance savings goal:', error);
      throw error;
    }
  }

  // Helper methods
  private async createPayment(params: any): Promise<any> {
    // Implementation for creating payment
    return {
      id: `payment_${Date.now()}`,
      url: `https://para.com/pay/${Date.now()}`
    };
  }

  private async generateQRCode(url: string): Promise<string> {
    // Implementation for generating QR code
    return `data:image/png;base64,${Buffer.from(url).toString('base64')}`;
  }

  private async createWallet(params: any): Promise<any> {
    // Implementation for creating wallet
    return {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      type: params.type
    };
  }
}
