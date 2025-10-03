/**
 * Test suite for Skeleton components
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Skeleton,
  CardSkeleton,
  AvatarSkeleton,
  TextLinesSkeleton,
  ButtonSkeleton,
  PageSkeleton,
} from '@/components/ui/skeleton'

describe('Skeleton Components', () => {
  describe('Base Skeleton', () => {
    it('renders with default styles', () => {
      const { container } = render(<Skeleton />)
      const skeleton = container.firstChild as HTMLElement

      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('rounded-md')
      expect(skeleton).toHaveClass('bg-muted')
    })

    it('applies custom className', () => {
      const { container } = render(<Skeleton className='custom-class' />)
      const skeleton = container.firstChild as HTMLElement

      expect(skeleton).toHaveClass('custom-class')
      expect(skeleton).toHaveClass('animate-pulse') // Base classes preserved
    })

    it('passes through HTML attributes', () => {
      const { container } = render(
        <Skeleton data-testid='test-skeleton' aria-label='Loading' />
      )
      const skeleton = container.firstChild as HTMLElement

      expect(skeleton).toHaveAttribute('data-testid', 'test-skeleton')
      expect(skeleton).toHaveAttribute('aria-label', 'Loading')
    })
  })

  describe('CardSkeleton', () => {
    it('renders card structure', () => {
      const { container } = render(<CardSkeleton />)

      expect(container.querySelector('.rounded-lg')).toBeInTheDocument()
      expect(container.querySelector('.border')).toBeInTheDocument()
      expect(container.querySelector('.bg-card')).toBeInTheDocument()
    })

    it('renders multiple skeleton elements', () => {
      const { container } = render(<CardSkeleton />)
      const skeletons = container.querySelectorAll('.animate-pulse')

      expect(skeletons.length).toBeGreaterThan(1)
    })
  })

  describe('AvatarSkeleton', () => {
    it('renders with circular shape', () => {
      const { container } = render(<AvatarSkeleton />)
      const avatar = container.firstChild as HTMLElement

      expect(avatar).toHaveClass('rounded-full')
      expect(avatar).toHaveClass('h-12')
      expect(avatar).toHaveClass('w-12')
    })
  })

  describe('TextLinesSkeleton', () => {
    it('renders default number of lines', () => {
      const { container } = render(<TextLinesSkeleton />)
      const lines = container.querySelectorAll('.animate-pulse')

      expect(lines.length).toBe(3)
    })

    it('renders custom number of lines', () => {
      const { container } = render(<TextLinesSkeleton lines={5} />)
      const lines = container.querySelectorAll('.animate-pulse')

      expect(lines.length).toBe(5)
    })

    it('last line is shorter', () => {
      const { container } = render(<TextLinesSkeleton lines={3} />)
      const lines = Array.from(container.querySelectorAll('.animate-pulse'))
      const lastLine = lines[lines.length - 1] as HTMLElement

      expect(lastLine).toHaveClass('w-4/5')
    })
  })

  describe('ButtonSkeleton', () => {
    it('renders with button dimensions', () => {
      const { container } = render(<ButtonSkeleton />)
      const button = container.firstChild as HTMLElement

      expect(button).toHaveClass('h-10')
      expect(button).toHaveClass('w-[100px]')
    })
  })

  describe('PageSkeleton', () => {
    it('renders page structure', () => {
      render(<PageSkeleton />)

      expect(
        screen.getByText((_, element) => {
          return element?.className.includes('container') ?? false
        })
      ).toBeInTheDocument()
    })

    it('renders multiple card skeletons', () => {
      const { container } = render(<PageSkeleton />)
      const cards = container.querySelectorAll('.rounded-lg.border')

      expect(cards.length).toBe(3)
    })
  })
})
