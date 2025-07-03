import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase URL or Anon Key in environment variables');
  process.exit(1);
}

if (!SUPABASE_DB_URL) {
  console.error('Missing SUPABASE_DB_URL in environment variables');
  console.log('Please add your Supabase database connection string to .env as SUPABASE_DB_URL');
  process.exit(1);
}

try {
  console.log('🚀 Resetting database...');
  
  // Drop and recreate the public schema
  console.log('🔧 Dropping and recreating public schema...');
  execSync(`psql "${SUPABASE_DB_URL}" -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"`, { stdio: 'inherit' });
  
  // Recreate extensions
  console.log('🔧 Recreating extensions...');
  execSync(`psql "${SUPABASE_DB_URL}" -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"`, { stdio: 'inherit' });
  execSync(`psql "${SUPABASE_DB_URL}" -c "CREATE EXTENSION IF NOT EXISTS uuid-ossp;"`, { stdio: 'inherit' });
  
  console.log('✅ Database reset complete!');
  console.log('\nNext steps:');
  console.log('1. Run migrations: npm run db:migrate');
  console.log('2. Generate types: npm run generate:types');
  console.log('3. Start the app: npm run dev');
} catch (error) {
  console.error('❌ Error resetting database:', error);
  process.exit(1);
}
