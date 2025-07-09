import winston, { format } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, errors } = format;

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logDir = path.join(path.dirname(path.dirname(__dirname)), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Define colors for different log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

// Create console transport for development
const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  level: process.env.LOG_LEVEL || 'info',
});

// Create file transport for production
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    format.json()
  ),
});

// Create error file transport
const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    format.json()
  ),
});

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: 'postpilot-api' },
  transports: [
    // Write all logs with level `error` and below to `error.log`
    errorFileTransport,
    // Write all logs with level `info` and below to `combined.log`
    fileTransport,
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport);
}

// Create a stream object with a 'write' function that will be used by `morgan`
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, stream };

export default logger;
