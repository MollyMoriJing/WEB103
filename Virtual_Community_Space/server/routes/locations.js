import express from 'express'
import { getAllLocations, getLocationById, getLocationEvents } from '../controllers/locationsController.js'

const router = express.Router()

// GET /api/locations - Get all locations
router.get('/', getAllLocations)

// GET /api/locations/:id - Get a specific location
router.get('/:id', getLocationById)

// GET /api/locations/:id/events - Get events for a specific location
router.get('/:id/events', getLocationEvents)

export default router
