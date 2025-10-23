import express from 'express'
import { 
  getAllCustomItems, 
  getCustomItem, 
  createCustomItem, 
  updateCustomItem, 
  deleteCustomItem 
} from '../controllers/customItems.js'

const router = express.Router()

// GET all custom items
router.get('/custom-items', getAllCustomItems)

// GET a single custom item by id
router.get('/custom-items/:id', getCustomItem)

// POST a new custom item
router.post('/custom-items', createCustomItem)

// PATCH (update) a custom item
router.patch('/custom-items/:id', updateCustomItem)

// DELETE a custom item
router.delete('/custom-items/:id', deleteCustomItem)

export default router

