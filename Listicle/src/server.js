import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 4000);

// View engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Database helpers
async function getAllItems() {
  const result = await pool.query('SELECT * FROM items ORDER BY created_at ASC');
  return result.rows;
}

async function getItemBySlug(slug) {
  const result = await pool.query('SELECT * FROM items WHERE slug = $1', [slug]);
  return result.rows[0];
}

async function getCategories() {
  const result = await pool.query('SELECT DISTINCT category FROM items ORDER BY category ASC');
  return result.rows.map(row => row.category);
}

// Routes
app.get('/', async (req, res) => {
  try {
    const [items, categories] = await Promise.all([
      getAllItems(),
      getCategories()
    ]);
    res.render('index', { title: 'Guide to Starting Your Business', items, categories });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).render('404', { title: 'Server Error' });
  }
});

app.get('/items/:slug', async (req, res, next) => {
  try {
    const item = await getItemBySlug(req.params.slug);
    if (!item) return next();
    res.render('detail', { title: item.title, item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).render('404', { title: 'Server Error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});


