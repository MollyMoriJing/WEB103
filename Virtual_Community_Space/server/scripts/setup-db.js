#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Virtual Community Space Database...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create a .env file in the server directory with your database credentials.');
  console.log('📋 Use env.example as a template.\n');
  process.exit(1);
}

// Check if .env has required variables
const envContent = fs.readFileSync(envPath, 'utf8');
const requiredVars = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGPORT', 'PGDATABASE'];
const missingVars = requiredVars.filter(varName => !envContent.includes(varName));

if (missingVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\n📝 Please update your .env file with all required database credentials.\n');
  process.exit(1);
}

try {
  console.log('🔄 Running database reset script...');
  execSync('node config/reset.js', { 
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit' 
  });
  
  console.log('\n✅ Database setup completed successfully!');
  console.log('🎉 You can now start the application with: npm run dev\n');
  
} catch (error) {
  console.log('\n❌ Database setup failed!');
  console.log('🔍 Please check your database connection settings in the .env file.');
  console.log('📖 Make sure your PostgreSQL database is running and accessible.\n');
  process.exit(1);
}
