'use client';

import React, { useState } from 'react';
import { use0xInsurance } from '@/hooks/use0xInsurance';
import { PremiumPayment, ClaimPayout } from '@/lib/integrations/0xProtocol';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { 
  Shield, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Heart,
  Car,
  Home,
  Smartphone,
  Zap,
  TrendingDown,
  Users,
  MapPin,
  CreditCard,
  TrendingUp
} from 'lucide-react';

interface DemoState {
  premiumAmount: string;
  currency: string;
  insuranceType: string;
  region: string;
  claimAmount: string;
  preferredCurrency: string;
  policyHolderName: string;
  coverageType: string;
}

interface InsurancePolicy {
  id: string;
  type: string;
  premium: string;
  coverage: string;
  duration: string;
  holder: string;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
}

export default function ZeroXDemo() {
  const { payPremiumGasless, processClaimPayout, loading, error } = use0xInsurance();
  const [demoState, setDemoState] = useState<DemoState>({
    premiumAmount: '25',
    currency: 'MXN',
    insuranceType: 'health',
    region: 'LATAM',
    claimAmount: '150',
    preferredCurrency: 'BRL',
    policyHolderName: 'Maria Gonzalez',
    coverageType: 'basic'
  });

  const [results, setResults] = useState<any>(null);
  const [activePolicies, setActivePolicies] = useState<InsurancePolicy[]>([
    {
      id: 'POL-001',
      type: 'Basic Health Insurance',
      premium: '25 MXN',
      coverage: '15,000 MXN',
      duration: '1 month',
      holder: 'Maria Gonzalez',
      status: 'active',
      startDate: '2024-01-15'
    },
    {
      id: 'POL-002',
      type: 'Accident Insurance',
      premium: '15 MXN',
      coverage: '10,000 MXN',
      duration: '1 month',
      holder: 'Carlos Rodriguez',
      status: 'active',
      startDate: '2024-01-10'
    }
  ]);

  const insuranceTypes = [
    {
      id: 'health',
      name: 'Health Insurance',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      description: 'Basic medical coverage for consultations and medications',
      minPremium: '25',
      maxCoverage: '15,000',
      popular: true
    },
    {
      id: 'auto',
      name: 'Auto Insurance',
      icon: <Car className="w-6 h-6 text-blue-500" />,
      description: 'Protection against accidents and vehicle damage',
      minPremium: '50',
      maxCoverage: '25,000',
      popular: false
    },
    {
      id: 'home',
      name: 'Home Insurance',
      icon: <Home className="w-6 h-6 text-green-500" />,
      description: 'Coverage for home damage and belongings',
      minPremium: '30',
      maxCoverage: '20,000',
      popular: false
    },
    {
      id: 'mobile',
      name: 'Mobile Insurance',
      icon: <Smartphone className="w-6 h-6 text-purple-500" />,
      description: 'Protection against theft and device damage',
      minPremium: '10',
      maxCoverage: '5,000',
      popular: true
    }
  ];

  const regions = [
    { code: 'MEX', name: 'Mexico', currency: 'MXN', flag: '🇲🇽' },
    { code: 'BRA', name: 'Brazil', currency: 'BRL', flag: '🇧🇷' },
    { code: 'ARG', name: 'Argentina', currency: 'ARS', flag: '🇦🇷' },
    { code: 'COL', name: 'Colombia', currency: 'COP', flag: '🇨🇴' },
    { code: 'PER', name: 'Peru', currency: 'PEN', flag: '🇵🇪' }
  ];

  const handlePremiumPayment = async () => {
    try {
      const result = await payPremiumGasless({
        policyHolder: '0xb2d64FA9A19eD9b653b70ae648AA70D1e9547e06',
        premiumAmount: demoState.premiumAmount,
        insuranceType: demoState.insuranceType,
        currency: demoState.currency,
        region: demoState.region
      });
      
      // Add new policy
      const newPolicy: InsurancePolicy = {
        id: `POL-${Date.now()}`,
        type: insuranceTypes.find(t => t.id === demoState.insuranceType)?.name || 'Insurance',
        premium: `${demoState.premiumAmount} ${demoState.currency}`,
        coverage: `${parseInt(demoState.premiumAmount) * 600} ${demoState.currency}`,
        duration: '1 month',
        holder: demoState.policyHolderName,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0]
      };
      
      setActivePolicies(prev => [newPolicy, ...prev]);
      
      setResults({
        type: 'premium_payment',
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
        policy: newPolicy
      });
    } catch (err) {
      setResults({
        type: 'premium_payment',
        success: false,
        error: err.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleClaimPayout = async () => {
    try {
      const result = await processClaimPayout({
        claimId: 'demo-claim-001',
        beneficiary: '0xb2d64FA9A19eD9b653b70ae648AA70D1e9547e06',
        amount: demoState.claimAmount,
        preferredCurrency: demoState.preferredCurrency,
        region: demoState.region
      });
      
      setResults({
        type: 'claim_payout',
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
        claim: {
          id: 'CLM-001',
          amount: demoState.claimAmount,
          currency: demoState.preferredCurrency,
          type: 'Medical Reimbursement',
          status: 'Processed'
        }
      });
    } catch (err) {
      setResults({
        type: 'claim_payout',
        success: false,
        error: err.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  const updateDemoState = (field: keyof DemoState, value: string) => {
    setDemoState(prev => ({ ...prev, [field]: value }));
  };

  const selectedInsurance = insuranceTypes.find(t => t.id === demoState.insuranceType);
  const selectedRegion = regions.find(r => r.code === demoState.region);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          🛡️ MicroInsurance - Gasless Payments
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Demonstration of instant premium payments and claims using 0x Protocol
        </p>
      </div>

      {/* Benefits for MicroInsurance */}
      <Card className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700">
        <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Why 0x Protocol for MicroInsurance?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">No Hidden Fees</h3>
            <p className="text-gray-300 text-sm">
              Direct payments without banking fees, ideal for small premiums
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Instant Payments</h3>
            <p className="text-gray-300 text-sm">
              Claims processed in seconds, not days
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Accessible to Everyone</h3>
            <p className="text-gray-300 text-sm">
              Only need a mobile phone, no bank account required
            </p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <Card className="p-6 bg-gray-800 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-green-400" />
            Configure MicroInsurance
          </h2>

          {/* Insurance Type */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">Insurance Type</label>
            <div className="grid grid-cols-2 gap-3">
              {insuranceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateDemoState('insuranceType', type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    demoState.insuranceType === type.id
                      ? 'border-green-500 bg-green-900/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {type.icon}
                    <div className="text-left">
                      <div className="font-semibold text-white">{type.name}</div>
                      <div className="text-xs text-gray-300">{type.description}</div>
                      <div className="text-xs text-green-400 mt-1">
                        From {type.minPremium} {demoState.currency}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">Region</label>
            <div className="grid grid-cols-3 gap-2">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => {
                    updateDemoState('region', region.code);
                    updateDemoState('currency', region.currency);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    demoState.region === region.code
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{region.flag}</div>
                    <div className="text-xs text-white">{region.name}</div>
                    <div className="text-xs text-gray-300">{region.currency}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Amount */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">
              Monthly Premium ({demoState.currency})
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={demoState.premiumAmount}
                onChange={(e) => updateDemoState('premiumAmount', e.target.value)}
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="25"
                min="10"
                max="500"
              />
              <span className="text-gray-300">{demoState.currency}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Estimated coverage: {parseInt(demoState.premiumAmount) * 600} {demoState.currency}
            </div>
          </div>

          {/* Policy Holder Name */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Policy Holder Name</label>
            <input
              type="text"
              value={demoState.policyHolderName}
              onChange={(e) => updateDemoState('policyHolderName', e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="Maria Gonzalez"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePremiumPayment}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              {loading ? (
                <LoadingSpinner className="w-5 h-5 mr-2" />
              ) : (
                <Shield className="w-5 h-5 mr-2" />
              )}
              Pay Premium - {demoState.premiumAmount} {demoState.currency}
            </Button>

            <Button
              onClick={handleClaimPayout}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {loading ? (
                <LoadingSpinner className="w-5 h-5 mr-2" />
              ) : (
                <DollarSign className="w-5 h-5 mr-2" />
              )}
              Process Claim
            </Button>
          </div>
        </Card>

        {/* Results and Policies Panel */}
        <div className="space-y-6">
          {/* Active Policies */}
          <Card className="p-6 bg-gray-800 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Active Policies ({activePolicies.length})
            </h3>
            <div className="space-y-3">
              {activePolicies.map((policy) => (
                <div key={policy.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{policy.type}</h4>
                      <p className="text-sm text-gray-300">ID: {policy.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      policy.status === 'active' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {policy.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Premium:</span>
                      <div className="text-white font-medium">{policy.premium}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Coverage:</span>
                      <div className="text-white font-medium">{policy.coverage}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Holder:</span>
                      <div className="text-white">{policy.holder}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Start Date:</span>
                      <div className="text-white">{policy.startDate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Transaction Results */}
          {results && (
            <Card className="p-6 bg-gray-800 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                {results.success ? (
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                )}
                Transaction Result
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white font-medium">
                      {results.type === 'premium_payment' ? 'Premium Payment' : 'Claim'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-medium ${
                      results.success ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {results.success ? 'Successful' : 'Failed'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">
                      {new Date(results.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {results.success && results.policy && (
                    <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">New Policy Created</h4>
                      <div className="text-sm text-green-300">
                        <div>ID: {results.policy.id}</div>
                        <div>Type: {results.policy.type}</div>
                        <div>Coverage: {results.policy.coverage}</div>
                      </div>
                    </div>
                  )}
                  
                  {results.success && results.claim && (
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Claim Processed</h4>
                      <div className="text-sm text-blue-300">
                        <div>ID: {results.claim.id}</div>
                        <div>Amount: {results.claim.amount} {results.claim.currency}</div>
                        <div>Status: {results.claim.status}</div>
                      </div>
                    </div>
                  )}
                  
                  {!results.success && (
                    <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Error</h4>
                      <div className="text-sm text-red-300">{results.error}</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* MicroInsurance Statistics */}
      <Card className="p-6 bg-gray-800 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
          Impact in Latin America
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1.7B</div>
            <div className="text-gray-300">People without banking access</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">$25</div>
            <div className="text-gray-300">Average monthly premium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">30s</div>
            <div className="text-gray-300">Activation time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">99.7%</div>
            <div className="text-gray-300">Payment success rate</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
