const dotenv=require('dotenv');const{Pool}=require('pg');dotenv.config();
const pool=new Pool({user:process.env.PGUSER,password:process.env.PGPASSWORD,host:process.env.PGHOST,port:process.env.PGPORT,database:process.env.PGDATABASE,ssl:{rejectUnauthorized:false}});
(async()=>{try{
  await pool.query(`CREATE TABLE IF NOT EXISTS locations(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(500),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  await pool.query(`CREATE TABLE IF NOT EXISTS events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    category VARCHAR(100),
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  console.log('tables OK');
}catch(e){console.error('create tables failed:',e.message);process.exit(1)}finally{await pool.end()}})();
