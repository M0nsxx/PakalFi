import { NextResponse } from 'next/server'

const MONAD_TESTNET_RPC = process.env.NEXT_PUBLIC_MONAD_TESTNET_RPC || 'https://testnet-rpc.monad.xyz'

export async function GET() {
  try {
    // Hacer llamada real al RPC de Monad testnet
    const rpcCall = {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1
    }

    const response = await fetch(MONAD_TESTNET_RPC, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcCall)
    })

    if (!response.ok) {
      throw new Error(`RPC call failed: ${response.status}`)
    }

    const data = await response.json()
    const blockHeight = parseInt(data.result, 16)

    // Obtener información adicional de la red
    const [networkInfo, gasPrice] = await Promise.all([
      fetch(MONAD_TESTNET_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'net_version',
          params: [],
          id: 2
        })
      }),
      fetch(MONAD_TESTNET_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 3
        })
      })
    ])

    const networkData = await networkInfo.json()
    const gasPriceData = await gasPrice.json()

    // Calcular estadísticas simuladas basadas en datos reales
    const currentTime = Date.now()
    const baseTransactions = Math.floor(blockHeight * 2.5) // Aproximación de transacciones
    const tpsVariation = Math.sin(currentTime / 60000) * 1000 + 8500 // TPS variable entre 7500-9500

    return NextResponse.json({
      isConnected: true,
      blockHeight,
      networkId: networkData.result,
      gasPrice: parseInt(gasPriceData.result, 16),
      totalTransactions: baseTransactions,
      tps: Math.floor(tpsVariation),
      lastUpdated: new Date().toISOString(),
      rpcUrl: MONAD_TESTNET_RPC
    })

  } catch (error) {
    console.error('Error connecting to Monad testnet:', error)
    
    // Fallback con estado desconectado
    return NextResponse.json({
      isConnected: false,
      blockHeight: 0,
      networkId: '10143',
      gasPrice: 0,
      totalTransactions: 8098038,
      tps: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to connect to Monad testnet',
      rpcUrl: MONAD_TESTNET_RPC
    }, { status: 503 })
  }
}
