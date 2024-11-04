const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Vercel Postgres connection
const SECRET_KEY = 'donottrytoaccessthisweb'; // Store this in an environment variable

// Function to create a new user
async function createUser(username, password) {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Function to authenticate user
async function authenticateUser(username, password) {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    const user = result.rows[0];
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
      });
      return { token };
    }
    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

module.exports = { createUser, authenticateUser };
