// middleware/validateRequests.js
const { check, validationResult } = require('express-validator');

const validateDebateCreation = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  // Include more fields as necessary
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateDebateCreation };
