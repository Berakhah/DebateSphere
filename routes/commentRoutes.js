router.post('/debates/:debateId/comment', authenticate, async (req, res) => {
    const { content } = req.body;
    const { debateId } = req.params;
    const userId = req.user.id; // Again, assuming `req.user` is set

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
});
