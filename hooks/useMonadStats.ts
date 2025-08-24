import { useState, useEffect } from 'react'

interface MonadStats {
  tps: number
  totalTransactions: number
  isConnected: boolean
  blockHeight: number
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
        // Fetch Monad stats from our API route
        const response = await fetch('/api/monad/stats')
        
        if (!response.ok) {
          throw new Error('Failed to fetch Monad stats from API')
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching Monad stats:', error)
        // Fallback to base stats if API fails
        setStats({
          tps: 8190,
          totalTransactions: 9000,
          isConnected: false,
          blockHeight: 1500000
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMonadStats()
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchMonadStats, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
