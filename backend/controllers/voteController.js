// controllers/voteController.js
const { Vote } = require('../models'); // Adjust the path as necessary

const voteController = {
    submitVote: async (req, res) => {
        const { debateId } = req.params;
        const { voteType } = req.body; // 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            const existingVote = await Vote.findOne({ where: { debateId, userId } });
            if (existingVote) {
                return res.status(400).json({ message: "User has already voted on this debate." });
            }

            const vote = await Vote.create({ debateId, userId, voteType });
            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ message: "Failed to submit vote.", error: error.message });
        }
    },

    updateVote: async (req, res) => {
        const { debateId } = req.params;
        const { voteType } = req.body; // 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            let vote = await Vote.findOne({ where: { debateId, userId } });
            if (vote) {
                vote.voteType = voteType;
                await vote.save();
                return res.status(200).json({ message: "Vote updated successfully.", vote });
            } else {
                return res.status(404).json({ message: "Vote not found." });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to update vote.", error: error.message });
        }
    },

    revokeVote: async (req, res) => {
        const { debateId } = req.params;
        const userId = req.user.id;

        try {
            const result = await Vote.destroy({ where: { debateId, userId } });
            if (result > 0) {
                return res.status(200).json({ message: "Vote revoked successfully." });
            } else {
                return res.status(404).json({ message: "Vote not found." });
            }
        } catch (error) {
            res.status(500).json({ message: "Failed to revoke vote.", error: error.message });
        }
    }
};

module.exports = voteController;
