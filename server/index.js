import express from 'express';
import pg from 'pg';
import cors from 'cors';
import morgan from 'morgan';

const { Pool } = pg;
const app = express();
app.use(morgan(process.env.LOG_FORMAT || 'combined'));
const port = process.env.PORT || 3200;

// PostgreSQL connection config (adjust as needed)
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST || 'db',
    database: process.env.PGDATABASE || 'birdsdb',
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
});

app.use(express.json());
app.use(cors());
// Create table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS birds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  picture TEXT,
  link TEXT
);
`;
pool.query(createTableQuery).catch(console.error);

// CRUD endpoints
// Get all birds
app.get('/birds', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM birds ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single bird
app.get('/birds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM birds WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bird not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new bird
app.post('/birds', async (req, res) => {
    try {
        const { name, description, picture, link } = req.body;
        const result = await pool.query(
            'INSERT INTO birds (name, description, picture, link) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, picture, link]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a bird
app.put('/birds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, picture, link } = req.body;
        const result = await pool.query(
            'UPDATE birds SET name = $1, description = $2, picture = $3, link = $4 WHERE id = $5 RETURNING *',
            [name, description, picture, link, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bird not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a bird
app.delete('/birds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM birds WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bird not found' });
        res.json({ message: 'Bird deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 