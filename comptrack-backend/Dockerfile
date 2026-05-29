# ==========================================
# STEP 1: Builder Stage
# ==========================================
# Use lightweight node:20-alpine as the base image for building
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definition files first for optimal caching
COPY package*.json ./

# Install only production dependencies using npm install for deterministic, fast builds
RUN npm install --only=production

# Copy the rest of the application source files
COPY . .

# ==========================================
# STEP 2: Final Production Stage
# ==========================================
# Use a fresh node:20-alpine stage to keep image sizes minimal
FROM node:20-alpine

# Set non-root environment or standard system path
WORKDIR /app

# Copy production node_modules and source files from the builder stage
COPY --from=builder /app /app

# Expose port 5000 as configured in our server.js
EXPOSE 5000

# Set environment variable defaults
ENV NODE_ENV=production

# Command to run the application using the entry point script
CMD ["node", "server.js"]
