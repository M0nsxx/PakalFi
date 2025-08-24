import { useState, useEffect } from 'react';
import { getContracts } from '@/config/contracts';

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
  targetAmount: number;
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
  private contracts: any;

  constructor() {
    this.apiKey = process.env.PARA_API_KEY || '';
    this.network = 'monad-testnet';
    this.baseUrl = 'https://api.para.com';
    this.contracts = getContracts(10143); // Monad testnet chain ID
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

      // Deploy savings contract
      const goal = await this.deployInsuranceSavings({
        wallet: wallet.address,
        targetAmount: params.monthlyAmount * 12,
        insuranceType: params.targetCoverage,
        deadline: params.targetDate,
        savingsGoalHandler: this.contracts.savingsGoalHandler
      });

      // Setup recurring deposits
      await this.createRecurringPayment({
        destination: goal.address,
        amount: params.monthlyAmount,
        frequency: 'monthly',
        token: 'USDC',
        metadata: {
          purpose: 'insurance_savings',
          autoConvert: true, // Auto-convert to policy when target reached
          savingsGoalHandler: this.contracts.savingsGoalHandler
        }
      });

      return { wallet, goal };
    } catch (error) {
      console.error('Error creating insurance savings goal:', error);
      throw error;
    }
  }

  // Create payment for app clip
  private async createPayment(params: any) {
    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        type: params.type,
        metadata: params.metadata,
        network: this.network
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.statusText}`);
    }

    return response.json();
  }

  // Create embedded wallet
  private async createWallet(params: any) {
    const response = await fetch(`${this.baseUrl}/wallets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        userId: params.userId,
        type: params.type,
        features: params.features,
        network: this.network
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create wallet: ${response.statusText}`);
    }

    return response.json();
  }

  // Deploy insurance savings contract
  private async deployInsuranceSavings(params: {
    wallet: string;
    targetAmount: number;
    insuranceType: string;
    deadline: Date;
    savingsGoalHandler: string;
  }) {
    const response = await fetch(`${this.baseUrl}/contracts/deploy`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'insurance_savings',
        network: this.network,
        parameters: {
          wallet: params.wallet,
          targetAmount: params.targetAmount,
          insuranceType: params.insuranceType,
          deadline: params.deadline.toISOString(),
          savingsGoalHandler: params.savingsGoalHandler
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to deploy insurance savings: ${response.statusText}`);
    }

    return await response.json();
  }

  // Create recurring payment
  private async createRecurringPayment(params: any) {
    const response = await fetch(`${this.baseUrl}/payments/recurring`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        destination: params.destination,
        amount: params.amount,
        frequency: params.frequency,
        token: params.token,
        metadata: params.metadata,
        network: this.network
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create recurring payment: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate QR code for app clip
  private async generateQRCode(url: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        url,
        size: 300,
        format: 'png'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate QR code: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  // Get savings goals for user
  async getSavingsGoals(userId: string): Promise<InsuranceGoal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/wallets/${userId}/goals`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch savings goals: ${response.statusText}`);
      }

      const goals = await response.json();
      return goals.map((goal: any) => ({
        id: goal.id,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        monthlyDeposit: goal.monthlyDeposit,
        deadline: new Date(goal.deadline),
        targetInsurance: goal.targetInsurance,
        autoConvert: goal.autoConvert,
        walletAddress: goal.walletAddress,
        frequency: goal.frequency,
        savedAmount: goal.currentAmount,
        insuranceType: goal.targetInsurance
      }));
    } catch (error) {
      console.error('Error fetching savings goals:', error);
      throw new Error('Failed to fetch savings goals from Para');
    }
  }

  // Update savings goal
  async updateSavingsGoal(goalId: string, updates: Partial<InsuranceGoal>): Promise<InsuranceGoal> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`Failed to update savings goal: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error updating savings goal:', error);
      throw error;
    }
  }

  // Convert savings to insurance policy
  async convertToPolicy(goalId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/${goalId}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to convert to policy: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error converting to policy:', error);
      throw error;
    }
  }

  // Lock funds for insurance
  async lockFundsForInsurance(goalId: string, amount: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/${goalId}/lock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error(`Failed to lock funds: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error locking funds:', error);
      throw error;
    }
  }
}

// React hook for using Para wallet
export function useParaWallet() {
  const [para, setPara] = useState<ParaInsuranceIntegration | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const integration = new ParaInsuranceIntegration();
    setPara(integration);
  }, []);

  const createInsuranceGoal = async (formData: GoalFormData) => {
    if (!para) return null;

    setLoading(true);
    try {
      const goal = await para.createInsuranceSavingsGoal({
        userId: 'user-id', // Get from auth context
        targetCoverage: formData.insuranceType,
        monthlyAmount: formData.monthlyDeposit,
        targetDate: formData.targetDate
      });

      // Lock funds in smart contract
      await para.lockFundsForInsurance(goal.goal.id, formData.initialDeposit);
      
      return goal;
    } catch (error) {
      console.error('Error creating insurance goal:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getInsuranceGoals = async (userId: string) => {
    if (!para) return [];

    setLoading(true);
    try {
      return await para.getSavingsGoals(userId);
    } catch (error) {
      console.error('Error fetching insurance goals:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const convertToPolicy = async (goalId: string) => {
    if (!para) return null;

    setLoading(true);
    try {
      return await para.convertToPolicy(goalId);
    } catch (error) {
      console.error('Error converting to policy:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    para,
    createInsuranceGoal,
    getInsuranceGoals,
    convertToPolicy,
    loading
  };
}

// Insurance Savings UI Component
export function InsuranceSavingsGoals() {
  const { para, createInsuranceGoal, getInsuranceGoals, convertToPolicy, loading } = useParaWallet();
  const [goals, setGoals] = useState<InsuranceGoal[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const userGoals = await getInsuranceGoals('user-id');
      setGoals(userGoals);
    };

    fetchGoals();
  }, []);

  const handleCreateGoal = async (formData: GoalFormData) => {
    try {
      const goal = await createInsuranceGoal(formData);
      if (goal) {
        setGoals([...goals, goal.goal]);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleConvertToPolicy = async (goalId: string) => {
    try {
      const policy = await convertToPolicy(goalId);
      if (policy) {
        // Update goals list
        setGoals(goals.filter(goal => goal.id !== goalId));
        // Show success message
        alert('Successfully converted to insurance policy!');
      }
    } catch (error) {
      console.error('Error converting to policy:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Save for Better Coverage
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          Create New Goal
        </button>
      </div>
      
      {showForm && (
        <SavingsGoalForm 
          onSubmit={handleCreateGoal}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(goal => (
          <InsuranceGoalCard 
            key={goal.id}
            goal={goal}
            onConvert={() => handleConvertToPolicy(goal.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Savings Goal Form Component
function SavingsGoalForm({ onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState<GoalFormData>({
    insuranceType: '',
    monthlyDeposit: 0,
    targetDate: new Date(),
    initialDeposit: 0
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Create Savings Goal</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Type
          </label>
          <select
            value={formData.insuranceType}
            onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select Insurance Type</option>
            <option value="health">Micro-Health</option>
            <option value="climate">Micro-Climate</option>
            <option value="security">Micro-Security</option>
            <option value="mobility">Micro-Mobility</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Deposit (USD)
          </label>
          <input
            type="number"
            value={formData.monthlyDeposit}
            onChange={(e) => setFormData({...formData, monthlyDeposit: parseFloat(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="1"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Date
          </label>
          <input
            type="date"
            value={formData.targetDate.toISOString().split('T')[0]}
            onChange={(e) => setFormData({...formData, targetDate: new Date(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Deposit (USD)
          </label>
          <input
            type="number"
            value={formData.initialDeposit}
            onChange={(e) => setFormData({...formData, initialDeposit: parseFloat(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            Create Goal
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Insurance Goal Card Component
function InsuranceGoalCard({ goal, onConvert }: any) {
  const percentage = (goal.savedAmount / goal.targetAmount) * 100;
  const isReady = goal.savedAmount >= goal.targetAmount;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {getInsuranceIcon(goal.insuranceType)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.insuranceType}</h3>
            <p className="text-sm text-gray-500">Savings Goal</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${goal.savedAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            of ${goal.targetAmount.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Monthly Deposit:</span>
          <span>${goal.monthlyDeposit}</span>
        </div>
        <div className="flex justify-between">
          <span>Target Date:</span>
          <span>{goal.deadline.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Auto-convert:</span>
          <span>{goal.autoConvert ? 'Yes' : 'No'}</span>
        </div>
      </div>
      
      {isReady && (
        <button
          onClick={onConvert}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          Convert to Policy
        </button>
      )}
    </div>
  );
}

// Helper function to get insurance icon
function getInsuranceIcon(type: string): string {
  const icons: { [key: string]: string } = {
    health: '🏥',
    climate: '🌦️',
    security: '🛡️',
    mobility: '🚗'
  };
  return icons[type] || '📋';
}
