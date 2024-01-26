const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/authMiddleware').authenticate;
const commentController = require('../controllers/commentController');

const router = express.Router();

// Route for posting a comment
router.post('/debates/:debateId/comment', authenticate, [
    body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Content is required and must be under 500 characters'),
    body('parentId').optional().isInt().withMessage('Parent ID must be an integer if provided'),
], commentController.postComment);

module.exports = router;
