require('dotenv').config(); // Load environment variables from .env

const { Pool } = require('pg');

// Use the Vercel Postgres connection string
const pool = new Pool({
  connectionString: process.env.VERCEL_POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Use SSL since Vercel Postgres requires it
  },
});

module.exports = pool;
