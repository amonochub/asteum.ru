/**
 * Database initialization and connection
 * Using better-sqlite3 for SQLite
 */

import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import config from '../config'

let db: Database.Database | null = null

/**
 * Initialize database connection
 */
export function initDatabase(): Database.Database {
  if (db) {
    return db
  }

  // Ensure data directory exists
  const dataDir = path.dirname(config.database.path)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Create database connection
  db = new Database(config.database.path, {
    verbose: config.server.env === 'development' ? console.log : undefined,
  })

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL')

  // Initialize schema
  initSchema(db)

  console.log(`✅ Database initialized at ${config.database.path}`)

  return db
}

/**
 * Initialize database schema
 */
function initSchema(database: Database.Database): void {
  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `)

  // Processes table (пример для автоматизации процессов)
  database.exec(`
    CREATE TABLE IF NOT EXISTS processes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      user_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `)

  // Process steps table
  database.exec(`
    CREATE TABLE IF NOT EXISTS process_steps (
      id TEXT PRIMARY KEY,
      process_id TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (process_id) REFERENCES processes(id) ON DELETE CASCADE
    );
  `)

  // Logs table
  database.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      metadata TEXT,
      created_at INTEGER NOT NULL
    );
  `)

  // Create indexes
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_processes_user_id ON processes(user_id);
    CREATE INDEX IF NOT EXISTS idx_process_steps_process_id ON process_steps(process_id);
    CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
  `)

  console.log('✅ Database schema initialized')
}

/**
 * Get database instance
 */
export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return db
}

/**
 * Close database connection
 */
export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
    console.log('✅ Database connection closed')
  }
}
