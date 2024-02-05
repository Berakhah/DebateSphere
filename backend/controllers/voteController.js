// controllers/voteController.js
const { Vote, Argument } = require('../models');

const voteController = {
    submitVote: async (req, res) => {
        const { argumentId } = req.params;
        const { voteType } = req.body; // Accepts 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            // Check if the argument exists
            const argumentExists = await Argument.findByPk(argumentId);
            if (!argumentExists) {
                return res.status(404).json({ message: "Argument not found." });
            }

            // Prevent multiple votes on the same argument by the same user
            const existingVote = await Vote.findOne({ where: { argumentId, userId } });
            if (existingVote) {
                return res.status(400).json({ message: "User has already voted on this argument." });
            }

            // Create vote
            const vote = await Vote.create({ argumentId, userId, voteType });
            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ message: "Failed to submit vote.", error: error.message });
        }
    },
    updateVote: async (req, res) => {
        const { argumentId } = req.params;
        const { voteType } = req.body;
        const userId = req.user.id;

        try {
            let vote = await Vote.findOne({ where: { argumentId, userId } });
            if (!vote) {
                return res.status(404).json({ message: "Vote not found." });
            }

            vote.voteType = voteType;
            await vote.save();
            res.json({ message: "Vote updated successfully.", vote });
        } catch (error) {
            res.status(500).json({ message: "Failed to update vote.", error: error.message });
        }
    },
    revokeVote: async (req, res) => {
        const { argumentId } = req.params;
        const userId = req.user.id;

        try {
            const result = await Vote.destroy({ where: { argumentId, userId } });
            if (result === 0) {
                return res.status(404).json({ message: "Vote not found or already revoked." });
            }
            res.json({ message: "Vote revoked successfully." });
        } catch (error) {
            res.status(500).json({ message: "Failed to revoke vote.", error: error.message });
        }
    }
};

module.exports = voteController;
