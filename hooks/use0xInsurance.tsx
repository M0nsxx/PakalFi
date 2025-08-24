'use client';

import { useState } from 'react';
import { ZeroXInsuranceIntegration, PremiumPayment, ClaimPayout, ReinsuranceSettlement } from '@/lib/integrations/0xProtocol';

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
