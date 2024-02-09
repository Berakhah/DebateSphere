const express = require('express');
const { body } = require('express-validator');
const { authenticate } = require('../middleware/authMiddleware');
const argumentController = require('../controllers/argumentController');
const { validationResult } = require('express-validator');

const router = express.Router();


const validateArgument = [
  body('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Content is required.')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long.'),

];

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


router.get('/debates/:debateId/arguments', 
  authenticate, 
  argumentController.listArgumentsForDebate);


module.exports = router;
