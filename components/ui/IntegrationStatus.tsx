'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { getConfigStatus } from '@/lib/config/validation'

interface IntegrationStatus {
  name: string
  status: 'connected' | 'disconnected' | 'error' | 'loading'
  lastCheck: Date
  error?: string
}

export function IntegrationStatus() {
  const [statuses, setStatuses] = useState<IntegrationStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkIntegrations = async () => {
      try {
        const config = getConfigStatus()
        const integrationStatuses: IntegrationStatus[] = []

        // Check each integration
        for (const integration of config.integrations) {
          const status: IntegrationStatus = {
            name: integration.name,
            status: 'loading',
            lastCheck: new Date()
          }

          try {
            // Test API connection
            const response = await fetch(`${integration.baseUrl}/health`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${integration.apiKey}`,
                'Content-Type': 'application/json'
              }
            })

            if (response.ok) {
              status.status = 'connected'
            } else {
              status.status = 'error'
              status.error = `HTTP ${response.status}`
            }
                     } catch (error) {
             status.status = 'error'
             status.error = error instanceof Error ? error.message : 'Unknown error'
           }

          integrationStatuses.push(status)
        }

        setStatuses(integrationStatuses)
      } catch (error) {
        console.error('Error checking integrations:', error)
      } finally {
        setLoading(false)
      }
    }

    checkIntegrations()
    
    // Check every 30 seconds
    const interval = setInterval(checkIntegrations, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'loading':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-400'
      case 'disconnected':
        return 'text-red-400'
      case 'error':
        return 'text-yellow-400'
      case 'loading':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking integrations...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {statuses.map((status, index) => (
        <motion.div
          key={status.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2"
          title={status.error || status.name}
        >
          {getStatusIcon(status.status)}
          <span className={`text-xs ${getStatusColor(status.status)}`}>
            {status.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
