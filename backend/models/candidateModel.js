const pool = require('../config/db');

async function getCandidates(limit, offset) {
  try {
    const result = await pool.query(
      'SELECT * FROM candidates ORDER BY assessment_date LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

const addCandidate = async (name, status) => {
  await pool.query(
    'INSERT INTO candidates (name, status) VALUES ($1, $2)',
    [name, status]
  );
};


// Function to update candidate status
async function updateCandidateStatus(id, status) {
    try {
      const result = await pool.query(
        'UPDATE candidates SET status = $1 WHERE id = $2',
        [status, id]
      );
      return result.rowCount > 0; // Returns true if a row was updated
    } catch (error) {
      console.error('Error updating candidate status:', error);
      return false;
    }
  }
module.exports = { getCandidates, addCandidate, updateCandidateStatus };
