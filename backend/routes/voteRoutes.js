const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { authenticate } = require('../middleware/authMiddleware');

// Adjusted paths to reflect voting on arguments
router.post('/arguments/:argumentId/vote', authenticate, voteController.submitVote);
router.put('/arguments/:argumentId/vote', authenticate, voteController.updateVote);
router.delete('/arguments/:argumentId/vote', authenticate, voteController.revokeVote);

module.exports = router;
