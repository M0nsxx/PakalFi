'use client'

import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        default: 'text-green-500',
        white: 'text-white',
        gray: 'text-gray-400',
        blue: 'text-blue-500',
        red: 'text-red-500',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ 
  className, 
  size, 
  color, 
  text, 
  fullScreen = false,
  ...props 
}: LoadingSpinnerProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center', className)} {...props}>
      <motion.div
        className={cn(spinnerVariants({ size, color }))}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <motion.p
          className="mt-3 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return content
}

// Componente de skeleton para contenido
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-700', className)}
      {...props}
    />
  )
}

// Componente de skeleton para texto
export function SkeletonText({ 
  lines = 1, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Componente de skeleton para cards
export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('card-modern', className)} {...props}>
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <SkeletonText lines={2} />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  )
}
