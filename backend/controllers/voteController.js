const { Vote, Argument, Debate } = require('../models');

const voteController = {
    submitVote: async (req, res) => {
        const { argumentId } = req.params;
        const { voteType } = req.body; // 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            // Fetch the argument to get the associated debateId
            const argument = await Argument.findByPk(argumentId, {
                include: [{
                    model: Debate,
                    as: 'debate'
                }]
            });

            if (!argument) {
                return res.status(404).json({ message: "Argument not found." });
            }

            // Check for existing vote by the same user on the same argument
            const existingVote = await Vote.findOne({ 
                where: { 
                    argumentId, 
                    userId 
                }
            });

            if (existingVote) {
                return res.status(400).json({ message: "User has already voted on this argument." });
            }

            // Create a new vote
            const vote = await Vote.create({ 
                debateId: argument.debateId, 
                argumentId, 
                userId, 
                voteType 
            });

            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ message: "Failed to submit vote.", error: error.message });
        }
    },

    updateVote: async (req, res) => {
        const { argumentId } = req.params;
        const { voteType } = req.body; // 'upvote' or 'downvote'
        const userId = req.user.id;

        try {
            // Fetch the existing vote
            let vote = await Vote.findOne({ 
                where: { 
                    argumentId, 
                    userId 
                }
            });

            if (!vote) {
                return res.status(404).json({ message: "Vote not found." });
            }

            // Update the vote type
            vote.voteType = voteType;
            await vote.save();

            res.status(200).json({ message: "Vote updated successfully.", vote });
        } catch (error) {
            res.status(500).json({ message: "Failed to update vote.", error: error.message });
        }
    },

    revokeVote: async (req, res) => {
        const { argumentId } = req.params;
        const userId = req.user.id;

        try {
            // Delete the vote
            const result = await Vote.destroy({ 
                where: { 
                    argumentId, 
                    userId 
                } 
            });

            if (result === 0) {
                return res.status(404).json({ message: "Vote not found or already revoked." });
            }

            res.status(200).json({ message: "Vote revoked successfully." });
        } catch (error) {
            res.status(500).json({ message: "Failed to revoke vote.", error: error.message });
        }
    }
};

module.exports = voteController;
