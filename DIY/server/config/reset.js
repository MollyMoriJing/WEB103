import './dotenv.js'
import { pool } from './database.js'

const createTables = async () => {
  const createCustomItemsTableQuery = `
    DROP TABLE IF EXISTS custom_items;

    CREATE TABLE IF NOT EXISTS custom_items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      exterior_color VARCHAR(50) NOT NULL,
      wheels VARCHAR(50) NOT NULL,
      interior VARCHAR(50) NOT NULL,
      roof VARCHAR(50) NOT NULL,
      total_price INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  try {
    await pool.query(createCustomItemsTableQuery)
    console.log('🎉 Tables created successfully')
  } catch (error) {
    console.error('⚠️ Error creating tables', error)
  }
}

const seedData = async () => {
  const seedQuery = `
    INSERT INTO custom_items (name, exterior_color, wheels, interior, roof, total_price)
    VALUES 
      ('Dream Car', 'red', 'sport', 'leather', 'glass', 85000),
      ('City Cruiser', 'blue', 'standard', 'cloth', 'solid', 45000),
      ('Luxury Ride', 'black', 'chrome', 'premium', 'glass', 95000)
  `

  try {
    await pool.query(seedQuery)
    console.log('🌱 Database seeded successfully')
  } catch (error) {
    console.error('⚠️ Error seeding database', error)
  }
}

const setup = async () => {
  await createTables()
  await seedData()
  pool.end()
}

setup()

