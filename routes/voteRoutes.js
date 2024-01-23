const express = require('express');
const router = express.Router();

router.post('/debates/:debateId/vote', authenticate, async (req, res) => {
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const { debateId } = req.params;
    const userId = req.user.id; // Assuming your authentication middleware sets `req.user`

    try {
        const vote = await Vote.create({
            debateId,
            userId,
            voteType
        });
        res.status(201).json(vote);
    } catch (error) {
        console.error('Error submitting vote:', error);
        res.status(500).json({ message: 'Failed to submit vote.' });
    }
});
