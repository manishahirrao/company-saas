import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { query, getClient } from './config.js';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MigrationRow {
  name: string;
}

// Ensure migrations table exists
const ensureMigrationsTable = async (): Promise<void> => {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(name)
    )
  `);};

// Get all executed migrations
const getExecutedMigrations = async (): Promise<string[]> => {
  const result = await query<MigrationRow>('SELECT name FROM migrations ORDER BY name');
  return result.rows.map((row: MigrationRow) => row.name);
};

// Execute a migration file
const executeMigration = async (migrationName: string, sql: string): Promise<void> => {
  const client = await getClient();
  
  try {
    await client.query('BEGIN');
    
    // Execute the migration SQL
    await client.query(sql);
    
    // Record the migration
    await client.query(
      'INSERT INTO migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
      [migrationName]
    );
    
    await client.query('COMMIT');
    console.log(`✓ Executed migration: ${migrationName}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`✗ Failed to execute migration ${migrationName}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

// Run all pending migrations
export const runMigrations = async (): Promise<void> => {
  try {
    await ensureMigrationsTable();
    const executedMigrations = await getExecutedMigrations();
    
    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    let executedCount = 0;
    
    for (const file of files) {
      if (!executedMigrations.includes(file)) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        
        console.log(`Running migration: ${file}`);
        await executeMigration(file, sql);
        executedCount++;
      }
    }
    
    if (executedCount === 0) {
      console.log('No new migrations to run.');
    } else {
      console.log(`✅ Successfully executed ${executedCount} migration(s).`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migrations if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations().catch(console.error);
}

export default runMigrations;
