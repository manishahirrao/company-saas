# Use Node.js LTS with Alpine for smaller image size
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --legacy-peer-deps --unsafe-perm

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install runtime dependencies
RUN apk add --no-cache tini

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig*.json ./

# Copy environment variables (if any)
COPY .env* ./

# Create necessary directories
RUN mkdir -p ./logs ./uploads

# Expose the port the app runs on
EXPOSE 5001

# Use tini as init process
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "--enable-source-maps", "dist/index.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/health || exit 1
