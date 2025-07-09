// Type definitions for express-rate-limit
// This is a minimal type definition to resolve the TypeScript error
declare module 'express-rate-limit' {
  import { RequestHandler } from 'express';

  interface Options {
    windowMs?: number;
    max?: number | ((req: any) => number) | ((req: any) => Promise<number>);
    message?: any;
    statusCode?: number;
    headers?: boolean;
    skipFailedRequests?: boolean;
    skipSuccessfulRequests?: boolean;
    keyGenerator?: (req: any) => string;
    skip?: (req: any, res: any) => boolean;
    handler?: (req: any, res: any, next: any) => any;
    onLimitReached?: (req: any, res: any, options: any) => void;
    store?: any;
  }

  function rateLimit(options?: Options): RequestHandler;

  export = rateLimit;
}
