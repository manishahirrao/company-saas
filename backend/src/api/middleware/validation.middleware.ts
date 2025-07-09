import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, ValidationError as ExpressValidationError } from 'express-validator';
import { CustomError, ValidationError } from './error.middleware.js';

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);
      
      if (errors.isEmpty()) {
        return next();
      }

      const error = new CustomError('Validation failed', 400);
      error.errors = errors.array().map((err: any) => ({
        param: err.param,
        msg: err.msg,
        location: err.location,
        value: err.value,
      }));
      next(error);
    } catch (err) {
      next(err);
    }
  };
};

export const validateBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationError = new CustomError('Validation failed', 400);
      validationError.errors = error.details.map((err: any): ValidationError => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'body',
        value: err.context?.value,
      }));
      return next(validationError);
    }
    
    next();
  };
};

export const validateQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      const validationError = new CustomError('Invalid query parameters', 400);
      validationError.errors = error.details.map((err: any): ValidationError => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'query',
        value: err.context?.value,
      }));
      return next(validationError);
    }
    
    next();
  };
};

export const validateParams = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    
    if (error) {
      const validationError = new CustomError('Invalid URL parameters', 400);
      validationError.errors = error.details.map((err: any): ValidationError => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'params',
        value: err.context?.value,
      }));
      return next(validationError);
    }
    
    next();
  };
};
