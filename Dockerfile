# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your server
CMD ["node", "server.js"]
