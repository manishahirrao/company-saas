declare module 'xss-clean' {
  import { RequestHandler } from 'express';
  
  interface XssCleanOptions {
    /** List of allowed HTML tags (default: []) */
    allowedTags?: string[];
    /** List of allowed HTML attributes (default: []) */
    allowedAttributes?: Record<string, string[]>;
    /** List of allowed CSS classes (default: []) */
    allowedClasses?: Record<string, string[]>;
    /** List of allowed URI schemes (default: ['http', 'https', 'ftp']) */
    allowedSchemes?: string[];
    /** Allow data URIs (default: false) */
    allowDataAttributes?: boolean;
    /** Strip HTML comments (default: true) */
    stripIgnoreTag?: boolean;
    /** Strip tag body (default: false) */
    stripIgnoreTagBody?: boolean | string[];
    /** Strip whitespace (default: true) */
    stripBlankText?: boolean;
    /** Trim whitespace (default: true) */
    trim?: boolean;
    /** Enable XSS filtering (default: true) */
    xssFilter?: boolean;
  }

  /**
   * Middleware to sanitize user input coming from POST, GET, and URL parameters
   */
  function xssClean(options?: XssCleanOptions): RequestHandler;

  export = xssClean;
}
