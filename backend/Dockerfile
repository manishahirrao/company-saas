# Use Node.js LTS with Alpine for smaller image size
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /usr/src/app/dist ./dist

# Copy non-JavaScript files that might be needed at runtime
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/tsconfig*.json ./

# Expose the port the app runs on
EXPOSE 10000

# Start the application
CMD ["node", "dist/index.js"]
