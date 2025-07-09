# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Set environment to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies with a clean slate
RUN npm config set update-notifier false && \
    npm config set fund false && \
    npm config set audit false && \
    npm install -g npm@latest && \
    npm install --legacy-peer-deps --unsafe-perm --prefer-offline

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install runtime dependencies
RUN apk add --no-cache tini curl

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm config set update-notifier false && \
    npm config set fund false && \
    npm config set audit false && \
    npm ci --only=production --legacy-peer-deps --prefer-offline

# Copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig*.json ./

# Copy environment files (if any)
COPY .env* ./

# Create necessary directories
RUN mkdir -p ./logs ./uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Expose the port the app runs on
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=5s \
            --retries=3 \
            CMD curl -f http://localhost:5001/health || exit 1

# Use tini as init process
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "--enable-source-maps", "dist/index.js"]
