import { useState, useEffect } from 'react';
import { getContracts } from '@/config/contracts';

// Types for SDG impact tracking
export interface SDGImpact {
  familiesProtected: number;
  financialResilience: number;
  catastrophicExpensesPrevented: number;
  microPremiumsEnabled: number;
  healthAccess: number;
  unbankedServed: number;
  farmersProtected: number;
  successStories: ImpactStory[];
}

export interface ImpactStory {
  id: string;
  title: string;
  description: string;
  sdg: number;
  region: string;
  impact: string;
  image: string;
  date: string;
}

export interface SDGMetrics {
  sdg1: PovertyReductionMetrics;
  sdg3: HealthMetrics;
  sdg8: EconomicMetrics;
  sdg13: ClimateMetrics;
}

export interface PovertyReductionMetrics {
  familiesProtected: number;
  financialResilience: number;
  catastrophicExpensesPrevented: number;
  microPremiumsEnabled: number;
  averageSavings: number;
  povertyReductionRate: number;
}

export interface HealthMetrics {
  healthCoveragePolicies: number;
  telemedicineAccess: number;
  preventiveCareIncentives: number;
  maternitySupport: number;
  healthOutcomes: number;
  lifeExpectancyImprovement: number;
}

export interface EconomicMetrics {
  unbankedServed: number;
  gigWorkersCovered: number;
  smallBusinessProtection: number;
  agriculturalInsurance: number;
  economicInclusion: number;
  jobCreation: number;
}

export interface ClimateMetrics {
  weatherIndexPolicies: number;
  droughtProtection: number;
  floodInsurance: number;
  cropInsurance: number;
  climateResilience: number;
  carbonFootprintReduction: number;
}

export class SDGInsuranceImpact {
  private apiKey: string;
  private baseUrl: string;
  private contracts: any;

  constructor() {
    this.apiKey = process.env.BGA_API_KEY || '';
    this.baseUrl = 'https://api.bga.com';
    this.contracts = getContracts(10143); // Monad testnet chain ID
  }

  // SDG 1: No Poverty
  async trackPovertyReduction(): Promise<PovertyReductionMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/sdg/1/metrics`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SDG 1 metrics: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        familiesProtected: await this.getFamiliesWithCoverage(),
        financialResilience: await this.calculateResilienceScore(),
        catastrophicExpensesPrevented: await this.getPreventedBankruptcies(),
        microPremiumsEnabled: await this.getMicroPremiumCount(),
        averageSavings: await this.calculateAverageSavings(),
        povertyReductionRate: await this.calculatePovertyReduction(),
        contracts: {
          insurancePool: this.contracts.insurancePool,
          policyNFT: this.contracts.policyNFT,
          reinsuranceToken: this.contracts.reinsuranceToken
        }
      };
    } catch (error) {
      console.error('Error tracking poverty reduction:', error);
      throw error;
    }
  }

  // SDG 3: Good Health and Well-being
  async trackHealthImpact(): Promise<HealthMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/sdg/3/metrics`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SDG 3 metrics: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        healthCoveragePolicies: await this.getHealthPolicies(),
        telemedicineAccess: await this.getTelemedicineUsers(),
        preventiveCareIncentives: await this.getPreventiveCareRewards(),
        maternitySupport: await this.getMaternityCoverage(),
        healthOutcomes: await this.calculateHealthOutcomes(),
        lifeExpectancyImprovement: await this.calculateLifeExpectancyImprovement()
      };
    } catch (error) {
      console.error('Error tracking health impact:', error);
      return {
        healthCoveragePolicies: 0,
        telemedicineAccess: 0,
        preventiveCareIncentives: 0,
        maternitySupport: 0,
        healthOutcomes: 0,
        lifeExpectancyImprovement: 0
      };
    }
  }

  // SDG 8: Decent Work and Economic Growth
  async trackEconomicInclusion(): Promise<EconomicMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/sdg/8/metrics`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SDG 8 metrics: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        unbankedServed: await this.getUnbankedPolicyholders(),
        gigWorkersCovered: await this.getGigEconomyCoverage(),
        smallBusinessProtection: await this.getSMEPolicies(),
        agriculturalInsurance: await this.getFarmersProtected(),
        economicInclusion: await this.calculateEconomicInclusion(),
        jobCreation: await this.calculateJobCreation()
      };
    } catch (error) {
      console.error('Error tracking economic inclusion:', error);
      return {
        unbankedServed: 0,
        gigWorkersCovered: 0,
        smallBusinessProtection: 0,
        agriculturalInsurance: 0,
        economicInclusion: 0,
        jobCreation: 0
      };
    }
  }

  // SDG 13: Climate Action
  async trackClimateResilience(): Promise<ClimateMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/sdg/13/metrics`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SDG 13 metrics: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        weatherIndexPolicies: await this.getParametricWeatherPolicies(),
        droughtProtection: await this.getDroughtCoverage(),
        floodInsurance: await this.getFloodPolicies(),
        cropInsurance: await this.getAgriculturalProtection(),
        climateResilience: await this.calculateClimateResilience(),
        carbonFootprintReduction: await this.calculateCarbonReduction()
      };
    } catch (error) {
      console.error('Error tracking climate resilience:', error);
      throw new Error('Failed to fetch climate resilience metrics from SDG API');
    }
  }

  // Get comprehensive SDG metrics
  async getSDGMetrics(): Promise<SDGMetrics> {
    try {
      const [sdg1, sdg3, sdg8, sdg13] = await Promise.all([
        this.trackPovertyReduction(),
        this.trackHealthImpact(),
        this.trackEconomicInclusion(),
        this.trackClimateResilience()
      ]);

      return { sdg1, sdg3, sdg8, sdg13 };
    } catch (error) {
      console.error('Error fetching SDG metrics:', error);
      throw error;
    }
  }

  // Get impact stories
  async getImpactStories(): Promise<ImpactStory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/impact/stories`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch impact stories: ${response.statusText}`);
      }

      const stories = await response.json();
      return stories.map((story: any) => ({
        id: story.id,
        title: story.title,
        description: story.description,
        sdg: story.sdg,
        region: story.region,
        impact: story.impact,
        image: story.image,
        date: story.date
      }));
    } catch (error) {
      console.error('Error fetching impact stories:', error);
      throw new Error('Failed to fetch impact stories from SDG API');
    }
  }

  // Submit impact story
  async submitImpactStory(story: Omit<ImpactStory, 'id' | 'date'>): Promise<ImpactStory> {
    try {
      const response = await fetch(`${this.baseUrl}/impact/stories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...story,
          date: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to submit impact story: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error submitting impact story:', error);
      throw error;
    }
  }

  // Generate SDG report
  async generateSDGReport(): Promise<any> {
    try {
      const metrics = await this.getSDGMetrics();
      const stories = await this.getImpactStories();

      const report = {
        timestamp: new Date().toISOString(),
        metrics,
        stories,
        summary: {
          totalImpact: this.calculateTotalImpact(metrics),
          sdgAlignment: this.calculateSDGAlignment(metrics),
          recommendations: this.generateRecommendations(metrics)
        }
      };

      // Submit report to BGA
      await this.submitSDGReport(report);

      return report;
    } catch (error) {
      console.error('Error generating SDG report:', error);
      throw error;
    }
  }

  // Get contract impact data
  async getContractImpactData(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/contracts/impact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contracts: {
            insurancePool: this.contracts.insurancePool,
            policyNFT: this.contracts.policyNFT,
            reinsuranceToken: this.contracts.reinsuranceToken,
            gaslessPaymentHandler: this.contracts.gaslessPaymentHandler,
            savingsGoalHandler: this.contracts.savingsGoalHandler,
            oracle: this.contracts.oracle
          },
          network: 'monad-testnet',
          chainId: 10143
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch contract impact data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching contract impact data:', error);
      return {};
    }
  }

  // Private helper methods
  private async getFamiliesWithCoverage(): Promise<number> {
    // Implementation to get families with insurance coverage
    return 15000; // Mock data
  }

  private async calculateResilienceScore(): Promise<number> {
    // Implementation to calculate financial resilience score
    return 85.5; // Mock data
  }

  private async getPreventedBankruptcies(): Promise<number> {
    // Implementation to get number of prevented bankruptcies
    return 1250; // Mock data
  }

  private async getMicroPremiumCount(): Promise<number> {
    // Implementation to get micro-premium policies count
    return 8500; // Mock data
  }

  private async calculateAverageSavings(): Promise<number> {
    // Implementation to calculate average savings per family
    return 2500; // Mock data
  }

  private async calculatePovertyReduction(): Promise<number> {
    // Implementation to calculate poverty reduction rate
    return 12.5; // Mock data
  }

  private async getHealthPolicies(): Promise<number> {
    // Implementation to get health coverage policies
    return 6500; // Mock data
  }

  private async getTelemedicineUsers(): Promise<number> {
    // Implementation to get telemedicine users
    return 4200; // Mock data
  }

  private async getPreventiveCareRewards(): Promise<number> {
    // Implementation to get preventive care rewards
    return 1800; // Mock data
  }

  private async getMaternitySupport(): Promise<number> {
    // Implementation to get maternity support policies
    return 950; // Mock data
  }

  private async calculateHealthOutcomes(): Promise<number> {
    // Implementation to calculate health outcomes improvement
    return 23.5; // Mock data
  }

  private async calculateLifeExpectancyImprovement(): Promise<number> {
    // Implementation to calculate life expectancy improvement
    return 2.1; // Mock data
  }

  private async getUnbankedPolicyholders(): Promise<number> {
    // Implementation to get unbanked policyholders
    return 12000; // Mock data
  }

  private async getGigEconomyCoverage(): Promise<number> {
    // Implementation to get gig economy coverage
    return 3200; // Mock data
  }

  private async getSMEPolicies(): Promise<number> {
    // Implementation to get SME policies
    return 1800; // Mock data
  }

  private async getFarmersProtected(): Promise<number> {
    // Implementation to get farmers protected
    return 4500; // Mock data
  }

  private async calculateEconomicInclusion(): Promise<number> {
    // Implementation to calculate economic inclusion rate
    return 78.3; // Mock data
  }

  private async calculateJobCreation(): Promise<number> {
    // Implementation to calculate jobs created
    return 450; // Mock data
  }

  private async getParametricWeatherPolicies(): Promise<number> {
    // Implementation to get parametric weather policies
    return 2800; // Mock data
  }

  private async getDroughtCoverage(): Promise<number> {
    // Implementation to get drought coverage
    return 1500; // Mock data
  }

  private async getFloodPolicies(): Promise<number> {
    // Implementation to get flood policies
    return 2200; // Mock data
  }

  private async getAgriculturalProtection(): Promise<number> {
    // Implementation to get agricultural protection
    return 3800; // Mock data
  }

  private async calculateClimateResilience(): Promise<number> {
    // Implementation to calculate climate resilience score
    return 82.7; // Mock data
  }

  private async calculateCarbonReduction(): Promise<number> {
    // Implementation to calculate carbon footprint reduction
    return 15.3; // Mock data
  }

  private calculateTotalImpact(metrics: SDGMetrics): number {
    // Calculate total impact score across all SDGs
    const sdg1Score = metrics.sdg1.financialResilience * 0.3;
    const sdg3Score = metrics.sdg3.healthOutcomes * 0.25;
    const sdg8Score = metrics.sdg8.economicInclusion * 0.25;
    const sdg13Score = metrics.sdg13.climateResilience * 0.2;
    
    return sdg1Score + sdg3Score + sdg8Score + sdg13Score;
  }

  private calculateSDGAlignment(metrics: SDGMetrics): number {
    // Calculate overall SDG alignment percentage
    const alignments = [
      metrics.sdg1.povertyReductionRate,
      metrics.sdg3.lifeExpectancyImprovement,
      metrics.sdg8.economicInclusion,
      metrics.sdg13.climateResilience
    ];
    
    return alignments.reduce((sum, alignment) => sum + alignment, 0) / alignments.length;
  }

  private generateRecommendations(metrics: SDGMetrics): string[] {
    const recommendations = [];
    
    if (metrics.sdg1.financialResilience < 80) {
      recommendations.push('Increase financial literacy programs');
    }
    
    if (metrics.sdg3.healthOutcomes < 20) {
      recommendations.push('Expand telemedicine coverage');
    }
    
    if (metrics.sdg8.economicInclusion < 75) {
      recommendations.push('Develop more gig economy products');
    }
    
    if (metrics.sdg13.climateResilience < 80) {
      recommendations.push('Enhance parametric weather products');
    }
    
    return recommendations;
  }

  private async submitSDGReport(report: any): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/reports/sdg`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      });

      if (!response.ok) {
        throw new Error(`Failed to submit SDG report: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting SDG report:', error);
      throw error;
    }
  }
}

// React hook for using SDG impact tracking
export function useSDGMetrics() {
  const [impact, setImpact] = useState<SDGImpact | null>(null);
  const [metrics, setMetrics] = useState<SDGMetrics | null>(null);
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sdgTracker = new SDGInsuranceImpact();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [sdgMetrics, impactStories] = await Promise.all([
          sdgTracker.getSDGMetrics(),
          sdgTracker.getImpactStories()
        ]);

        setMetrics(sdgMetrics);
        setStories(impactStories);
        
        // Calculate overall impact
        const overallImpact: SDGImpact = {
          familiesProtected: sdgMetrics.sdg1.familiesProtected,
          financialResilience: sdgMetrics.sdg1.financialResilience,
          catastrophicExpensesPrevented: sdgMetrics.sdg1.catastrophicExpensesPrevented,
          microPremiumsEnabled: sdgMetrics.sdg1.microPremiumsEnabled,
          healthAccess: sdgMetrics.sdg3.healthCoveragePolicies,
          unbankedServed: sdgMetrics.sdg8.unbankedServed,
          farmersProtected: sdgMetrics.sdg13.cropInsurance,
          successStories: impactStories
        };

        setImpact(overallImpact);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitStory = async (story: Omit<ImpactStory, 'id' | 'date'>) => {
    try {
      const newStory = await sdgTracker.submitImpactStory(story);
      setStories(prev => [newStory, ...prev]);
      return newStory;
    } catch (error) {
      console.error('Error submitting story:', error);
      throw error;
    }
  };

  const generateReport = async () => {
    try {
      return await sdgTracker.generateSDGReport();
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  };

  return {
    impact,
    metrics,
    stories,
    loading,
    error,
    submitStory,
    generateReport
  };
}

// This file contains only TypeScript interfaces and utility functions
// React components have been moved to separate .tsx files
