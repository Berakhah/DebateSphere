const express = require('express');
const { body } = require('express-validator');
const { parseISO, isFuture } = require('date-fns');
const { authenticate, checkDebateOwnership } = require('../middleware/authMiddleware');
const debateController = require('../controllers/debateController');
const router = express.Router();

router.post('/create', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('dateTime').custom((value) => isFuture(parseISO(value))).withMessage('Date and time must be in the future.'),
    body('topicCategory').not().isEmpty().withMessage('Topic category is required'),
], authenticate, debateController.createDebate);

router.put('/update/:id', authenticate, checkDebateOwnership, debateController.updateDebate);
router.delete('/delete/:id', authenticate, checkDebateOwnership, debateController.deleteDebate);
router.get('/search', debateController.searchDebates);
router.get('/archived', debateController.getArchivedDebates);

module.exports = router;
