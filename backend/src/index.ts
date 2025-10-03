/**
 * Asteum Backend API
 * Main entry point
 */

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import config from './config'
import { initDatabase, closeDatabase } from './database'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

// Import routes
import usersRouter from './routes/users'
import processesRouter from './routes/processes'

const app: Express = express()

// Initialize database
initDatabase()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging in development
if (config.server.env === 'development') {
  app.use((req: Request, _res: Response, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.server.env,
  })
})

// API routes
app.use(`${config.api.prefix}/users`, usersRouter)
app.use(`${config.api.prefix}/processes`, processesRouter)

// API info
app.get(config.api.prefix, (_req: Request, res: Response) => {
  res.json({
    success: true,
    name: 'Asteum Process Flow API',
    version: '1.0.0',
    endpoints: {
      users: `${config.api.prefix}/users`,
      processes: `${config.api.prefix}/processes`,
      health: '/health',
    },
  })
})

// Error handlers
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
const server = app.listen(config.server.port, config.server.host, () => {
  console.log('')
  console.log('🚀 Asteum Backend API')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📍 Server: http://${config.server.host}:${config.server.port}`)
  console.log(`🌐 Environment: ${config.server.env}`)
  console.log(`🗂️  Database: ${config.database.path}`)
  console.log(
    `🔌 API: http://${config.server.host}:${config.server.port}${config.api.prefix}`
  )
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    closeDatabase()
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    closeDatabase()
    process.exit(0)
  })
})

export default app
