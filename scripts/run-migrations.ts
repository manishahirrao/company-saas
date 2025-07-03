import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MIGRATIONS_DIR = path.resolve(__dirname, '../backend/src/database/migrations');
const DB_URL = process.env.SUPABASE_DB_URL;

if (!DB_URL) {
  console.error('Missing SUPABASE_DB_URL in environment variables');
  process.exit(1);
}

async function runMigrations() {
  const client = new Client({
    connectionString: DB_URL,
  });

  try {
    await client.connect();
    
    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        run_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Get all migration files
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (migrationFiles.length === 0) {
      console.log('No migration files found in', MIGRATIONS_DIR);
      return;
    }

    console.log(`Found ${migrationFiles.length} migration(s)`);

    // Get already run migrations
    const { rows: completedMigrations } = await client.query<{ name: string }>(
      'SELECT name FROM _migrations ORDER BY name'
    );
    
    const completedMigrationNames = new Set(completedMigrations.map(m => m.name));
    let newMigrations = 0;

    // Run new migrations
    for (const file of migrationFiles) {
      if (!completedMigrationNames.has(file)) {
        console.log(`🚀 Running migration: ${file}`);
        
        const migrationSQL = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
        
        // Run migration in a transaction
        await client.query('BEGIN');
        try {
          await client.query(migrationSQL);
          await client.query('INSERT INTO _migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
          console.log(`✅ Applied migration: ${file}`);
          newMigrations++;
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(`❌ Failed to apply migration ${file}:`, error);
          throw error;
        }
      }
    }

    if (newMigrations === 0) {
      console.log('✅ Database is up to date');
    } else {
      console.log(`\n✅ Successfully applied ${newMigrations} migration(s)`);
    }
  } catch (error) {
    console.error('❌ Error running migrations:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
