

# --- Base Stage ---
# Use an official Node.js runtime as a parent image.
# Alpine version is used for a smaller image size.
FROM node:18-alpine AS base

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# --- Dependencies Stage ---
# Install app dependencies using the lock file for reproducibility
FROM base AS dependencies
RUN npm install --frozen-lockfile

# --- Release Stage ---
# Copy the installed node_modules from the dependencies stage and the application code
FROM base AS release
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# The server runs on port 8080
EXPOSE 8080

# The command to run the application (defaults to 'node server.js')
CMD [ "npm", "start" ]
