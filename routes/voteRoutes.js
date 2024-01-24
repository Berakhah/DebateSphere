// routes/voteRoutes.js
const express = require('express');
const { submitVote } = require('../controllers/voteController'); // Adjust the path if needed
const { authenticate } = require('../middleware/authMiddleware'); // Adjust the path if needed

const router = express.Router();

router.post('/debates/:debateId/vote', authenticate, submitVote);

module.exports = router;
