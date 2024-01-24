const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/authMiddleware').authenticate; // Adjust the path as necessary
const commentController = require('../controllers/commentController'); // Adjust the path as necessary

const router = express.Router();

// Route for posting a comment
router.post('/debates/:debateId/comment', authenticate, [
    // Add validation middleware if necessary
], commentController.postComment);

module.exports = router;
