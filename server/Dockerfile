# Use a base image
FROM node:18

# Set the working directory
WORKDIR /server

# Copy app code
COPY package*.json ./
COPY index.js ./
RUN ls -la
RUN npm install
COPY . .

# Expose port and run app
EXPOSE 3200
CMD ["npm", "run", "start"]