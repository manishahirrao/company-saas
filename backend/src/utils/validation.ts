import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponseHandler } from './apiResponse.js';

/**
 * Validation middleware that uses Joi schemas
 * @param schema Joi validation schema
 * @param property The property of the request object to validate (body, query, params)
 */
export const validateRequest = (
  schema: Joi.ObjectSchema,
  property: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      return ApiResponseHandler.sendValidationError(res, errors);
    }

    // Replace the request body with the validated and sanitized data
    if (property === 'body') {
      req.body = schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      }).value;
    }

    next();
  };
};

// Common validation schemas
export const commonValidators = {
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      'string.min': 'Password must be at least 8 characters long',
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
  objectId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .message('Invalid ID format'),
  uuid: Joi.string().uuid({ version: 'uuidv4' }).messages({
    'string.guid': 'Invalid UUID format',
  }),
  pagination: {
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().pattern(/^[a-zA-Z0-9_]+:(asc|desc)$/),
  },
};

/**
 * Validate file upload
 */
export const validateFileUpload = (options: {
  allowedMimeTypes?: string[];
  maxSize?: number; // in bytes
  isRequired?: boolean;
} = {}) => {
  const { allowedMimeTypes, maxSize = 5 * 1024 * 1024, isRequired = false } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file && isRequired) {
      return ApiResponseHandler.sendError(
        res,
        'File is required',
        400
      );
    }

    if (req.file) {
      // Check file size
      if (req.file.size > maxSize) {
        return ApiResponseHandler.sendError(
          res,
          `File size exceeds the maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
          400
        );
      }

      // Check MIME type
      if (allowedMimeTypes && !allowedMimeTypes.includes(req.file.mimetype)) {
        return ApiResponseHandler.sendError(
          res,
          `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
          400
        );
      }
    }

    next();
  };
};

/**
 * Validate array of files
 */
export const validateFilesUpload = (options: {
  allowedMimeTypes?: string[];
  maxSize?: number; // in bytes
  maxCount?: number;
  isRequired?: boolean;
} = {}) => {
  const {
    allowedMimeTypes,
    maxSize = 5 * 1024 * 1024,
    maxCount = 10,
    isRequired = false,
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    let files: Express.Multer.File[] = [];
    
    if (req.files) {
      if (Array.isArray(req.files)) {
        files = req.files;
      } else {
        // Convert files object to array
        files = Object.values(req.files).flat();
      }
    }

    if (files.length === 0 && isRequired) {
      return ApiResponseHandler.sendError(
        res,
        'At least one file is required',
        400
      );
    }

    if (files && files.length > maxCount) {
      return ApiResponseHandler.sendError(
        res,
        `Maximum ${maxCount} files are allowed`,
        400
      );
    }

    if (files) {
      for (const file of files) {
        // Check file size
        if (file.size > maxSize) {
          return ApiResponseHandler.sendError(
            res,
            `File ${file.originalname} exceeds the maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
            400
          );
        }

        // Check MIME type
        if (allowedMimeTypes && !allowedMimeTypes.includes(file.mimetype)) {
          return ApiResponseHandler.sendError(
            res,
            `Invalid file type for ${file.originalname}. Allowed types: ${allowedMimeTypes.join(', ')}`,
            400
          );
        }
      }
    }

    next();
  };
};

export default {
  validateRequest,
  commonValidators,
  validateFileUpload,
  validateFilesUpload,
};
