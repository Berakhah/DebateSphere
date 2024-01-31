// routes/voteRoutes.js

const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController'); // Adjust the path as necessary
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

// Submit a vote
router.post('/debates/:debateId/vote', authenticate, voteController.submitVote);

// Update a vote
router.put('/debates/:debateId/vote', authenticate, voteController.updateVote);

// Revoke a vote
router.delete('/debates/:debateId/vote', authenticate, voteController.revokeVote);

module.exports = router;
