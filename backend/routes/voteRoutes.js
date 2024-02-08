const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { authenticate } = require('../middleware/authMiddleware');


router.post('/debates/:debateId/arguments/:argumentId/vote', 
authenticate, 
voteController.submitVote);
router.put('/debates/:debateId/arguments/:argumentId/vote', 
authenticate, 
voteController.updateVote);
router.delete('/debates/:debateId/arguments/:argumentId/vote', 
authenticate,
 voteController.revokeVote);

module.exports = router;
