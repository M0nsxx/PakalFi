import { useState, useEffect } from 'react';
import { getContracts } from '@/config/contracts';

// Types for insurance analytics
export interface RiskMetrics {
  poolId: string;
  totalValue: number;
  activePolicies: number;
  pendingClaims: number;
  lossRatio: number;
  solvencyRatio: number;
}

export interface WeatherEvent {
  severity: string;
  affectedPolicies: number;
  estimatedLoss: number;
  timestamp: string;
}

export interface ClaimEvent {
  id: string;
  type: string;
  amount: number;
  status: string;
  timestamp: string;
  policyId: string;
  beneficiary: string;
}

export interface DashboardData {
  policies: number;
  claims: number;
  premiums: number;
  payouts: number;
  lossRatio: number;
  profitMargin: number;
  riskByRegion: any[];
  premiumVsClaims: any[];
  policyTypes: any[];
}

export class EnvioInsuranceAnalytics {
  private apiKey: string;
  private endpoint: string;
  private network: string;
  private contracts: any;
  
  constructor() {
    this.apiKey = process.env.ENVIO_API_KEY || '48a3acc9-9ca5-4734-84f5-c260fd8ec3f1';
    this.endpoint = 'https://indexer.envio.dev';
    this.network = 'monad-testnet';
    this.contracts = getContracts(10143); // Monad testnet chain ID
  }

  // Real-time risk monitoring
  async getRiskMetrics(): Promise<RiskMetrics[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query RiskMetrics {
              riskPools {
                poolId
                totalValue
                activePolicies
                pendingClaims
                lossRatio
                solvencyRatio
              }
              weatherEvents(last: 100) {
                severity
                affectedPolicies
                estimatedLoss
                timestamp
              }
              contracts: insurancePools(where: { address_in: ["${this.contracts.insurancePool}", "${this.contracts.oracle}", "${this.contracts.policyNFT}"] }) {
                address
                totalPolicies
                totalPremiums
                totalClaims
                activePolicies
              }
            }
          `
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch risk metrics: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.riskPools || [];
    } catch (error) {
      console.error('Error fetching risk metrics:', error);
      return [];
    }
  }

  // Live claims tracking
  async subscribeToClaims(callback: (claim: ClaimEvent) => void): Promise<void> {
    try {
      const eventSource = new EventSource(`${this.endpoint}/events?network=${this.network}&events=ClaimInitiated,ClaimApproved,ClaimPaid`);

      eventSource.onmessage = (event) => {
        const claimData = JSON.parse(event.data);
        callback({
          id: claimData.claimId,
          type: claimData.type,
          amount: parseFloat(claimData.amount),
          status: claimData.status,
          timestamp: claimData.timestamp,
          policyId: claimData.policyId,
          beneficiary: claimData.beneficiary
        });
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };
    } catch (error) {
      console.error('Error subscribing to claims:', error);
    }
  }

  // Dashboard metrics
  async getDashboardData(): Promise<DashboardData> {
    try {
      const [policies, claims, premiums, payouts, riskMetrics] = await Promise.all([
        this.getActivePolicies(),
        this.getPendingClaims(),
        this.getTotalPremiums24h(),
        this.getTotalPayouts24h(),
        this.getRiskMetrics()
      ]);

      const lossRatio = premiums > 0 ? (payouts / premiums) * 100 : 0;
      const profitMargin = premiums > 0 ? ((premiums - payouts) / premiums) * 100 : 0;

      return {
        policies,
        claims,
        premiums,
        payouts,
        lossRatio,
        profitMargin,
        riskByRegion: await this.getRiskByRegion(),
        premiumVsClaims: await this.getPremiumVsClaims(),
        policyTypes: await this.getPolicyTypes()
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch real-time dashboard data from Envio');
    }
  }

  // Get active policies count
  private async getActivePolicies(): Promise<number> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query ActivePolicies {
              policies(where: { active: true }) {
                id
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.policies?.length || 0;
    } catch (error) {
      console.error('Error fetching active policies:', error);
      throw new Error('Failed to fetch active policies from Envio');
    }
  }

  // Get pending claims count
  private async getPendingClaims(): Promise<number> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query PendingClaims {
              claims(where: { status: "pending" }) {
                id
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.claims?.length || 0;
    } catch (error) {
      console.error('Error fetching pending claims:', error);
      return 0;
    }
  }

  // Get total premiums in last 24h
  private async getTotalPremiums24h(): Promise<number> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query Premiums24h {
              premiumPayments(
                where: { 
                  timestamp_gte: "${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}" 
                }
              ) {
                amount
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.premiumPayments?.reduce((sum: number, payment: any) => 
        sum + parseFloat(payment.amount), 0) || 0;
    } catch (error) {
      console.error('Error fetching premiums 24h:', error);
      return 0;
    }
  }

  // Get total payouts in last 24h
  private async getTotalPayouts24h(): Promise<number> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query Payouts24h {
              claimPayouts(
                where: { 
                  timestamp_gte: "${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}" 
                }
              ) {
                amount
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.claimPayouts?.reduce((sum: number, payout: any) => 
        sum + parseFloat(payout.amount), 0) || 0;
    } catch (error) {
      console.error('Error fetching payouts 24h:', error);
      return 0;
    }
  }

  // Get risk distribution by region
  private async getRiskByRegion(): Promise<any[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query RiskByRegion {
              policies {
                region
                insuranceType
                riskScore
              }
            }
          `
        })
      });

      const data = await response.json();
      const policies = data.data.policies || [];

      // Group by region and calculate average risk
      const riskByRegion = policies.reduce((acc: any, policy: any) => {
        if (!acc[policy.region]) {
          acc[policy.region] = {
            region: policy.region,
            health: 0,
            climate: 0,
            security: 0,
            mobility: 0,
            total: 0
          };
        }
        
        acc[policy.region][policy.insuranceType.toLowerCase()] += parseFloat(policy.riskScore);
        acc[policy.region].total += parseFloat(policy.riskScore);
        
        return acc;
      }, {});

      return Object.values(riskByRegion);
    } catch (error) {
      console.error('Error fetching risk by region:', error);
      return [];
    }
  }

  // Get premium vs claims data for charts
  private async getPremiumVsClaims(): Promise<any[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query PremiumVsClaims {
              dailyStats(last: 30) {
                date
                totalPremiums
                totalClaims
                netProfit
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.dailyStats || [];
    } catch (error) {
      console.error('Error fetching premium vs claims:', error);
      return [];
    }
  }

  // Get policy types distribution
  private async getPolicyTypes(): Promise<any[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query PolicyTypes {
              policies {
                insuranceType
              }
            }
          `
        })
      });

      const data = await response.json();
      const policies = data.data.policies || [];

      // Count by type
      const typeCount = policies.reduce((acc: any, policy: any) => {
        acc[policy.insuranceType] = (acc[policy.insuranceType] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(typeCount).map(([type, count]) => ({
        type,
        count
      }));
    } catch (error) {
      console.error('Error fetching policy types:', error);
      return [];
    }
  }

  // Get weather events affecting policies
  async getWeatherEvents(): Promise<WeatherEvent[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query WeatherEvents {
              weatherEvents(last: 100) {
                severity
                affectedPolicies
                estimatedLoss
                timestamp
                region
                eventType
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.weatherEvents || [];
    } catch (error) {
      console.error('Error fetching weather events:', error);
      return [];
    }
  }

  // Get parametric triggers status
  async getParametricTriggers(): Promise<any[]> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query ParametricTriggers {
              parametricTriggers {
                type
                threshold
                currentValue
                status
                affectedPolicies
                lastUpdated
              }
            }
          `
        })
      });

      const data = await response.json();
      return data.data.parametricTriggers || [];
    } catch (error) {
      console.error('Error fetching parametric triggers:', error);
      return [];
    }
  }

  // Get contract analytics
  async getContractAnalytics(): Promise<any> {
    try {
      const response = await fetch(`${this.endpoint}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          query: `
            query ContractAnalytics {
              insurancePool: insurancePools(where: { address: "${this.contracts.insurancePool}" }) {
                totalPolicies
                totalPremiums
                totalClaims
                activePolicies
                reserves
              }
              oracle: oracles(where: { address: "${this.contracts.oracle}" }) {
                totalTriggers
                lastUpdate
                accuracy
              }
              policyNFT: policyNFTs(where: { address: "${this.contracts.policyNFT}" }) {
                totalMinted
                totalBurned
                uniqueHolders
              }
              gaslessPayments: gaslessPaymentHandlers(where: { address: "${this.contracts.gaslessPaymentHandler}" }) {
                totalPayments
                totalGasSaved
                successRate
              }
              savingsGoals: savingsGoalHandlers(where: { address: "${this.contracts.savingsGoalHandler}" }) {
                totalGoals
                totalDeposits
                conversionsToPolicies
              }
            }
          `
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch contract analytics: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching contract analytics:', error);
      return {};
    }
  }
}

// React hook for using Envio analytics
export function useEnvioData() {
  const [metrics, setMetrics] = useState<DashboardData | null>(null);
  const [claims, setClaims] = useState<ClaimEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analytics = new EnvioInsuranceAnalytics();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardData = await analytics.getDashboardData();
        setMetrics(dashboardData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time claims
    analytics.subscribeToClaims((claim) => {
      setClaims(prev => [claim, ...prev.slice(0, 9)]); // Keep last 10 claims
    });

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, claims, loading, error };
}

// Hook for risk metrics
export function useRiskMetrics() {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  const analytics = new EnvioInsuranceAnalytics();

  useEffect(() => {
    const fetchRiskMetrics = async () => {
      try {
        setLoading(true);
        const metrics = await analytics.getRiskMetrics();
        setRiskMetrics(metrics);
      } catch (error) {
        console.error('Error fetching risk metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskMetrics();
    const interval = setInterval(fetchRiskMetrics, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return { riskMetrics, loading };
}

// Hook for weather events
export function useWeatherEvents() {
  const [weatherEvents, setWeatherEvents] = useState<WeatherEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const analytics = new EnvioInsuranceAnalytics();

  useEffect(() => {
    const fetchWeatherEvents = async () => {
      try {
        setLoading(true);
        const events = await analytics.getWeatherEvents();
        setWeatherEvents(events);
      } catch (error) {
        console.error('Error fetching weather events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherEvents();
    const interval = setInterval(fetchWeatherEvents, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { weatherEvents, loading };
}
