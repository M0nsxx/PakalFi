'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from './Button'

export function WalletTest() {
  const { 
    isConnected, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet, 
    openWalletModal,
    address,
    userData,
    appKit,
    cleanupExpiredProposals
  } = useWallet()
  
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testConnection = async () => {
    addTestResult('🧪 Iniciando prueba de conexión...')
    
    try {
      if (!isConnected) {
        addTestResult('🔗 Intentando conectar wallet...')
        await openWalletModal()
        addTestResult('✅ Modal de wallet abierto')
      } else {
        addTestResult('✅ Wallet ya conectada')
      }
    } catch (error) {
      addTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  const testDisconnect = async () => {
    addTestResult('🔌 Desconectando wallet...')
    try {
      await disconnectWallet()
      addTestResult('✅ Wallet desconectada')
    } catch (error) {
      addTestResult(`❌ Error al desconectar: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  const testAppKitStatus = () => {
    addTestResult('🔍 Verificando estado del AppKit...')
    
    if (appKit) {
      addTestResult('✅ AppKit disponible')
    } else {
      addTestResult('❌ AppKit no disponible')
    }
    
    if (typeof window !== 'undefined' && (window as any).reownAppKit) {
      addTestResult('✅ AppKit global disponible')
    } else {
      addTestResult('❌ AppKit global no disponible')
    }
  }

  const testCleanupProposals = () => {
    addTestResult('🧹 Limpiando propuestas expiradas...')
    try {
      cleanupExpiredProposals()
      addTestResult('✅ Propuestas expiradas limpiadas')
    } catch (error) {
      addTestResult(`❌ Error limpiando propuestas: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">🧪 Prueba de Conexión Wallet</h3>
      
      <div className="space-y-4">
        {/* Estado actual */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Estado Actual:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Conectado:</span>
              <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                {isConnected ? '✅ Sí' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Conectando:</span>
              <span className={isConnecting ? 'text-yellow-400' : 'text-gray-400'}>
                {isConnecting ? '🔄 Sí' : 'No'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">AppKit:</span>
              <span className={appKit ? 'text-green-400' : 'text-red-400'}>
                {appKit ? '✅ Disponible' : '❌ No disponible'}
              </span>
            </div>
            {address && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Dirección:</span>
                <span className="text-blue-400 font-mono text-xs">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
            )}
            {userData && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Usuario:</span>
                <span className="text-green-400">{userData.name}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Error:</span>
                <span className="text-red-400 text-xs">{error.toString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botones de prueba */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={testConnection}
            disabled={isConnecting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isConnecting ? '🔄 Conectando...' : '🔗 Probar Conexión'}
          </Button>
          
          <Button
            onClick={testDisconnect}
            disabled={!isConnected || isConnecting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            🔌 Desconectar
          </Button>
          
          <Button
            onClick={testAppKitStatus}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            🔍 Verificar AppKit
          </Button>
          
          <Button
            onClick={testCleanupProposals}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            🧹 Limpiar Propuestas
          </Button>
        </div>

        {/* Resultados de pruebas */}
        {testResults.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Resultados de Pruebas:</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-xs text-gray-400 font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
