'use client';

import React from 'react';

export default function ParaMonadDemo() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">🚀 Para x Monad Integration</h1>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <h3 className="font-bold mb-2">Para SDK Not Installed</h3>
            <p>Para SDK integration is temporarily disabled. Install @getpara/react-sdk to enable full functionality.</p>
          </div>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <h3 className="font-bold mb-2">Integration Features</h3>
            <ul className="text-left list-disc list-inside">
              <li>App Clips for instant insurance purchase</li>
              <li>QR code scanning for policy activation</li>
              <li>Passkey/Face ID authentication</li>
              <li>USDC payments with embedded wallets</li>
              <li>Monad blockchain integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
