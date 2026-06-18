import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import hierarchyRoutes from './routes/hierarchyRoutes.js'
import supportRoutes from './routes/supportRoutes.js'

export function createApp() {
  const app = express()
  const clientOrigin = process.env.CLIENT_ORIGIN || 'http://127.0.0.1:4173'

  app.use(
    cors({
      origin: clientOrigin,
      credentials: true,
    })
  )
  app.use(express.json())

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'lpay-server',
      time: new Date().toISOString(),
    })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/hierarchy', hierarchyRoutes)
  app.use('/api/support', supportRoutes)

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' })
  })

  app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.' })
  })

  return app
}
