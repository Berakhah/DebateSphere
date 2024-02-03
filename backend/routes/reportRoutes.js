const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticate = require('../middleware/authenticate'); // Adjust the path as necessary
const { createReport, validateDebateReport, fetchAllReports } = require('../controllers/reportController'); // Adjust the path as necessary

router.post('/debate', [
    authenticate,
    body('debateId').isInt().withMessage('Debate ID must be an integer'),
    body('reason').notEmpty().withMessage('Reason for reporting cannot be empty'),
    body('issueType').isIn(['Harassment', 'Spam', 'Inappropriate Content', 'Other']).withMessage('Invalid issue type'),
    validateDebateReport
], createReport);

router.get('/reports', authenticate, fetchAllReports);

module.exports = router;
