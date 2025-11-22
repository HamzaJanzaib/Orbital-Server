FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app


# Copy package files first for caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the code (node_modules excluded via .dockerignore)
COPY . .

# Build the project
RUN pnpm run build

# Expose port (match the port your app listens on)
EXPOSE 8080

# Run the app
CMD ["pnpm", "start"]