// commentController.js

const { Comment } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');
// const { checkContentWithAI } = require('../utilities/aiContentFilter');

const commentController = {
    postComment: async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const { debateId } = req.params;
        const userId = req.user?.id; 


        if (!isContentAppropriate(content)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }


        try {

            if (!debateId || !userId) {
                return res.status(400).json({ message: "Invalid debate ID or user ID." });
            }


            const comment = await Comment.create({
                content,
                debateId,
                userId
            });

            res.status(201).json(comment);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Failed to submit comment.", error: error.toString() });
        }
    },


};

module.exports = commentController;
