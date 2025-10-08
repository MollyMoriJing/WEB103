import { pool } from './database.js'

const resetDatabase = async () => {
  try {
    // Drop tables if they exist
    await pool.query('DROP TABLE IF EXISTS events CASCADE;')
    await pool.query('DROP TABLE IF EXISTS locations CASCADE;')
    
    // Create locations table
    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        address VARCHAR(500),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Create events table
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
        category VARCHAR(100),
        max_attendees INTEGER,
        current_attendees INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    // Insert sample locations
    const locations = [
      {
        name: 'Central Park Community Center',
        description: 'A vibrant hub for community activities, workshops, and social gatherings in the heart of the city.',
        address: '123 Main Street, Downtown',
        image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500'
      },
      {
        name: 'Riverside Arts District',
        description: 'Creative space featuring galleries, studios, and performance venues along the scenic riverfront.',
        address: '456 River Road, Arts Quarter',
        image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500'
      },
      {
        name: 'Green Valley Recreation Center',
        description: 'Family-friendly facility with sports courts, swimming pool, and community meeting rooms.',
        address: '789 Valley Drive, Green Valley',
        image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
      },
      {
        name: 'Tech Innovation Hub',
        description: 'Modern co-working space and technology center for entrepreneurs, developers, and innovators.',
        address: '321 Innovation Way, Tech District',
        image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500'
      }
    ]
    
    for (const location of locations) {
      await pool.query(
        'INSERT INTO locations (name, description, address, image_url) VALUES ($1, $2, $3, $4)',
        [location.name, location.description, location.address, location.image_url]
      )
    }
    
    // Insert sample events
    const events = [
      {
        title: 'Weekly Yoga Class',
        description: 'Join us for a relaxing yoga session suitable for all levels. Bring your own mat!',
        event_date: '2024-12-15 10:00:00',
        location_id: 1,
        category: 'Health & Wellness',
        max_attendees: 25,
        current_attendees: 12
      },
      {
        title: 'Community Garden Workshop',
        description: 'Learn sustainable gardening techniques and help maintain our community garden.',
        event_date: '2024-12-20 14:00:00',
        location_id: 1,
        category: 'Education',
        max_attendees: 15,
        current_attendees: 8
      },
      {
        title: 'Art Gallery Opening',
        description: 'Celebrate local artists with an evening of art, music, and refreshments.',
        event_date: '2024-12-18 18:00:00',
        location_id: 2,
        category: 'Arts & Culture',
        max_attendees: 100,
        current_attendees: 45
      },
      {
        title: 'Pottery Workshop',
        description: 'Hands-on pottery making session for beginners. All materials provided.',
        event_date: '2024-12-22 10:00:00',
        location_id: 2,
        category: 'Arts & Culture',
        max_attendees: 12,
        current_attendees: 6
      },
      {
        title: 'Basketball Tournament',
        description: 'Annual community basketball tournament. Teams of 5 players welcome!',
        event_date: '2024-12-16 09:00:00',
        location_id: 3,
        category: 'Sports',
        max_attendees: 50,
        current_attendees: 32
      },
      {
        title: 'Swimming Lessons',
        description: 'Free swimming lessons for children ages 6-12. Registration required.',
        event_date: '2024-12-19 16:00:00',
        location_id: 3,
        category: 'Education',
        max_attendees: 20,
        current_attendees: 15
      },
      {
        title: 'Startup Pitch Night',
        description: 'Local entrepreneurs present their business ideas to investors and the community.',
        event_date: '2024-12-17 19:00:00',
        location_id: 4,
        category: 'Business',
        max_attendees: 80,
        current_attendees: 28
      },
      {
        title: 'Coding Bootcamp',
        description: 'Intensive 8-week coding bootcamp for aspiring developers. Scholarships available.',
        event_date: '2024-12-21 09:00:00',
        location_id: 4,
        category: 'Education',
        max_attendees: 30,
        current_attendees: 22
      },
      {
        title: 'Community Cleanup Day',
        description: 'Join neighbors in cleaning up local parks and streets. Supplies provided.',
        event_date: '2024-12-14 08:00:00',
        location_id: 1,
        category: 'Community Service',
        max_attendees: 50,
        current_attendees: 18
      },
      {
        title: 'Live Music Night',
        description: 'Local bands perform original music in an intimate setting.',
        event_date: '2024-12-23 20:00:00',
        location_id: 2,
        category: 'Entertainment',
        max_attendees: 60,
        current_attendees: 35
      }
    ]
    
    for (const event of events) {
      await pool.query(
        'INSERT INTO events (title, description, event_date, location_id, category, max_attendees, current_attendees) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [event.title, event.description, event.event_date, event.location_id, event.category, event.max_attendees, event.current_attendees]
      )
    }
    
    console.log('Database reset successfully!')
    console.log('Created tables: locations, events')
    console.log('Inserted sample data')
    
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()
