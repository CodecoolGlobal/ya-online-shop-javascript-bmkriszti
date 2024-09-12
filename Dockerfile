
FROM node:16-alpine
WORKDIR /app 
# Use Node.js 16-alpine image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the frontend and backend directories into /app
COPY frontEnd /app/frontEnd
COPY backEnd /app/backEnd

# Set the working directory to the backend folder
WORKDIR /app/backEnd

# Install dependencies (assuming package.json is in the backend folder)
RUN yarn install --production
CMD ["node", "server.js"]
