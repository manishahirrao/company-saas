import 'module-alias/register.js';
import 'reflect-metadata';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import App from './app.js';
import { logger } from './config/logger.js';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '../../.env');
config({ path: envPath });

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Create and start the server
const app = new App();
app.listen();

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(error.name, error.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: unknown) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  
  if (error instanceof Error) {
    logger.error(error.name, error.message);
  } else {
    logger.error('Unhandled rejection with non-Error value:', error);
  }
  
  // Close server & exit process
  process.exit(1);
});

// Handle SIGTERM signal for graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  process.exit(0);
});

// Handle SIGINT signal (Ctrl+C)
process.on('SIGINT', () => {
  logger.info('👋 SIGINT RECEIVED. Shutting down gracefully');
  process.exit(0);
});

// Handle process exit
process.on('exit', (code) => {
  logger.info(`Process exited with code ${code}`);
});

// Export the Express API for serverless environments
export default app;
