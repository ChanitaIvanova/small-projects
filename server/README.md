# Bird Backend API

A simple Node.js + Express backend with PostgreSQL for CRUD operations on birds.

## Features
- Create, read, update, and delete birds
- Each bird has a name, description, picture, and link

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure PostgreSQL:**
   - Create a PostgreSQL database (default: `birdsdb`).
   - Set environment variables for DB connection (see below).

3. **Environment Variables:**
   Create a `.env` file in the `server` folder with:
   ```env
   PGUSER=your_pg_user
   PGHOST=localhost
   PGDATABASE=birdsdb
   PGPASSWORD=your_pg_password
   PGPORT=5432
   PORT=3000
   ```

4. **Run the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

## API Endpoints

- `GET    /birds`         — List all birds
- `GET    /birds/:id`     — Get a single bird
- `POST   /birds`         — Create a new bird
- `PUT    /birds/:id`     — Update a bird
- `DELETE /birds/:id`     — Delete a bird

## Example Bird Object
```json
{
  "name": "Sparrow",
  "description": "A small, plump bird.",
  "picture": "https://example.com/sparrow.jpg",
  "link": "https://en.wikipedia.org/wiki/Sparrow"
}
``` 