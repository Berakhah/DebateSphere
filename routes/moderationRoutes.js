// routes/moderationRoutes.js
const express = require('express');
const { authenticate, isModerator } = require('../middleware/authMiddleware');
const { createReport, reviewReport } = require('../controllers/moderationController');

const router = express.Router();

router.post('/report', authenticate, body('targetId').isInt(), body('reason').notEmpty(), createReport);
router.post('/report/:id/review', authenticate, isModerator, reviewReport);

module.exports = router;
