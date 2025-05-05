# Use a base image
FROM node:18

# Set the working directory
WORKDIR /

# Copy app code
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html/ ./
COPY public/ ./public/
COPY src/ ./src/
RUN npm install
RUN npm install -g serve
RUN npm run build
# COPY . .

# Expose port and run app
EXPOSE 5173
CMD ["npm", "run", "serve"]