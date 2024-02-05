const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/authMiddleware').authenticate;
const commentController = require('../controllers/commentController');

const router = express.Router();

// Route for posting a comment
router.post('/debates/:debateId/comments', authenticate, [
    body('content').trim().isLength({ min: 1 }).withMessage('Comment content cannot be empty'),

], (req, res) => {
    // Handle the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Call the controller method
    commentController.postComment(req, res);
});

module.exports = router;
