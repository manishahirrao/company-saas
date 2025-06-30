import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type SuccessResponse<T> = {
  success: true;
  status: 'success' | 'created' | 'no-content';
  message?: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ErrorResponse = {
  success: false;
  status: 'error' | 'not-found' | 'bad-request' | 'unauthorized' | 'forbidden' | 'conflict' | 'validation-error' | 'internal-server-error';
  message: string;
  error?: any;
  errors?: Array<{
    field: string;
    message: string;
  }>;
};

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

export class ApiResponseHandler {
  /**
   * Send a successful response with data
   */
  static sendSuccess<T>(
    res: Response,
    data: T,
    message: string = 'Operation successful',
    statusCode: number = StatusCodes.OK
  ) {
    const response: SuccessResponse<T> = {
      success: true,
      status: this.getStatusFromCode(statusCode) as 'success' | 'created' | 'no-content',
      message,
      data,
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send a paginated response
   */
  static sendPaginated<T>(
    res: Response,
    data: T[], 
    meta: {
      page: number;
      limit: number;
      total: number;
    },
    message: string = 'Data retrieved successfully'
  ) {
    const totalPages = Math.ceil(meta.total / meta.limit);
    
    const response: SuccessResponse<T[]> = {
      success: true,
      status: 'success',
      message,
      data,
      meta: {
        ...meta,
        totalPages,
      },
    };

    return res.status(StatusCodes.OK).json(response);
  }

  /**
   * Send an error response
   */
  static sendError(
    res: Response,
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    error?: any,
    errors?: Array<{ field: string; message: string }>
  ) {
    const response: ErrorResponse = {
      success: false,
      status: this.getStatusFromCode(statusCode) as any,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
      errors,
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send a validation error response
   */
  static sendValidationError(
    res: Response,
    errors: Array<{ field: string; message: string }>,
    message: string = 'Validation failed'
  ) {
    return this.sendError(
      res,
      message,
      StatusCodes.UNPROCESSABLE_ENTITY,
      undefined,
      errors
    );
  }

  /**
   * Send a not found error response
   */
  static sendNotFound(res: Response, message: string = 'Resource not found') {
    return this.sendError(res, message, StatusCodes.NOT_FOUND);
  }

  /**
   * Send an unauthorized error response
   */
  static sendUnauthorized(res: Response, message: string = 'Unauthorized') {
    return this.sendError(res, message, StatusCodes.UNAUTHORIZED);
  }

  /**
   * Send a forbidden error response
   */
  static sendForbidden(res: Response, message: string = 'Forbidden') {
    return this.sendError(res, message, StatusCodes.FORBIDDEN);
  }

  /**
   * Send a conflict error response
   */
  static sendConflict(res: Response, message: string = 'Conflict') {
    return this.sendError(res, message, StatusCodes.CONFLICT);
  }

  /**
   * Send an internal server error response
   */
  static sendInternalError(
    res: Response,
    message: string = 'Internal server error',
    error?: any
  ) {
    return this.sendError(
      res,
      message,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error
    );
  }

  /**
   * Helper to get status string from status code
   */
  private static getStatusFromCode(statusCode: number): string {
    switch (statusCode) {
      case StatusCodes.CREATED:
        return 'created';
      case StatusCodes.NO_CONTENT:
        return 'no-content';
      case StatusCodes.BAD_REQUEST:
        return 'bad-request';
      case StatusCodes.UNAUTHORIZED:
        return 'unauthorized';
      case StatusCodes.FORBIDDEN:
        return 'forbidden';
      case StatusCodes.NOT_FOUND:
        return 'not-found';
      case StatusCodes.CONFLICT:
        return 'conflict';
      case StatusCodes.UNPROCESSABLE_ENTITY:
        return 'validation-error';
      case StatusCodes.INTERNAL_SERVER_ERROR:
        return 'internal-server-error';
      default:
        return 'success';
    }
  }
}

export default ApiResponseHandler;
