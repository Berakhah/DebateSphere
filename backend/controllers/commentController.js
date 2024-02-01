// commentController.js

const { Comment } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');
// const { checkContentWithAI } = require('../utilities/aiContentFilter');

const commentController = {
    postComment: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const { debateId } = req.params;
        const userId = req.user?.id; // Use optional chaining to avoid null reference errors

        // Check if the content includes prohibited keywords
        if (!isContentAppropriate(content)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        // Temporarily disabling AI content moderation
        // const isCommentAppropriate = await checkContentWithAI(content);
        // if (!isCommentAppropriate) {
        //     return res.status(400).json({ message: "Content flagged as inappropriate by AI filter." });
        // }

        try {
            // Validate debateId and userId
            if (!debateId || !userId) {
                return res.status(400).json({ message: "Invalid debate ID or user ID." });
            }

            // Proceed with comment creation
            const comment = await Comment.create({
                content,
                debateId,
                userId
            });

            // Send success response
            res.status(201).json(comment);
        } catch (error) {
            console.error(error); // Log the full error to the console
            // Return a generic error message to the client
            // Customize this as needed based on your error handling policy
            res.status(500).json({ message: "Failed to submit comment.", error: error.toString() });
        }
    },

    // Additional methods for comment moderation could be implemented here
};

module.exports = commentController;
