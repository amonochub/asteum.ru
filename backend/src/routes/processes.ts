/**
 * Process routes
 */

import { Router, Request, Response } from 'express'
import { z } from 'zod'
import * as ProcessModel from '../models/Process'

const router = Router()

// Validation schemas
const createProcessSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  user_id: z.string().uuid(),
})

const updateProcessSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'completed', 'archived']).optional(),
})

/**
 * GET /processes
 * Get all processes (optionally filtered by user_id)
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { user_id } = req.query

    const processes = user_id
      ? ProcessModel.getProcessesByUserId(user_id as string)
      : ProcessModel.getAllProcesses()

    res.json({ success: true, data: processes })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch processes' })
  }
})

/**
 * GET /processes/:id
 * Get process by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const process = ProcessModel.getProcessById(req.params.id)

    if (!process) {
      return res
        .status(404)
        .json({ success: false, error: 'Process not found' })
    }

    return res.json({ success: true, data: process })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Failed to fetch process' })
  }
})

/**
 * POST /processes
 * Create new process
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const input = createProcessSchema.parse(req.body)
    const process = ProcessModel.createProcess(input)

    return res.status(201).json({ success: true, data: process })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors })
    }
    return res
      .status(500)
      .json({ success: false, error: 'Failed to create process' })
  }
})

/**
 * PATCH /processes/:id
 * Update process
 */
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const input = updateProcessSchema.parse(req.body)
    const process = ProcessModel.updateProcess(req.params.id, input)

    if (!process) {
      return res
        .status(404)
        .json({ success: false, error: 'Process not found' })
    }

    return res.json({ success: true, data: process })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors })
    }
    return res
      .status(500)
      .json({ success: false, error: 'Failed to update process' })
  }
})

/**
 * DELETE /processes/:id
 * Delete process
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const success = ProcessModel.deleteProcess(req.params.id)

    if (!success) {
      return res
        .status(404)
        .json({ success: false, error: 'Process not found' })
    }

    return res.json({ success: true, message: 'Process deleted' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Failed to delete process' })
  }
})

export default router
