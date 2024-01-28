const { Comment } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');

const commentController = {
    postComment: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        if (!isContentAppropriate(content)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        try {
            const comment = await Comment.create({
                content,
                debateId: req.params.debateId,
                userId: req.user.id
            });
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ message: "Failed to submit comment.", error: error.message });
        }
    },

    // Additional methods for comment moderation could be implemented here
};

module.exports = commentController;
