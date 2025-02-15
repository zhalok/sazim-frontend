FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json ./

# Install dependencies
RUN yarn install 

# Copy the entire project
COPY . .

# Build the React app
RUN yarn build

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy built files to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
