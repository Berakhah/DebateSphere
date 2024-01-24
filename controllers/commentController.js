const { Comment } = require('../models/comment'); // Make sure the path is correct
const { User } = require('../models/user'); // Make sure the path is correct

// Controller for posting a comment
exports.postComment = async (req, res) => {
    const { content } = req.body;
    const { debateId } = req.params;
    const userId = req.user.id; // Assuming `req.user` is set

    try {
        const comment = await Comment.create({
            debateId,
            userId,
            content
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).json({ message: 'Failed to submit comment.' });
    }
};

// Add more controllers as needed
