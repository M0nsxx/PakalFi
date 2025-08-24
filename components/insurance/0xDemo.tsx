'use client';

import React, { useState } from 'react';
import { use0xInsurance } from '@/lib/integrations/0xProtocol';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface DemoState {
  premiumAmount: string;
  currency: string;
  insuranceType: string;
  region: string;
  claimAmount: string;
  preferredCurrency: string;
}

export default function ZeroXDemo() {
  const { payPremiumGasless, processClaimPayout, loading, error } = use0xInsurance();
  const [demoState, setDemoState] = useState<DemoState>({
    premiumAmount: '100',
    currency: 'MXN',
    insuranceType: 'health',
    region: 'LATAM',
    claimAmount: '500',
    preferredCurrency: 'BRL'
  });

  const [results, setResults] = useState<any>(null);

  const handlePremiumPayment = async () => {
    try {
      const result = await payPremiumGasless({
        policyHolder: '0xb2d64FA9A19eD9b653b70ae648AA70D1e9547e06', // Demo address
        premiumAmount: demoState.premiumAmount,
        insuranceType: demoState.insuranceType,
        currency: demoState.currency,
        region: demoState.region
      });
      
      setResults({
        type: 'premium_payment',
        success: true,
        data: result,
        timestamp: new Date().toISOString()
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
        beneficiary: '0xb2d64FA9A19eD9b653b70ae648AA70D1e9547e06', // Demo address
        amount: demoState.claimAmount,
        preferredCurrency: demoState.preferredCurrency,
        region: demoState.region
      });
      
      setResults({
        type: 'claim_payout',
        success: true,
        data: result,
        timestamp: new Date().toISOString()
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🚀 0x Protocol Integration Demo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Demostración de integración con 0x Swap API y Gasless API para MicroInsurance
        </p>
      </div>

      {/* Hackathon Requirements */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          🏆 Hackathon Requirements - 0x Bounty ($4,000 USD)
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">✅ Implementado:</h3>
            <ul className="space-y-1 text-blue-700">
              <li>• Swap API v2 en Monad testnet</li>
              <li>• Gasless API para transacciones sin gas</li>
              <li>• Flujo end-to-end gasless completo</li>
              <li>• Optimizado para móviles (LATAM)</li>
              <li>• Soporte para stablecoins</li>
              <li>• Integración con smart contracts</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">🎯 Casos de Uso:</h3>
            <ul className="space-y-1 text-green-700">
              <li>• Pagos de primas sin gas fees</li>
              <li>• Payouts instantáneos de claims</li>
              <li>• Conversión automática de monedas</li>
              <li>• Transacciones cross-border</li>
              <li>• Onboarding sin wallet funding</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Demo Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Premium Payment Demo */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            💳 Gasless Premium Payment
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={demoState.premiumAmount}
                onChange={(e) => updateDemoState('premiumAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                value={demoState.currency}
                onChange={(e) => updateDemoState('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MXN">MXN (México)</option>
                <option value="BRL">BRL (Brasil)</option>
                <option value="NGN">NGN (Nigeria)</option>
                <option value="KES">KES (Kenya)</option>
                <option value="INR">INR (India)</option>
                <option value="PHP">PHP (Filipinas)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Type
              </label>
              <select
                value={demoState.insuranceType}
                onChange={(e) => updateDemoState('insuranceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="health">Health Insurance</option>
                <option value="climate">Climate Insurance</option>
                <option value="security">Security Insurance</option>
                <option value="mobility">Mobility Insurance</option>
              </select>
            </div>

            <Button
              onClick={handlePremiumPayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Processing Gasless Payment...
                </>
              ) : (
                '💸 Pay Premium Gasless'
              )}
            </Button>
          </div>
        </Card>

        {/* Claim Payout Demo */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎁 Instant Claim Payout
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Claim Amount (USDC)
              </label>
              <input
                type="number"
                value={demoState.claimAmount}
                onChange={(e) => updateDemoState('claimAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Currency
              </label>
              <select
                value={demoState.preferredCurrency}
                onChange={(e) => updateDemoState('preferredCurrency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BRL">BRL (Brasil)</option>
                <option value="MXN">MXN (México)</option>
                <option value="NGN">NGN (Nigeria)</option>
                <option value="KES">KES (Kenya)</option>
                <option value="INR">INR (India)</option>
                <option value="PHP">PHP (Filipinas)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                value={demoState.region}
                onChange={(e) => updateDemoState('region', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LATAM">LATAM</option>
                <option value="AFRICA">Africa</option>
                <option value="SOUTHEAST_ASIA">Southeast Asia</option>
              </select>
            </div>

            <Button
              onClick={handleClaimPayout}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Processing Gasless Payout...
                </>
              ) : (
                '⚡ Process Claim Gasless'
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </Card>
      )}

      {/* Results Display */}
      {results && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Transaction Results
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Type:</span> {results.type}
              </div>
              <div>
                <span className="font-semibold">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  results.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {results.success ? 'Success' : 'Failed'}
                </span>
              </div>
              <div>
                <span className="font-semibold">Timestamp:</span> {new Date(results.timestamp).toLocaleString()}
              </div>
              {results.error && (
                <div className="md:col-span-2">
                  <span className="font-semibold">Error:</span> {results.error}
                </div>
              )}
            </div>
            
            {results.data && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Transaction Details:</h4>
                <pre className="bg-white p-3 rounded border text-xs overflow-auto">
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Technical Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔧 Technical Implementation
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">API Endpoints</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• GET /api/0x/swap - Get quotes</li>
              <li>• POST /api/0x/swap - Execute swaps</li>
              <li>• POST /api/0x/gasless - Gasless transactions</li>
              <li>• GET /api/0x/gasless - Check status</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Smart Contracts</h4>
            <ul className="space-y-1 text-green-700">
              <li>• GaslessPaymentHandler.sol</li>
              <li>• InsurancePool.sol</li>
              <li>• PolicyNFT.sol</li>
              <li>• Chain ID: 10143 (Monad)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Features</h4>
            <ul className="space-y-1 text-purple-700">
              <li>• Gasless payments</li>
              <li>• Instant claims</li>
              <li>• Cross-border swaps</li>
              <li>• Mobile optimized</li>
              <li>• Regional support</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
