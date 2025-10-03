/**
 * User routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import * as UserModel from '../models/User'

const router = Router()

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
})

/**
 * GET /users
 * Get all users
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const users = UserModel.getAllUsers()
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
})

/**
 * GET /users/:id
 * Get user by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const user = UserModel.getUserById(req.params.id)

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    return res.json({ success: true, data: user })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Failed to fetch user' })
  }
})

/**
 * POST /users
 * Create new user
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const input = createUserSchema.parse(req.body)

    // Check if email already exists
    const existingUser = UserModel.getUserByEmail(input.email)
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: 'Email already exists' })
    }

    const user = UserModel.createUser(input)
    return res.status(201).json({ success: true, data: user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors })
    }
    return res
      .status(500)
      .json({ success: false, error: 'Failed to create user' })
  }
})

/**
 * PATCH /users/:id
 * Update user
 */
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const input = updateUserSchema.parse(req.body)
    const user = UserModel.updateUser(req.params.id, input)

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    return res.json({ success: true, data: user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors })
    }
    return res
      .status(500)
      .json({ success: false, error: 'Failed to update user' })
  }
})

/**
 * DELETE /users/:id
 * Delete user
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const success = UserModel.deleteUser(req.params.id)

    if (!success) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    return res.json({ success: true, message: 'User deleted' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Failed to delete user' })
  }
})

export default router
