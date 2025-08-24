import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ENVIO_ENDPOINT = 'https://indexer.envio.dev'
    const ENVIO_API_KEY = '48a3acc9-9ca5-4734-84f5-c260fd8ec3f1'
    
    // Query para obtener datos de transacciones en Monad
    const transactionsQuery = `
      query GetMonadTransactions {
        transactions(
          where: { network: "monad-testnet" }
          orderBy: timestamp
          orderDirection: desc
          first: 10
        ) {
          id
          hash
          from
          to
          value
          gasUsed
          gasPrice
          timestamp
          blockNumber
          status
        }
      }
    `
    
    // Query para obtener estadísticas de la red
    const networkStatsQuery = `
      query GetNetworkStats {
        networkStats(where: { network: "monad-testnet" }) {
          totalTransactions
          totalVolume
          activeUsers
          averageGasPrice
          successRate
        }
      }
    `
    
    try {
      // Intentar obtener datos reales de Envio
      const [transactionsResponse, networkStatsResponse] = await Promise.all([
        fetch(`${ENVIO_ENDPOINT}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ENVIO_API_KEY}`
          },
          body: JSON.stringify({ query: transactionsQuery })
        }),
        fetch(`${ENVIO_ENDPOINT}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ENVIO_API_KEY}`
          },
          body: JSON.stringify({ query: networkStatsQuery })
        })
      ])
      
      const transactionsData = await transactionsResponse.json()
      const networkStatsData = await networkStatsResponse.json()
      
      // Procesar datos reales si están disponibles
      if (transactionsData.data?.transactions || networkStatsData.data?.networkStats) {
        const realData = {
          transactions: transactionsData.data?.transactions || [],
          networkStats: networkStatsData.data?.networkStats || [],
          source: 'envio-hypersync',
          timestamp: new Date().toISOString()
        }
        
        return NextResponse.json({
          success: true,
          data: realData
        })
      }
      
    } catch (apiError) {
      console.log('Envio API not available, using simulated data:', apiError)
    }
    
    // Fallback a datos simulados
    const mockData = {
      transactions: [
        {
          id: '0x1234...5678',
          hash: '0x1234567890abcdef',
          from: '0xabcd...efgh',
          to: '0xijkl...mnop',
          value: '250000000000000000', // 0.25 ETH
          gasUsed: '21000',
          gasPrice: '20000000000', // 20 Gwei
          timestamp: Math.floor(Date.now() / 1000),
          blockNumber: '12345678',
          status: 'success'
        },
        {
          id: '0x8765...4321',
          hash: '0x876543210fedcba9',
          from: '0xqrst...uvwx',
          to: '0xyzaa...bbcc',
          value: '89990000000000000', // 0.08999 ETH
          gasUsed: '65000',
          gasPrice: '18000000000', // 18 Gwei
          timestamp: Math.floor((Date.now() - 30000) / 1000),
          blockNumber: '12345677',
          status: 'success'
        }
      ],
      networkStats: [
        {
          totalTransactions: 15420,
          totalVolume: '2847500000000000000000000', // 2,847,500 ETH
          activeUsers: 1250,
          averageGasPrice: '20000000000', // 20 Gwei
          successRate: 99.7
        }
      ],
      source: 'simulated',
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: mockData
    })
    
  } catch (error) {
    console.error('Error fetching Envio data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Envio data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
