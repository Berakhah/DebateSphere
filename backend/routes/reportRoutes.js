const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticate = require('../middleware/authenticate'); // Adjust the path as necessary
const { createReport, validateDebateReport } = require('../controllers/reportController'); // Adjust the path as necessary

router.post('/debate', [
    authenticate,
    body('debateId').isInt().withMessage('Debate ID must be an integer'),
    body('reason').notEmpty().withMessage('Reason for reporting cannot be empty'),
    validateDebateReport
], createReport);

module.exports = router;
