import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import customItemsRouter from './routes/customItems.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', customItemsRouter)

// Root route
app.get('/', (req, res) => {
  res.send('<h1>DIY Delight - Custom Car Builder API</h1>')
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

