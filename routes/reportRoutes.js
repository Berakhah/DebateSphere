const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Report, Debate } = require('../model'); // Adjust the path as necessary
const authenticate = require('../middleware/authenticate'); // Adjust the path as necessary

router.post('/debate', authenticate, async (req, res) => {
    const { debateId, reason } = req.body;
    // Validate request...

    try {
        await Report.create({
            type: 'debate',
            targetId: debateId,
            reporterId: req.user.id, // Ensure your auth middleware sets req.user
            reason
        });
        return res.json({ message: 'Report submitted successfully.' });
    } catch (error) {
        console.error('Error submitting report:', error);
        return res.status(500).json({ message: 'Error submitting report.' });
    }
});

// Assuming you have express-validator setup
const { body, validationResult } = require('express-validator');

router.post('/debate', [
    authenticate,
    body('debateId').isInt().withMessage('Debate ID must be an integer'),
    body('reason').notEmpty().withMessage('Reason for reporting cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { debateId, reason } = req.body;
    try {
        // Optional: Verify if the debate exists before creating a report
        const debateExists = await Debate.findByPk(debateId);
        if (!debateExists) {
            return res.status(404).json({ message: 'Debate not found.' });
        }

        await Report.create({
            type: 'debate',
            targetId: debateId,
            reporterId: req.user.id,
            reason
        });

        return res.json({ message: 'Report submitted successfully.' });
    } catch (error) {
        console.error('Error submitting report:', error);
        return res.status(500).json({ message: 'Error submitting report.' });
    }
});


module.exports = router;