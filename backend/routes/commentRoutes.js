const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticate = require('../middleware/authMiddleware').authenticate;
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/debates/:debateId/comments', 
// authenticate,
 [
    body('content').trim().isLength({ min: 1 }).withMessage('Comment content cannot be empty'),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    commentController.postComment(req, res);
});

module.exports = router;
