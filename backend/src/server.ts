import 'module-alias/register.js';
import 'reflect-metadata';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { app } from './app.js';
import { logger } from './config/logger.js';
import { initializeDatabase } from './config/database.js';

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
config({ path: envPath });

// Set default port
const PORT = process.env.PORT || 5001;

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
];

// Only validate non-test environments
if (process.env.NODE_ENV !== 'test') {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      logger.error(`Missing required environment variable: ${envVar}`);
      process.exit(1);
    }
  }
}

// Create HTTP server
const server = http.createServer(app);

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    const dbInit = await initializeDatabase();
    if (!dbInit.success) {
      logger.warn('Database initialization had issues, but continuing...');
    }

    // Start listening
    server.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}${process.env.API_DOCS_PATH || '/api-docs'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(error.name, error.message, error.stack);
  
  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
  
  // Force shutdown if server.close takes too long
  setTimeout(() => {
    process.exit(1);
  }, 1000).unref();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: unknown) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  
  if (error instanceof Error) {
    logger.error(error.name, error.message, error.stack);
  } else {
    logger.error('Unhandled rejection with non-Error value:', error);
  }
  
  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
    process.exit(0);
  });
});

// Start the server
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});

export { server };

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
