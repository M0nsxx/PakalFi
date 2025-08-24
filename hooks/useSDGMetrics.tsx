'use client';

import { useState, useEffect } from 'react';
import { SDGInsuranceImpact, SDGImpact, SDGMetrics, ImpactStory } from '@/lib/integrations/sdgInsuranceImpact';

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
      } catch (err: any) {
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
