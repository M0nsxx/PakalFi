import React, { useState, useEffect } from 'react';
import { createAppKit } from '@reown/appkit';
import type { Chain } from 'viem';

// Chain configuration for Monad testnet
export const monadTestnet: Chain = {
  id: 41454,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MONAD',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.monad-testnet.com'],
    },
    public: {
      http: ['https://rpc.monad-testnet.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://explorer.monad-testnet.com',
    },
  },
} as const;

// Types for Reown integration
interface ReownUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  provider?: string;
}

interface InsuranceWallet {
  address: string;
  provider: string;
  userId: string;
  createdAt: string;
}

interface PolicyData {
  id: string;
  name: string;
  price: string;
  coverage: string;
  icon: string;
}

interface KYCData {
  name: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

export function initializeReownForInsurance() {
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

  if (!projectId) {
    console.warn('Reown Project ID not found. Please set NEXT_PUBLIC_REOWN_PROJECT_ID');
    return null;
  }

  try {
    return createAppKit({
      projectId,
      networks: [monadTestnet],
      metadata: {
        name: 'MicroInsurance - Global Platform',
        description: 'Democratizing insurance access for 1.7B unbanked people globally',
        url: 'https://microinsurance.global',
        icons: ['https://microinsurance.global/icon.png']
      },
      features: {
        analytics: true,
        email: true,
        socials: ['google', 'apple'],
        swaps: true,
        onramp: true
      },
      themeMode: 'light',
      themeVariables: {
        '--w3m-color-mix': '#00D4AA',
        '--w3m-color-mix-strength': 40,
        '--w3m-font-family': 'Inter, sans-serif'
      },
      includeWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase
        '225aff5c7bcdd1f84b41cd3abf636b3d3d1d8e3b3c3c3c3c3c3c3c3c3c3c3c3c', // Rainbow
        'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a', // Uniswap
        '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927', // 1inch
      ],
      customWallets: [
        {
          id: 'microinsurance-wallet',
          name: 'MicroInsurance Wallet',
          homepage: 'https://microinsurance.global',
          image_url: 'https://microinsurance.global/wallet-icon.png',
          mobile_link: 'https://microinsurance.global/app',
          desktop_link: 'https://microinsurance.global/desktop',
          webapp_link: 'https://microinsurance.global/webapp',
          app_store: 'https://apps.apple.com/app/microinsurance',
          play_store: 'https://play.google.com/store/apps/details?id=com.microinsurance.app'
        }
      ]
    });
  } catch (error) {
    console.error('Failed to initialize Reown AppKit:', error);
    return null;
  }
}

// Social onboarding component
export function InsuranceSocialOnboarding() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userData, setUserData] = useState<ReownUser | null>(null);
  const [insuranceWallet, setInsuranceWallet] = useState<InsuranceWallet | null>(null);

  const handleSocialLogin = async (provider: string) => {
    try {
      // Initialize Reown AppKit
      const appKit = initializeReownForInsurance();
      if (!appKit) {
        throw new Error('Failed to initialize Reown AppKit');
      }

      // Open social login modal
      await appKit.open({ 
        view: 'Connect'
      });

      // For demo purposes, create a mock user
      const mockUser: ReownUser = {
        id: 'demo-user-123',
        email: 'demo@microinsurance.global',
        name: 'Demo User',
        provider: provider
      };

      // Auto-create insurance wallet
      const wallet = await createInsuranceWallet(mockUser);
      setInsuranceWallet(wallet);
      
      // Start KYC process
      await initiateKYC(wallet);
      
      setUserData(mockUser);
      setOnboardingStep(1);
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  const createInsuranceWallet = async (userData: ReownUser): Promise<InsuranceWallet> => {
    // Create embedded wallet for insurance
    const wallet: InsuranceWallet = {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      provider: userData.provider || 'unknown',
      userId: userData.id,
      createdAt: new Date().toISOString()
    };

    // Store wallet data
    if (typeof window !== 'undefined') {
      localStorage.setItem('insuranceWallet', JSON.stringify(wallet));
    }
    
    return wallet;
  };

  const initiateKYC = async (wallet: InsuranceWallet) => {
    // Start KYC process with user data
    const kycData = {
      walletAddress: wallet.address,
      provider: wallet.provider,
      userId: wallet.userId,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    // Send to backend for processing
    try {
      await fetch('/api/kyc/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kycData)
      });
    } catch (error) {
      console.error('KYC initiation error:', error);
    }
  };

  const createPolicy = async (policyData: PolicyData) => {
    try {
      const response = await fetch('/api/policies/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...policyData,
          walletAddress: insuranceWallet?.address,
          userId: userData?.id
        })
      });

      if (response.ok) {
        setOnboardingStep(3);
        return await response.json();
      }
    } catch (error) {
      console.error('Policy creation error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Insured in 60 Seconds
        </h2>
        <p className="text-gray-600">
          Choose your preferred login method to get started
        </p>
      </div>
      
      <div className="space-y-4">
        <SocialButton
          onClick={() => handleSocialLogin('google')}
          icon="🔍"
          text="Continue with Google"
          primary
        />
        
        <SocialButton
          onClick={() => handleSocialLogin('apple')}
          icon="🍎"
          text="Continue with Apple"
        />
      </div>

      {onboardingStep === 1 && (
        <QuickKYCForm onComplete={() => setOnboardingStep(2)} />
      )}
      
      {onboardingStep === 2 && (
        <PolicySelection onSelect={createPolicy} />
      )}

      {onboardingStep === 3 && (
        <SuccessScreen wallet={insuranceWallet} />
      )}
    </div>
  );
}

// Social button component
interface SocialButtonProps {
  onClick: () => void;
  icon: string;
  text: string;
  primary?: boolean;
}

function SocialButton({ onClick, icon, text, primary = false }: SocialButtonProps) {
  const className = `w-full py-3 px-4 rounded-xl font-semibold transition-all ${
    primary 
      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
  }`;

  return (
    <button onClick={onClick} className={className}>
      <div className="flex items-center justify-center gap-3">
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </div>
    </button>
  );
}

// Quick KYC form
interface QuickKYCFormProps {
  onComplete: () => void;
}

function QuickKYCForm({ onComplete }: QuickKYCFormProps) {
  const [formData, setFormData] = useState<KYCData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    dateOfBirth: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit KYC data
    try {
      await fetch('/api/kyc/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      onComplete();
    } catch (error) {
      console.error('KYC submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-900">Quick Verification</h3>
      
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
      
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      />
      
      <select
        value={formData.country}
        onChange={(e) => setFormData({...formData, country: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        required
      >
        <option value="">Select Country</option>
        <option value="MX">Mexico</option>
        <option value="BR">Brazil</option>
        <option value="CO">Colombia</option>
        <option value="NG">Nigeria</option>
        <option value="KE">Kenya</option>
        <option value="IN">India</option>
        <option value="ID">Indonesia</option>
      </select>
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
      >
        Continue
      </button>
    </form>
  );
}

// Policy selection component
interface PolicySelectionProps {
  onSelect: (policy: PolicyData) => void;
}

function PolicySelection({ onSelect }: PolicySelectionProps) {
  const policies: PolicyData[] = [
    {
      id: 'health',
      name: 'Micro-Health',
      price: '$2-15',
      coverage: 'Medical emergencies',
      icon: '🏥'
    },
    {
      id: 'climate',
      name: 'Micro-Climate',
      price: '$1-10',
      coverage: 'Weather protection',
      icon: '🌦️'
    },
    {
      id: 'security',
      name: 'Micro-Security',
      price: '$1-8',
      coverage: 'Theft & safety',
      icon: '🛡️'
    },
    {
      id: 'mobility',
      name: 'Micro-Mobility',
      price: '$2-12',
      coverage: 'Accidents & transport',
      icon: '🚗'
    }
  ];

  const handleSelect = (policy: PolicyData) => {
    onSelect(policy);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Protection</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {policies.map((policy) => (
          <button
            key={policy.id}
            onClick={() => handleSelect(policy)}
            className="p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all text-left"
          >
            <div className="text-2xl mb-2">{policy.icon}</div>
            <div className="font-semibold text-gray-900">{policy.name}</div>
            <div className="text-sm text-gray-600">{policy.price}/month</div>
            <div className="text-xs text-gray-500">{policy.coverage}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Success screen
interface SuccessScreenProps {
  wallet: InsuranceWallet | null;
}

function SuccessScreen({ wallet }: SuccessScreenProps) {
  return (
    <div className="text-center mt-6">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Welcome to MicroInsurance!
      </h3>
      <p className="text-gray-600 mb-4">
        Your insurance wallet has been created successfully.
      </p>
      <div className="bg-gray-100 p-3 rounded-xl text-sm font-mono text-gray-700">
        {wallet?.address}
      </div>
    </div>
  );
}

// Telegram Mini App for Insurance
export function TelegramInsuranceMiniApp() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Set theme colors
      window.Telegram.WebApp.setHeaderColor('#00D4AA');
      window.Telegram.WebApp.setBackgroundColor('#F8F9FA');
      
      // Get user data
      const initData = window.Telegram.WebApp.initDataUnsafe;
      authenticateUser(initData);
    }
  }, []);

  const authenticateUser = async (initData: any) => {
    try {
      const response = await fetch('/api/telegram/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initData)
      });

      if (response.ok) {
        const userData = await response.json();
        // Store user data and proceed with insurance flow
      }
    } catch (error) {
      console.error('Telegram auth error:', error);
    }
  };

  return (
    <div className="telegram-mini-app bg-white min-h-screen">
      <div className="p-4">
        <InsuranceQuickBuy />
        <ClaimStatus />
        <PolicyManager />
      </div>
    </div>
  );
}

// Farcaster Frame for Insurance
export function FarcasterInsuranceFrame() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 p-6">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-2">MicroInsurance</h1>
        <p className="text-sm mb-4">Protection for Everyone, Everywhere</p>
        
        <div className="space-y-2">
          <button className="w-full bg-white text-green-600 py-2 px-4 rounded-lg font-semibold">
            Get Coverage Now
          </button>
          <button className="w-full bg-white/20 text-white py-2 px-4 rounded-lg font-semibold">
            Check Claim Status
          </button>
          <button className="w-full bg-white/20 text-white py-2 px-4 rounded-lg font-semibold">
            Open Full App
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for using Reown in components
export function useReownInsurance() {
  const [appKit, setAppKit] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState<ReownUser | null>(null);

  useEffect(() => {
    const init = async () => {
      const kit = initializeReownForInsurance();
      if (kit) {
        setAppKit(kit);
        
        // For demo purposes, assume connected
        setIsConnected(true);
        setUserData({
          id: 'demo-user',
          email: 'demo@microinsurance.global',
          name: 'Demo User'
        });
      }
    };

    init();
  }, []);

  const connect = async () => {
    if (appKit) {
      try {
        const result = await appKit.open({ view: 'Connect' });
        if (result) {
          setIsConnected(true);
          setUserData(result);
        }
      } catch (error) {
        console.error('Connection error:', error);
      }
    }
  };

  const disconnect = async () => {
    if (appKit) {
      try {
        await appKit.disconnect();
        setIsConnected(false);
        setUserData(null);
      } catch (error) {
        console.error('Disconnection error:', error);
      }
    }
  };

  return {
    appKit,
    isConnected,
    userData,
    connect,
    disconnect
  };
}

// Placeholder components for Telegram Mini App
function InsuranceQuickBuy() {
  return <div>Insurance Quick Buy Component</div>;
}

function ClaimStatus() {
  return <div>Claim Status Component</div>;
}

function PolicyManager() {
  return <div>Policy Manager Component</div>;
}

// Extend Window interface for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        initDataUnsafe: any;
      };
    };
  }
}
