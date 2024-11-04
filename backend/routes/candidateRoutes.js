const express = require('express');
const router = express.Router();
const { getCandidates, addCandidate, updateCandidateStatus } = require('../models/candidateModel');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes with authMiddleware
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query; // Default values
//     const offset = (page - 1) * limit;

//     const candidates = await getCandidates(limit, offset);
//     res.json(candidates);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch candidates' });
//   }
// });
// Route to get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await getCandidates();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Route to add a new candidate
router.post('/', async (req, res) => {
  try {
    const { name, status } = req.body;
    await addCandidate(name, status);
    res.status(201).send('Candidate added');
  } catch (error) {
    res.status(500).json({ error: 'Failed to add candidate' });
  }
});

// Route to update a candidate's status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Call the model function to update status
    const success = await updateCandidateStatus(id, status);
    if (success) {
      res.status(200).send('Candidate status updated');
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update candidate status' });
  }
});

module.exports = router;
