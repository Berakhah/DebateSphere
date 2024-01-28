// controllers/voteController.js
const { Vote, Debate } = require('../models');

const voteController = {
    submitVote: async (req, res) => {
        const { debateId } = req.params;
        const { voteType } = req.body; // Assume 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            // Check if user has already voted on this debate
            const existingVote = await Vote.findOne({
                where: { debateId, userId }
            });

            if (existingVote) {
                return res.status(400).json({ message: "User has already voted on this debate." });
            }

            const vote = await Vote.create({
                debateId,
                userId,
                voteType
            });

            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ message: "Failed to submit vote.", error: error.message });
        }
    },
};

module.exports = voteController;
