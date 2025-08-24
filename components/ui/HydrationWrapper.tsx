'use client'

import { useHydration } from '@/hooks/useHydration'

interface HydrationWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  suppressHydrationWarning?: boolean
}

export function HydrationWrapper({ 
  children, 
  fallback = null, 
  suppressHydrationWarning = false 
}: HydrationWrapperProps) {
  const isHydrated = useHydration()

  if (!isHydrated) {
    return <>{fallback}</>
  }

  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>
      {children}
    </div>
  )
}
