const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../middleware/authMiddleware'); 
const { createReport, fetchAllReports } = require('../controllers/reportController'); 

const router = express.Router();


const validateReportSubmission = [
    body('type')
        .isIn(['Debate', 'Comment', 'Argument'])
        .withMessage('Invalid report type specified.'),
    body('targetId')
        .isInt({ min: 1 })
        .withMessage('Target ID must be a positive integer.'),
    body('reason')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Reason for reporting cannot be empty.'),
    body('issueType')
        .isIn(['Harassment', 'Spam', 'Inappropriate Content', 'Other'])
        .withMessage('Invalid issue type specified.'),
];


router.post(
    '/',
    authenticate,
    validateReportSubmission,
    createReport
);

router.get(
    '/',
    authenticate,
    fetchAllReports
);

module.exports = router;
