const express = require('express');
const { body, validationResult } = require('express-validator');
const Debate = require('../model/debate'); // Make sure the path is correct. It might be '../models/debate' if your models are in a models folder.
const { authenticate } = require('../middleware/authMiddleware');
const { isContentAppropriate } = require('../utilities/contentFilter'); 
const router = express.Router();

router.post('/create', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('dateTime').not().isEmpty().withMessage('Date and time are required'),
    body('topicCategory').not().isEmpty().withMessage('Topic category is required'),
], authenticate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Content filtering logic added here
    if (!isContentAppropriate(req.body.description)) {
        return res.status(400).json({ message: "Content includes prohibited keywords." });
    }

    try {
        const debate = await Debate.create({
            ...req.body,
            CreatorUserID: req.user.id // Assuming 'req.user.id' is correctly populated from the JWT strategy
        });

        // Emit an event for the newly created debate
        req.app.get('io').emit('debateCreated', debate);

        res.status(201).json(debate);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to check debate ownership is correctly implemented here

router.put('/update/:id', authenticate, checkDebateOwnership, async (req, res) => {
    try {
        const debate = await Debate.findByPk(req.params.id);
        if (!debate) {
            return res.status(404).send({ message: "Debate not found." });
        }
        const updatedDebate = await debate.update(req.body);

        // Emit an event for the updated debate
        req.app.get('io').to(req.params.id).emit('debateUpdated', updatedDebate);

        res.json(updatedDebate);
    } catch (error) {
        res.status(500).json({ message: "Error updating debate.", error: error.message });
    }
});

// Delete operation
router.delete('/delete/:id', authenticate, checkDebateOwnership, async (req, res) => {
    try {
        const debate = await Debate.findByPk(req.params.id);
        if (debate) {
            await debate.destroy();
            // Emit an event for the deleted debate
            req.app.get('io').to(req.params.id).emit('debateDeleted', { debateId: req.params.id });
            res.json({ message: "Debate successfully deleted." });
        } else {
            res.status(404).json({ message: "Debate not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting debate.", error: error.message });
    }
});


// Advanced Search Endpoint
router.get('/search', async (req, res) => {
    const { keyword, status, startDate, endDate, category } = req.query;
    try {
        const conditions = {
            [Op.and]: [ // Combine all conditions
                keyword ? {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${keyword}%` } },
                        { description: { [Op.iLike]: `%${keyword}%` } }
                    ]
                } : {},
                status ? { status } : {},
                startDate && endDate ? {
                    dateTime: {
                        [Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                } : {},
                category ? { topicCategory: category } : {}
            ]
        };

        const debates = await Debate.findAll({
            where: conditions,
            order: [['dateTime', 'DESC']] // Orders by dateTime in descending order
        });
        res.json(debates);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send('Failed to perform search.');
    }
});


// Endpoint to Retrieve Archived Debates
router.get('/archived', async (req, res) => {
    try {
        const archivedDebates = await Debate.findAll({
            where: { status: 'Archived' },
            order: [['dateTime', 'DESC']] // Adjust ordering as necessary
        });
        res.json(archivedDebates);
    } catch (error) {
        console.error('Error retrieving archived debates:', error);
        res.status(500).send('Failed to retrieve archived debates.');
    }
});



module.exports = router;
