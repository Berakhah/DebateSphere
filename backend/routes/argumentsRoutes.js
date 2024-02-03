const express = require('express');
const router = express.Router();
const { validateArgumentSubmission, validateResult } = require('../middleware/validateRequests'); 
const authenticate = require('../middleware/authMiddleware'); 
const argumentController = require('../controllers/argumentController'); 

// Post an argument
router.post('/debate/:debateId/argument', authenticate, validateArgumentSubmission, validateResult, crgumentController.postArgument);

// List arguments for a debate
router.get('/debate/:debateId/arguments', authenticate, argumentController.listArgumentsForDebate);

module.exports = router;
