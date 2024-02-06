// Inside reportRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware'); 
const reportController = require('../controllers/reportController'); 
const { validateReportSubmission } = require('../middleware/validateRequests'); 

const router = express.Router();

router.post(
    '/',
    [authenticate, ...validateReportSubmission],
    reportController.createReport.bind(reportController) 
);

router.get(
    '/',
    authenticate,
    reportController.fetchAllReports.bind(reportController)
);

module.exports = router;
