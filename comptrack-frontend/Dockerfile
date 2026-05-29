# ==========================================
# STEP 1: Builder Stage for React Frontend
# ==========================================
# Use Node.js 20 on Alpine Linux as the build platform
FROM node:20-alpine AS builder

# Set workspace directory for the frontend application
WORKDIR /app

# Copy dependency definition files first to optimize Docker layer caching
COPY package*.json ./

# Install exact versions of dependencies from package-lock.json
RUN npm install

# Copy the rest of the project files to the build context
COPY . .

# Build the React application for production.
# This outputs compiled and minified assets into the /app/build directory.
RUN npm run build

# ==========================================
# STEP 2: Nginx Serve Stage
# ==========================================
# Use official Nginx stable Alpine image for serving static pages
FROM nginx:stable-alpine

# Copy built static assets from the builder stage to Nginx default public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose standard Web HTTP port 80
EXPOSE 80

# Run Nginx in the foreground to keep the container running
CMD ["nginx", "-g", "daemon off;"]
