'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from './Card'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red'
  className?: string
}

const colorVariants = {
  green: {
    icon: 'text-green-400',
    trend: 'text-green-400',
    bg: 'from-green-500/20 to-emerald-600/20',
    border: 'border-green-500/30'
  },
  blue: {
    icon: 'text-blue-400',
    trend: 'text-blue-400',
    bg: 'from-blue-500/20 to-cyan-600/20',
    border: 'border-blue-500/30'
  },
  purple: {
    icon: 'text-purple-400',
    trend: 'text-purple-400',
    bg: 'from-purple-500/20 to-pink-600/20',
    border: 'border-purple-500/30'
  },
  orange: {
    icon: 'text-orange-400',
    trend: 'text-orange-400',
    bg: 'from-orange-500/20 to-yellow-600/20',
    border: 'border-orange-500/30'
  },
  red: {
    icon: 'text-red-400',
    trend: 'text-red-400',
    bg: 'from-red-500/20 to-pink-600/20',
    border: 'border-red-500/30'
  }
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  color = 'green',
  className 
}: StatsCardProps) {
  const colors = colorVariants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        variant="default" 
        className={`bg-gradient-to-br ${colors.bg} border ${colors.border} hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${colors.bg}`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${colors.trend}`}>
                <span className={trend.isPositive ? 'text-green-400' : 'text-red-400'}>
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h3>
            <p className="text-gray-300 font-medium">{title}</p>
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Componente para mostrar múltiples estadísticas en una grilla
interface StatsGridProps {
  stats: StatsCardProps[]
  columns?: 2 | 3 | 4 | 5
  className?: string
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          {...stat}
        />
      ))}
    </div>
  )
}
