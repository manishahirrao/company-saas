import { Pool, type PoolConfig } from 'pg';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: path.join(__dirname, '../../../.env') });

// Database connection configuration
const dbConfig: PoolConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postpilot',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
};

// Create a new pool of connections
const pool = new Pool(dbConfig);

// Test the database connection
export const testConnection = async (): Promise<boolean> => {
  let client;
  try {
    client = await pool.connect();
    console.log('Successfully connected to the database');
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
};

// Function to run a query
export const query = async <T = any>(
  text: string, 
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> => {
  const start = Date.now();
  let client;
  
  try {
    client = await pool.connect();
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query:', { text, error });
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

// Function to get a client from the pool for transactions
export const getClient = async () => {
  const client = await pool.connect();
  
  const query = client.query.bind(client);
  const release = client.release.bind(client);
  
  // Set a timeout of 5 seconds for queries
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
    console.error(`The last executed query on this client was: ${(client as any).lastQuery}`);
  }, 5000);
  
  // Override the release method to clear the timeout and call the original release
  client.release = () => {
    clearTimeout(timeout);
    client.release = release;
    return release();
  };
  
  // Override the query method to track the last query
  client.query = (...args: any[]) => {
    (client as any).lastQuery = args[0];
    return query(...args);
  };
  
  return client;
};

// Export the pool for direct access if needed
export { pool };
