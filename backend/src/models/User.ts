/**
 * User model
 */

import { v4 as uuidv4 } from 'uuid'
import { getDatabase } from '../database'

export interface User {
  id: string
  email: string
  name: string
  created_at: number
  updated_at: number
}

export interface CreateUserInput {
  email: string
  name: string
}

export interface UpdateUserInput {
  email?: string
  name?: string
}

/**
 * Create a new user
 */
export function createUser(input: CreateUserInput): User {
  const db = getDatabase()
  const now = Date.now()
  const id = uuidv4()

  const stmt = db.prepare(`
    INSERT INTO users (id, email, name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `)

  stmt.run(id, input.email, input.name, now, now)

  return {
    id,
    ...input,
    created_at: now,
    updated_at: now,
  }
}

/**
 * Get user by ID
 */
export function getUserById(id: string): User | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  return stmt.get(id) as User | null
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): User | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  return stmt.get(email) as User | null
}

/**
 * Get all users
 */
export function getAllUsers(): User[] {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC')
  return stmt.all() as User[]
}

/**
 * Update user
 */
export function updateUser(id: string, input: UpdateUserInput): User | null {
  const db = getDatabase()
  const user = getUserById(id)

  if (!user) {
    return null
  }

  const updates: string[] = []
  const values: any[] = []

  if (input.email !== undefined) {
    updates.push('email = ?')
    values.push(input.email)
  }

  if (input.name !== undefined) {
    updates.push('name = ?')
    values.push(input.name)
  }

  if (updates.length === 0) {
    return user
  }

  updates.push('updated_at = ?')
  values.push(Date.now())
  values.push(id)

  const stmt = db.prepare(`
    UPDATE users
    SET ${updates.join(', ')}
    WHERE id = ?
  `)

  stmt.run(...values)

  return getUserById(id)
}

/**
 * Delete user
 */
export function deleteUser(id: string): boolean {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM users WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}
