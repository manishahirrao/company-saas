import type { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { logger } from '../../config/logger.js';

export interface ValidationError {
  param?: string;
  msg: string;
  location?: 'body' | 'query' | 'params' | 'headers' | 'cookies';
  value?: any;
  nestedErrors?: ValidationError[];
}

export class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: string;
  errors?: ValidationError[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.status = error.status || 'error';

  // Log the error for development
  logger.error(`Error: ${err.message}`);
  logger.error(`Stack: ${err.stack}`);

  // Handle specific error types
  if (err.name === 'CastError') {
    const castError = err as { path: string; value: any };
    const message = `Resource not found. Invalid ${castError.path}: ${castError.value}`;
    error = new CustomError(message, 400);
  } else if (err.name === 'ValidationError') {
    // Handle Mongoose validation errors
    const validationError = err as { errors: Record<string, { message: string }> };
    const messages = Object.values(validationError.errors).map(val => val.message);
    error = new CustomError(`Invalid input data. ${messages.join('. ')}`, 400);
  } else if (err.code === 11000) {
    // Handle duplicate key errors (MongoDB)
    const mongoError = err as { errmsg?: string };
    const value = mongoError.errmsg ? mongoError.errmsg.match(/\(([^)]+)\)/)?.[1] : 'some field';
    const message = `Duplicate field value: ${value}. Please use another value!`;
    error = new CustomError(message, 400);
  } else if (err.name === 'JsonWebTokenError') {
    // Handle JWT errors
    error = new CustomError('Invalid token. Please log in again!', 401);
  } else if (err.name === 'TokenExpiredError') {
    // Handle JWT expired errors
    error = new CustomError('Your token has expired! Please log in again.', 401);
  } else if (isCelebrateError(err)) {
    // Handle celebrate validation errors
    const message = [];
    for (const [segment, joiError] of err.details.entries()) {
      message.push(`${segment}: ${joiError.message}`);
    }
    error = new CustomError(`Validation error: ${message.join('. ')}`, 400);
  } else if (!(err instanceof CustomError)) {
    // Default to 500 server error for unhandled errors
    error = new CustomError('Internal Server Error', 500);
  }

  // Send response based on environment
  if (process.env.NODE_ENV === 'development') {
    res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  } else {
    // Production
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // Programming or other unknown error: don't leak error details
      console.error('ERROR 💥', error);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  }
};
