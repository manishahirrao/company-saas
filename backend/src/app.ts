import express, { Application, Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseServiceKey, initializeDatabase } from './config/database.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger, stream } from './config/logger.js';

// Import available routes
import authRouter from './api/routes/auth.routes.js';
import testRouter from './api/routes/test.routes.js';
import paymentRouter from './api/routes/payment.routes.js';
import { healthRouter } from './api/health.js';
import { errorHandler, notFoundHandler } from './api/middleware/error.middleware.js';

// Type for HPP options
interface HppOptions {
  checkBody?: boolean;
  checkBodyOnlyForContentType?: string[];
  checkQuery?: boolean;
  checkParams?: boolean;
  whitelist?: string | string[];
}

declare module 'express-serve-static-core' {
  interface Request {
    requestTime?: string;
  }
}

// Security middleware initialization
const securityMiddleware = {
  mongoSanitize: (req: Request, _res: Response, next: NextFunction) => {
    // Basic NoSQL injection protection
    const clean = (obj: any): any => {
      if (!obj) return obj;
      
      if (Array.isArray(obj)) {
        return obj.map(clean);
      } else if (typeof obj === 'object') {
        const sanitized: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
          // Skip prototype pollution
          if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
          }
          // Recursively clean nested objects
          sanitized[key] = clean(value);
        }
        return sanitized;
      }
      return obj;
    };

    // Clean request body, query, and params
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    
    next();
  },
  
  xssClean: (req: Request, _res: Response, next: NextFunction) => {
    // Basic XSS protection
    const escape = (str: any): string => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    };

    // Escape request body, query, and params
    const escapeObject = (obj: any): any => {
      if (!obj) return obj;
      
      if (Array.isArray(obj)) {
        return obj.map(escapeObject);
      } else if (typeof obj === 'object') {
        const escaped: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
          escaped[key] = escapeObject(value);
        }
        return escaped;
      } else if (typeof obj === 'string') {
        return escape(obj);
      }
      return obj;
    };

    if (req.body) req.body = escapeObject(req.body);
    if (req.query) req.query = escapeObject(req.query);
    if (req.params) req.params = escapeObject(req.params);
    
    next();
  },
  
  hpp: (options: HppOptions = {}) => {
    const whitelist = new Set(
      Array.isArray(options.whitelist) 
        ? options.whitelist 
        : options.whitelist 
          ? [options.whitelist] 
          : []
    );
    
    return (req: Request, _res: Response, next: NextFunction) => {
      // Skip if no query parameters
      if (!req.query || Object.keys(req.query).length === 0) {
        return next();
      }
      
      // Process query parameters
      const query: Record<string, any> = {};
      
      for (const [key, value] of Object.entries(req.query)) {
        if (whitelist.has(key)) {
          // Keep all values for whitelisted parameters
          query[key] = value;
        } else if (Array.isArray(value)) {
          // For arrays, take the last value
          query[key] = value[value.length - 1];
        } else {
          // For single values, keep as is
          query[key] = value;
        }
      }
      
      req.query = query;
      next();
    };
  }
};

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(path.dirname(path.dirname(__dirname)), '.env');
config({ path: envPath });

class App {
  public app: Application;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5001;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await initializeDatabase();
      logger.info('Database connected and migrations run successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Database connection error: ${errorMessage}`);
      process.exit(1);
    }
  }

  private initializeMiddlewares() {
    // Enable CORS
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Set security HTTP headers
    this.app.use(helmet());

    // Development logging
    if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
    } else {
      this.app.use(morgan('combined', { stream }));
    }

    // Body parser, reading data from body into req.body
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    // Cookie parser
    this.app.use(cookieParser());

    // Data sanitization against NoSQL query injection and XSS
    this.app.use(securityMiddleware.mongoSanitize);
    this.app.use(securityMiddleware.xssClean);
    
    // Prevent parameter pollution
    this.app.use(
      securityMiddleware.hpp({
        whitelist: [
          'duration',
          'ratingsQuantity',
          'ratingsAverage',
          'maxGroupSize',
          'difficulty',
          'price',
        ],
      })
    );

    // Compression
    this.app.use(compression());

    // Test middleware
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      // Add request time to the request object
      req.requestTime = new Date().toISOString();
      next();
    });

    // Limit requests from same API
    const limiter = rateLimit({
      max: process.env.RATE_LIMIT_MAX_REQUESTS ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) : 100,
      windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) : 15 * 60 * 1000, // 15 minutes
      message: 'Too many requests from this IP, please try again in an hour!'
    });
    this.app.use('/api', limiter);
  }

  private initializeRoutes() {
    // Health check endpoint (mounted at the root)
    this.app.use('', healthRouter);
    
    // API routes
    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/payments', paymentRouter);

    // Test routes (only in development)
    if (this.env === 'development') {
      this.app.use('/api/v1/test', testRouter);
      logger.info('Test routes enabled at /api/v1/test');
    }

    // 404 handler
    this.app.all('*', (req: Request, res: Response) => {
      res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public listen(): void {
    const server = this.app.listen(this.port, () => {
      logger.info(`Server running in ${this.env} mode on port ${this.port}`);
      logger.info(`API Documentation available at http://localhost:${this.port}/api-docs`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
      if (reason instanceof Error) {
        logger.error(`${reason.name}: ${reason.message}`);
        logger.error(reason.stack);
      } else {
        logger.error('Unhandled rejection with non-Error value:', reason);
      }
      
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
      logger.error(`${error.name}: ${error.message}`);
      logger.error(error.stack);
      
      // Attempt a graceful shutdown
      server.close(() => {
        process.exit(1);
      });
      
      // Force exit after timeout if needed
      setTimeout(() => {
        logger.error('Forcing shutdown due to uncaught exception...');
        process.exit(1);
      }, 1000).unref();
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        logger.info('💥 Process terminated by SIGTERM');
        process.exit(0);
      });
      
      // Force exit after timeout if needed
      setTimeout(() => {
        logger.error('Forcing shutdown after SIGTERM...');
        process.exit(0);
      }, 30000).unref();
    });
    
    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
      logger.info('👋 SIGINT RECEIVED. Shutting down gracefully');
      server.close(() => {
        logger.info('💥 Process terminated by SIGINT');
        process.exit(0);
      });
      
      // Force exit after timeout if needed
      setTimeout(() => {
        logger.error('Forcing shutdown after SIGINT...');
        process.exit(0);
      }, 10000).unref();
    });
  }
}

// Export the Express app instance
export const app = new App().app;

export default App;
