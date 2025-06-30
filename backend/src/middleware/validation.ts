import { validationResult, ValidationChain, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

interface ValidationErrorResponse {
  success: boolean;
  errors: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);
      
      if (errors.isEmpty()) {
        return next();
      }

      const errorResponse: ValidationErrorResponse = {
        success: false,
        errors: errors.array().map((err: ValidationError) => ({
          field: err.param,
          message: err.msg,
          value: err.value
        }))
      };

      return res.status(400).json(errorResponse);
    } catch (error) {
      console.error('Validation middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during validation'
      });
    }
  };
};

export const validateWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    
    if (!signature) {
      return res.status(401).json({ 
        success: false,
        error: 'Missing signature header' 
      });
    }

    const crypto = require('crypto');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not set');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== expectedSignature) {
      console.warn('Invalid webhook signature received');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid signature' 
      });
    }

    return next();
  } catch (error) {
    console.error('Webhook signature validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error validating webhook signature'
    });
  }
};
