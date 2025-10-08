const dotenv=require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const pool=new Pool({
  user:process.env.PGUSER,
  password:process.env.PGPASSWORD,
  host:process.env.PGHOST,
  port:process.env.PGPORT,
  database:process.env.PGDATABASE,
  ssl:{rejectUnauthorized:false}
});

(async()=>{
  try{
    await pool.query('TRUNCATE events RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE locations RESTART IDENTITY CASCADE;');

    const locs=[
      ['Paws & Play Dog Park','Off-leash park with water + agility.','101 Bark Blvd','https://images.unsplash.com/photo-1507149833265-60c372daea22?w=800'],
      ['Whisker Friendly Cafe','Patio seating, pup cups.','22 Tail Trail','https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800']
    ];
    for(const l of locs){
      await pool.query('INSERT INTO locations(name,description,address,image_url) VALUES ($1,$2,$3,$4)',l);
    }

    // Include one past event to exercise the "past" styling
    const events=[
      ['Puppy Social Hour','Supervised off-leash social.','2025-10-12 10:00:00',1,'Community',40,18],
      ['Patio Yappy Hour','Discount drinks + pup cups.','2025-10-11 16:00:00',2,'Social',50,27],
      ['Spring Paw Parade (Past)','Community walk that already happened.','2024-03-10 09:00:00',1,'Community',100,78]
    ];
    for(const e of events){
      await pool.query('INSERT INTO events(title,description,event_date,location_id,category,max_attendees,current_attendees) VALUES ($1,$2,$3,$4,$5,$6,$7)',e);
    }

    console.log('seed OK (including one past event)');
  } catch(e){
    console.error('seed failed:',e.message);
    process.exit(1)
  } finally{
    await pool.end()
  }
})();
