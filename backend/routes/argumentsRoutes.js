const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/authMiddleware'); // Adjust the import path as necessary
const argumentController = require('../controllers/argumentController');
const { validationResult } = require('express-validator');

const router = express.Router();

// Middleware for validating the argument's content
const validateArgument = [
  body('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Content is required.')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long.'),
  // Add more validation rules here as needed
];

// Post an argument to a specific debate
router.post('/debates/:debateId/arguments', 
  authenticate, 
  validateArgument,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  argumentController.postArgument);

// List all arguments for a specific debate
router.get('/debates/:debateId/arguments', 
  authenticate, // Optional: Remove if public access is allowed
  argumentController.listArgumentsForDebate);

// Export the router
module.exports = router;
