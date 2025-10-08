import { pool } from '../config/database.js'

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, l.name as location_name, l.address as location_address 
      FROM events e 
      JOIN locations l ON e.location_id = l.id 
      ORDER BY e.event_date
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT e.*, l.name as location_name, l.address as location_address 
      FROM events e 
      JOIN locations l ON e.location_id = l.id 
      WHERE e.id = $1
    `, [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
}

// Get events by category
export const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const result = await pool.query(`
      SELECT e.*, l.name as location_name, l.address as location_address 
      FROM events e 
      JOIN locations l ON e.location_id = l.id 
      WHERE e.category = $1 
      ORDER BY e.event_date
    `, [category])
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching events by category:', error)
    res.status(500).json({ error: 'Failed to fetch events by category' })
  }
}

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, l.name as location_name, l.address as location_address 
      FROM events e 
      JOIN locations l ON e.location_id = l.id 
      WHERE e.event_date > NOW() 
      ORDER BY e.event_date
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    res.status(500).json({ error: 'Failed to fetch upcoming events' })
  }
}
