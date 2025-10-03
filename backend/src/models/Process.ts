/**
 * Process model (пример бизнес-сущности)
 */

import { v4 as uuidv4 } from 'uuid'
import { getDatabase } from '../database'

export interface Process {
  id: string
  name: string
  description: string | null
  status: 'active' | 'completed' | 'archived'
  user_id: string
  created_at: number
  updated_at: number
}

export interface CreateProcessInput {
  name: string
  description?: string
  user_id: string
}

export interface UpdateProcessInput {
  name?: string
  description?: string
  status?: Process['status']
}

/**
 * Create a new process
 */
export function createProcess(input: CreateProcessInput): Process {
  const db = getDatabase()
  const now = Date.now()
  const id = uuidv4()

  const stmt = db.prepare(`
    INSERT INTO processes (id, name, description, status, user_id, created_at, updated_at)
    VALUES (?, ?, ?, 'active', ?, ?, ?)
  `)

  stmt.run(id, input.name, input.description || null, input.user_id, now, now)

  return {
    id,
    name: input.name,
    description: input.description || null,
    status: 'active',
    user_id: input.user_id,
    created_at: now,
    updated_at: now,
  }
}

/**
 * Get process by ID
 */
export function getProcessById(id: string): Process | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM processes WHERE id = ?')
  return stmt.get(id) as Process | null
}

/**
 * Get all processes for user
 */
export function getProcessesByUserId(userId: string): Process[] {
  const db = getDatabase()
  const stmt = db.prepare(`
    SELECT * FROM processes 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `)
  return stmt.all(userId) as Process[]
}

/**
 * Get all processes
 */
export function getAllProcesses(): Process[] {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM processes ORDER BY created_at DESC')
  return stmt.all() as Process[]
}

/**
 * Update process
 */
export function updateProcess(
  id: string,
  input: UpdateProcessInput
): Process | null {
  const db = getDatabase()
  const process = getProcessById(id)

  if (!process) {
    return null
  }

  const updates: string[] = []
  const values: any[] = []

  if (input.name !== undefined) {
    updates.push('name = ?')
    values.push(input.name)
  }

  if (input.description !== undefined) {
    updates.push('description = ?')
    values.push(input.description)
  }

  if (input.status !== undefined) {
    updates.push('status = ?')
    values.push(input.status)
  }

  if (updates.length === 0) {
    return process
  }

  updates.push('updated_at = ?')
  values.push(Date.now())
  values.push(id)

  const stmt = db.prepare(`
    UPDATE processes
    SET ${updates.join(', ')}
    WHERE id = ?
  `)

  stmt.run(...values)

  return getProcessById(id)
}

/**
 * Delete process
 */
export function deleteProcess(id: string): boolean {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM processes WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}
