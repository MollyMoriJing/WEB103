import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import { items } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3002);

// View engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Helpers
function findItemBySlug(slug) {
  return items.find((i) => i.slug === slug);
}

// Routes
app.get('/', (req, res) => {
  const categories = Array.from(new Set(items.map(i => i.category))).sort();
  res.render('index', { title: 'Guide to Starting Your Business', items, categories });
});

app.get('/items/:slug', (req, res, next) => {
  const item = findItemBySlug(req.params.slug);
  if (!item) return next();
  res.render('detail', { title: item.title, item });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});


