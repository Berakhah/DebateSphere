// routes/moderationRoutes.js
const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../middleware/authMiddleware').authenticate;
const isModerator = require('../middleware/isModerator'); // Adjust the path as necessary
const { createReport, reviewReport } = require('../controllers/moderationController');

const router = express.Router();

router.post('/report', authenticate, body('targetId').isInt(), body('reason').notEmpty(), createReport);
router.post('/report/:id/review', authenticate, isModerator, reviewReport);

module.exports = router;

