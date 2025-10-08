#!/usr/bin/env node
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config({ path: __dirname + '/../.env' });

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    console.log('🌱 Seeding pet-friendly data...');

    await pool.query(`CREATE TABLE IF NOT EXISTS locations ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, address VARCHAR(500), image_url VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS events ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, event_date TIMESTAMP NOT NULL, location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE, category VARCHAR(100), max_attendees INTEGER, current_attendees INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`);

    await pool.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE locations RESTART IDENTITY CASCADE;');

    const locations = [
      ['Paws & Play Dog Park','Fully fenced off-leash park with water fountains and agility equipment.','101 Bark Blvd, Downtown','https://images.unsplash.com/photo-1507149833265-60c372daea22?w=800'],
      ['Whisker Friendly Cafe','Pet-welcoming cafe offering outdoor seating and pup cups.','22 Tail Trail, Riverside','https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800'],
      ['Green Meadow Vet & Wellness','Community vet with weekend adoption events and puppy socials.','300 Meadow Ln, Green Valley','https://images.unsplash.com/photo-1558944351-cf21c5c9c3a2?w=800'],
      ['Happy Trails Hiking Hub','Leashed pet hiking trails with water stations and shade.','800 Summit Rd, Hillside','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800']
    ];

    for (const l of locations) {
      await pool.query('INSERT INTO locations (name, description, address, image_url) VALUES ($1,$2,$3,$4)', l);
    }

    const events = [
      ['Puppy Social Hour','Meet other pet parents for a supervised off-leash social.','2025-10-12 10:00:00',1,'Community',40,18],
      ['Agility Basics Workshop','Intro to agility with certified trainers.','2025-10-15 17:30:00',1,'Training',20,12],
      ['Patio Yappy Hour','Discount drinks and free pup cups on the patio.','2025-10-11 16:00:00',2,'Social',50,27],
      ['Adoption Pop-up','Local rescues host adoptables and Q&A with vets.','2025-10-19 12:00:00',3,'Adoption',60,22],
      ['Leashed Sunset Hike','2-mile beginner-friendly hike. Water provided.','2025-10-13 18:30:00',4,'Outdoors',25,20],
      ['Pet First Aid 101','Hands-on first aid skills for pet emergencies.','2025-10-20 18:00:00',3,'Education',25,9]
    ];

    for (const e of events) {
      await pool.query('INSERT INTO events (title, description, event_date, location_id, category, max_attendees, current_attendees) VALUES ($1,$2,$3,$4,$5,$6,$7)', e);
    }

    console.log('✅ Seed complete.');
  } catch (err) {
    console.error('❌ Seed failed:', err);
  } finally {
    await pool.end();
  }
})();
