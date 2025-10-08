import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Virtual Community Space API is running!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
// Force restart
