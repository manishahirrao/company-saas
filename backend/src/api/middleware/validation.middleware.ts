import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { CustomError } from './error.middleware';

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const error = new CustomError('Validation failed');
    error.statusCode = 400;
    error.errors = errors.array();
    next(error);
  };
};

export const validateBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationError = new CustomError('Validation failed');
      validationError.statusCode = 400;
      validationError.errors = error.details.map((err: any) => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'body',
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
      const validationError = new CustomError('Invalid query parameters');
      validationError.statusCode = 400;
      validationError.errors = error.details.map((err: any) => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'query',
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
      const validationError = new CustomError('Invalid URL parameters');
      validationError.statusCode = 400;
      validationError.errors = error.details.map((err: any) => ({
        param: err.path.join('.'),
        msg: err.message,
        location: 'params',
      }));
      return next(validationError);
    }
    
    next();
  };
};
