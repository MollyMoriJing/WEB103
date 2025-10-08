import express from 'express'
import { getAllEvents, getEventById, getEventsByCategory, getUpcomingEvents } from '../controllers/eventsController.js'

const router = express.Router()

// GET /api/events - Get all events
router.get('/', getAllEvents)

// GET /api/events/upcoming - Get upcoming events
router.get('/upcoming', getUpcomingEvents)

// GET /api/events/category/:category - Get events by category
router.get('/category/:category', getEventsByCategory)

// GET /api/events/:id - Get a specific event
router.get('/:id', getEventById)

export default router
