// commentController.js

const { Comment } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');
const { checkContentWithAI } = require('../utilities/aiContentFilter');

const commentController = {
    postComment: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;

        // Check if the content includes prohibited keywords
        if (!isContentAppropriate(content)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        // Check content with AI moderation
        const isCommentAppropriate = await checkContentWithAI(content);
        if (!isCommentAppropriate) {
            return res.status(400).json({ message: "Content flagged as inappropriate by AI filter." });
        }

        try {
            // Proceed with comment creation
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
