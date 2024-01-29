const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate, checkDebateOwnership } = require('../middleware/authMiddleware');
const debateController = require('../controllers/debateController');
const router = express.Router();

router.post('/create', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('dateTime').not().isEmpty().withMessage('Date and time are required'),
    body('topicCategory').not().isEmpty().withMessage('Topic category is required'),
], authenticate, debateController.createDebate);

router.put('/update/:debateId', authenticate, checkDebateOwnership, debateController.updateDebate);

router.delete('/delete/:debateId', authenticate, checkDebateOwnership, debateController.deleteDebate);

router.get('/search', debateController.searchDebates);

router.get('/archived', debateController.getArchivedDebates);

module.exports = router;
