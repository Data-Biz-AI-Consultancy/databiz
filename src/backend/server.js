const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/databiz'
});

// Retry logic to wait for PostgreSQL to boot up
async function initDb() {
  let retries = 5;
  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to PostgreSQL successfully.');
      break;
    } catch (err) {
      console.warn(`PostgreSQL connection failed. Retrying... (${retries} left)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  if (retries === 0) {
    console.error('Failed to connect to PostgreSQL. Exiting...');
    process.exit(1);
  }

  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      visitor_id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      persona VARCHAR(255),
      business TEXT,
      problems TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL PRIMARY KEY,
      visitor_id VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database tables initialized.');
}

// Get memory/history for a visitor
app.get('/api/history', async (req, res) => {
  const { visitor_id } = req.query;
  if (!visitor_id) {
    return res.status(400).json({ error: 'visitor_id query parameter is required' });
  }

  try {
    // 1. Get lead info
    const leadResult = await pool.query('SELECT name, persona, business, problems FROM leads WHERE visitor_id = $1', [visitor_id]);
    
    // 2. Get last 15 messages
    const messagesResult = await pool.query(
      'SELECT role, content FROM interactions WHERE visitor_id = $1 ORDER BY created_at ASC LIMIT 15',
      [visitor_id]
    );

    res.json({
      lead: leadResult.rows[0] || null,
      messages: messagesResult.rows
    });
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Database error fetching visitor history' });
  }
});

// Store interaction (chat message)
app.post('/api/interactions', async (req, res) => {
  const { visitor_id, role, content } = req.body;
  if (!visitor_id || !role || !content) {
    return res.status(400).json({ error: 'visitor_id, role, and content are required' });
  }

  try {
    await pool.query(
      'INSERT INTO interactions (visitor_id, role, content) VALUES ($1, $2, $3)',
      [visitor_id, role, content]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error logging interaction:', err);
    res.status(500).json({ error: 'Database error saving interaction' });
  }
});

// Store or update lead details
app.post('/api/leads', async (req, res) => {
  const { visitor_id, name, persona, business, problems } = req.body;
  if (!visitor_id) {
    return res.status(400).json({ error: 'visitor_id is required' });
  }

  try {
    const upsertQuery = `
      INSERT INTO leads (visitor_id, name, persona, business, problems, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (visitor_id)
      DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, leads.name),
        persona = COALESCE(EXCLUDED.persona, leads.persona),
        business = COALESCE(EXCLUDED.business, leads.business),
        problems = COALESCE(EXCLUDED.problems, leads.problems),
        updated_at = CURRENT_TIMESTAMP;
    `;
    await pool.query(upsertQuery, [visitor_id, name || null, persona || null, business || null, problems || null]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error upserting lead info:', err);
    res.status(500).json({ error: 'Database error saving lead details' });
  }
});

if (require.main === module) {
  initDb().then(() => {
    app.listen(port, () => {
      console.log(`Backend server listening on port ${port}`);
    });
  });
}

module.exports = { app, pool, initDb };
