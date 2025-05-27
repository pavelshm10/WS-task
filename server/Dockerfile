# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the NestJS app (compiles TypeScript to JavaScript)
RUN npm run build

# Expose the port your app runs on (default 3000)
EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/main"]
