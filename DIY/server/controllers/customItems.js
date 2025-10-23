import { pool } from '../config/database.js'

// Get all custom items
export const getAllCustomItems = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM custom_items ORDER BY id DESC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single custom item by id
export const getCustomItem = async (req, res) => {
  try {
    const { id } = req.params
    const results = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
    
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }
    
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new custom item
export const createCustomItem = async (req, res) => {
  try {
    const { name, exterior_color, wheels, interior, roof, total_price } = req.body
    
    // Validation: Check for impossible combinations
    // Example: Can't have chrome wheels with standard interior
    if (wheels === 'chrome' && interior === 'cloth') {
      return res.status(400).json({ 
        error: 'Invalid combination: Chrome wheels cannot be paired with cloth interior. Please choose a premium interior.' 
      })
    }
    
    // Example: Glass roof requires premium interior
    if (roof === 'glass' && interior === 'cloth') {
      return res.status(400).json({ 
        error: 'Invalid combination: Glass roof requires a leather or premium interior.' 
      })
    }

    const results = await pool.query(
      'INSERT INTO custom_items (name, exterior_color, wheels, interior, roof, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, exterior_color, wheels, interior, roof, total_price]
    )
    
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a custom item
export const updateCustomItem = async (req, res) => {
  try {
    const { id } = req.params
    const { name, exterior_color, wheels, interior, roof, total_price } = req.body
    
    // Same validation as create
    if (wheels === 'chrome' && interior === 'cloth') {
      return res.status(400).json({ 
        error: 'Invalid combination: Chrome wheels cannot be paired with cloth interior. Please choose a premium interior.' 
      })
    }
    
    if (roof === 'glass' && interior === 'cloth') {
      return res.status(400).json({ 
        error: 'Invalid combination: Glass roof requires a leather or premium interior.' 
      })
    }

    const results = await pool.query(
      'UPDATE custom_items SET name = $1, exterior_color = $2, wheels = $3, interior = $4, roof = $5, total_price = $6 WHERE id = $7 RETURNING *',
      [name, exterior_color, wheels, interior, roof, total_price, id]
    )
    
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }
    
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a custom item
export const deleteCustomItem = async (req, res) => {
  try {
    const { id } = req.params
    const results = await pool.query('DELETE FROM custom_items WHERE id = $1 RETURNING *', [id])
    
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Custom item not found' })
    }
    
    res.status(200).json({ message: 'Custom item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

