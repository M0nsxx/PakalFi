import { useState, useEffect } from 'react'

interface MonadStats {
  tps: number
  totalTransactions: number
  isConnected: boolean
  blockHeight: number
  networkId?: string
  gasPrice?: number
  lastUpdated?: string
  rpcUrl?: string
}

export function useMonadStats() {
  const [stats, setStats] = useState<MonadStats>({
    tps: 8190,
    totalTransactions: 9000,
    isConnected: true,
    blockHeight: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMonadStats = async () => {
      try {
        // Conectar realmente con Monad testnet
        const response = await fetch('/api/monad')
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to connect to Monad`)
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error connecting to Monad testnet:', error)
        // Fallback cuando falla la conexión real
        setStats({
          tps: 0,
          totalTransactions: 8098038,
          isConnected: false,
          blockHeight: 0,
          networkId: '10143',
          gasPrice: 0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMonadStats()
    
    // Actualizar cada 15 segundos para datos en tiempo real
    const interval = setInterval(fetchMonadStats, 15000)
    
    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
