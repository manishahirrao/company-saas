import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import { isCelebrateError } from 'celebrate';
import { logger } from '../../config/logger';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  errors?: Array<ValidationError | any>;
  code?: string | number;
  isOperational?: boolean;
  path?: string;
  value?: any;
  errmsg?: string;
  details?: any;
}

// Handle CastError (invalid ID format)
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle duplicate field error
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.detail ? err.detail.match(/\(([^)]+)\)/)[1] : err.message.match(/\(([^)]+)\)/)[1];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle validation errors
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle JWT errors
const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

// Handle JWT expired error
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Custom AppError class
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Send error in development environment
const sendErrorDev = (err: CustomError, req: Request, res: Response) => {
  // API error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // Rendered website error
  logger.error('ERROR 💥', err);
  return res.status(err.statusCode || 500).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

// Send error in production environment
const sendErrorProd = (err: CustomError, req: Request, res: Response) => {
  // API error
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
      });
    }
    
    // Programming or other unknown error: don't leak error details
    // 1) Log error
    logger.error('ERROR 💥', err);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // Rendered website error
  if (err.isOperational) {
    return res.status(err.statusCode || 500).render('error', {
      title: 'Something went wrong!',
      msg: 'Please try again later.',
    });
  }
  
  // Programming or other unknown error: don't leak error details
  // 1) Log error
  logger.error('ERROR 💥', err);
  
  // 2) Send generic message
  return res.status(500).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

// Global error handling middleware
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error
  logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  if (err.stack) {
    logger.error(err.stack);
  }

  // Handle celebrate validation errors
  if (isCelebrateError(err)) {
    const errorDetails: Record<string, any> = {};
    for (const [segment, joiError] of err.details.entries()) {
      errorDetails[segment] = {
        message: joiError.message,
        details: joiError.details.map((d: any) => ({
          message: d.message,
          path: d.path,
          type: d.type,
          context: d.context,
        })),
      };
    }
    
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors: errorDetails,
    });
  }

  // Handle other errors based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.code === '23505') error = handleDuplicateFieldsDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
};

// Async error handling wrapper
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// For backward compatibility
export const notFound = notFoundHandler;
export const asyncHandler = catchAsync;
