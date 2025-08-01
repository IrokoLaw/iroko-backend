# Use the official Node.js image as the base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Install bash and pnpm
RUN apk add --no-cache bash curl && \
    npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install the dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Make the wait-for-it script executable


ENV NODE_ENV=production

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"]