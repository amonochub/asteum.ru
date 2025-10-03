/**
 * Skeleton Component
 * Provides loading placeholders with animation
 * Based on Shadcn UI Skeleton component
 */

import { cn } from '@/lib/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional className for custom styling
   */
  className?: string
}

/**
 * Base Skeleton component
 * Shows an animated pulse effect for loading states
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

/**
 * Card Skeleton - Full card loading placeholder
 */
function CardSkeleton() {
  return (
    <div className='rounded-lg border bg-card p-6 shadow-sm'>
      <div className='space-y-3'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
        <div className='space-y-2 pt-4'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-4/5' />
        </div>
      </div>
    </div>
  )
}

/**
 * Avatar Skeleton - User avatar loading placeholder
 */
function AvatarSkeleton() {
  return <Skeleton className='h-12 w-12 rounded-full' />
}

/**
 * Text Lines Skeleton - Multiple text lines loading placeholder
 */
function TextLinesSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className='space-y-2'>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-4/5' : 'w-full' // Last line shorter
          )}
        />
      ))}
    </div>
  )
}

/**
 * Button Skeleton - Button loading placeholder
 */
function ButtonSkeleton() {
  return <Skeleton className='h-10 w-[100px]' />
}

/**
 * Image Skeleton - Image loading placeholder
 */
function ImageSkeleton({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return <Skeleton className='w-full' style={{ aspectRatio }} />
}

/**
 * Table Row Skeleton - Table row loading placeholder
 */
function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className='flex items-center space-x-4 py-4'>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className='h-4 flex-1' />
      ))}
    </div>
  )
}

/**
 * Page Skeleton - Full page loading placeholder
 */
function PageSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='space-y-2'>
          <Skeleton className='h-8 w-[300px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>

        {/* Content cards */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}

export {
  Skeleton,
  CardSkeleton,
  AvatarSkeleton,
  TextLinesSkeleton,
  ButtonSkeleton,
  ImageSkeleton,
  TableRowSkeleton,
  PageSkeleton,
}
