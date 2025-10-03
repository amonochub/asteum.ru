/**
 * Backend configuration
 * Loads and validates environment variables
 */

import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config()

interface Config {
  server: {
    env: 'development' | 'production' | 'test'
    port: number
    host: string
  }
  database: {
    path: string
  }
  cors: {
    origin: string
  }
  api: {
    prefix: string
  }
  security: {
    rateLimitWindowMs: number
    rateLimitMaxRequests: number
  }
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

const config: Config = {
  server: {
    env: getEnvVar('NODE_ENV', 'development') as Config['server']['env'],
    port: parseInt(getEnvVar('PORT', '3000'), 10),
    host: getEnvVar('HOST', 'localhost'),
  },
  database: {
    path: getEnvVar('DATABASE_PATH', path.join(__dirname, '../data/asteum.db')),
  },
  cors: {
    origin: getEnvVar('CORS_ORIGIN', 'http://localhost:8080'),
  },
  api: {
    prefix: getEnvVar('API_PREFIX', '/api/v1'),
  },
  security: {
    rateLimitWindowMs: parseInt(
      getEnvVar('RATE_LIMIT_WINDOW_MS', '900000'),
      10
    ),
    rateLimitMaxRequests: parseInt(
      getEnvVar('RATE_LIMIT_MAX_REQUESTS', '100'),
      10
    ),
  },
}

export default config
