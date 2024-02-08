const express = require('express');
const { body } = require('express-validator');
const { authenticate, checkDebateOwnership, checkRole } = require('../middleware/authMiddleware');
const debateController = require('../controllers/debateController');

const router = express.Router();

// Endpoint for creating a debate
router.post('/create', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('dateTime').not().isEmpty().withMessage('Date and time are required'),
    body('topicCategory').not().isEmpty().withMessage('Topic category is required'),
    authenticate, 
    checkRole(['admin', 'moderator', 'debate_creator']),
], debateController.createDebate);

// Endpoint for updating a debate
router.put('/update/:debateId', [
    authenticate, 
    checkDebateOwnership,
    body('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
    body('description').optional().not().isEmpty().withMessage('Description cannot be empty'),
    body('dateTime').optional().not().isEmpty().withMessage('Date and time cannot be empty'),
    body('topicCategory').optional().not().isEmpty().withMessage('Topic category cannot be empty'),
], debateController.updateDebate);

// Endpoint for deleting a debate
router.delete('/delete/:debateId', authenticate, checkDebateOwnership, debateController.deleteDebate);

// Endpoint for searching debates
router.get('/search', debateController.searchDebates);

// Endpoint for retrieving archived debates
router.get('/archived', debateController.getArchivedDebates);

router.get('/debates/:debateId', debateController.fetchDebateDetail);


module.exports = router;
