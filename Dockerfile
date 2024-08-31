# Dockerfile

# Use an official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the Docker container
WORKDIR /app

# Copy the .env file to the root of the Docker image
COPY .env .env

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
