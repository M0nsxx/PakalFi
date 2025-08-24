'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/hooks/useWallet'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { isConnected, isConnecting } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push('/')
    }
  }, [isConnected, isConnecting, router])

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!isConnected) {
    return null // Will redirect to home
  }

  return <Dashboard />
}
