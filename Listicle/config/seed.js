import pool from './database.js';

const items = [
  {
    slug: 'find-your-niche',
    title: 'Find Your Niche',
    text: 'Brainstorm business ideas by combining your interests with real market gaps.',
    category: 'Market Research',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Avery Chen'
  },
  {
    slug: 'validate-with-interviews',
    title: 'Validate With Interviews',
    text: 'Talk to at least 10 potential customers to understand problems and willingness to pay.',
    category: 'Product Discovery',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Jordan Lee'
  },
  {
    slug: 'build-mvp',
    title: 'Build a Simple MVP',
    text: 'Ship a minimal solution that solves one core problem end-to-end.',
    category: 'Product Development',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Sam Patel'
  },
  {
    slug: 'experiment-with-pricing',
    title: 'Experiment With Pricing',
    text: 'Test different price points and packaging to discover perceived value.',
    category: 'Sales',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Taylor Brooks'
  },
  {
    slug: 'pitch-to-partners',
    title: 'Pitch to Partners',
    text: 'Find strategic partners who benefit when you succeed and co-market with them.',
    category: 'Growth',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Riley Nguyen'
  },
  {
    slug: 'form-a-legal-entity',
    title: 'Form a Legal Entity',
    text: 'Choose between LLC, S-Corp, or C-Corp and register in your state.',
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Morgan Díaz'
  },
  {
    slug: 'open-business-accounts',
    title: 'Open Business Accounts',
    text: 'Separate finances with a dedicated bank account and bookkeeping from day one.',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Casey Brown'
  },
  {
    slug: 'launch-landing-page',
    title: 'Launch a Landing Page',
    text: 'Publish a simple site to capture emails and measure interest before launch.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    submitted_by: 'Jamie Park'
  }
];

async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Clear existing data
    await pool.query('DELETE FROM items');
    
    // Insert new data
    for (const item of items) {
      await pool.query(
        'INSERT INTO items (slug, title, text, category, image, submitted_by) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.slug, item.title, item.text, item.category, item.image, item.submitted_by]
      );
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
