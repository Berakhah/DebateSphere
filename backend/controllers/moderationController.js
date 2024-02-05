const { Debate, Comment, Argument, User, ModerationAction } = require('../models');

const moderationController = {
    banUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            user.isBanned = true; 
            await user.save();
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'ban'
            });
            res.json({ message: 'User has been banned successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error banning user.', error: error.message });
        }
    },

    issueWarning: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            user.warningCount += 1; 
            await user.save();
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'warning'
            });
            res.json({ message: 'Warning issued to user successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error issuing warning to user.', error: error.message });
        }
    },

    deleteContent: async (req, res) => {
        const { contentId, contentType } = req.params;

        let contentModel;
        switch (contentType) {
            case 'debate':
                contentModel = Debate;
                break;
            case 'comment':
                contentModel = Comment;
                break;
            case 'argument':
                contentModel = Argument;
                break;
            default:
                return res.status(400).json({ message: 'Invalid content type specified.' });
        }

        try {
            const content = await contentModel.findByPk(contentId);
            if (!content) {
                return res.status(404).json({ message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} not found.` });
            }

            await content.destroy();

            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetContentId: contentId,
                contentType: contentType,
                actionType: 'delete'
            });

            res.status(200).json({ message: `${contentType} successfully deleted.` });
        } catch (error) {
            res.status(500).json({ message: `Error deleting ${contentType}.`, error: error.message });
        }
    },
    

    suspendUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            user.isSuspended = true; // User model should have an 'isSuspended' attribute
            await user.save();
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'suspend'
            });
            res.status(200).json({ message: 'User successfully suspended.' });
        } catch (error) {
            res.status(500).json({ message: 'Error suspending user.', error: error.message });
        }
    },
};

module.exports = moderationController;
