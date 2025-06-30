import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from './logger';
import path from 'path';
import fs from 'fs';
import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

const execAsync = promisify(exec);

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postpilot',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

// Create migrations table if it doesn't exist
async function ensureMigrationsTable() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        run_on TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
  } catch (error) {
    logger.error('Error ensuring migrations table:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Get already run migrations
async function getRunMigrations(): Promise<string[]> {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query<{ name: string }>('SELECT name FROM migrations ORDER BY run_on');
    return result.rows.map(row => row.name);
  } catch (error) {
    logger.error('Error getting run migrations:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run a single migration
async function runMigration(migrationName: string, migrationPath: string) {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    await client.query('BEGIN');
    
    // Read and execute the migration SQL
    const sql = fs.readFileSync(migrationPath, 'utf8');
    await client.query(sql);
    
    // Record the migration
    await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
    await client.query('COMMIT');
    
    logger.info(`✅ Applied migration: ${migrationName}`);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`❌ Failed to apply migration ${migrationName}:`, error);
    throw error;
  } finally {
    await client.end();
  }
}

// Main function to run migrations
async function runMigrations() {
  try {
    logger.info('🚀 Starting database migrations...');
    
    // Ensure migrations table exists
    await ensureMigrationsTable();
    
    // Get already run migrations
    const runMigrations = await getRunMigrations();
    logger.info(`Found ${runMigrations.length} previously run migrations`);
    
    // Get all migration files
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    // Filter out already run migrations
    const pendingMigrations = migrationFiles.filter(file => !runMigrations.includes(file));
    
    if (pendingMigrations.length === 0) {
      logger.info('✅ No new migrations to run');
      return;
    }
    
    logger.info(`Found ${pendingMigrations.length} new migrations to apply`);
    
    // Run each pending migration
    for (const migrationFile of pendingMigrations) {
      const migrationPath = path.join(migrationsDir, migrationFile);
      logger.info(`Applying migration: ${migrationFile}`);
      await runMigration(migrationFile, migrationPath);
    }
    
    logger.info('🎉 All migrations completed successfully!');
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migrations
runMigrations();
