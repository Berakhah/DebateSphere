const { Debate, Comment, Argument, User, ModerationAction } = require('../models');

const moderationController = {
    banUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            
            await user.update({ isBanned: true });
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'ban',
                description: 'User banned.'
            });
            
            res.json({ message: 'User banned successfully.' });
        } catch (error) {
            console.error('Error banning user:', error);
            res.status(500).json({ message: 'Error banning user.', error: error.toString() });
        }
    },

    issueWarning: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            
            await user.increment('warningCount');
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'warning',
                description: 'User warned.'
            });
            
            res.json({ message: 'Warning issued to user successfully.' });
        } catch (error) {
            console.error('Error issuing warning:', error);
            res.status(500).json({ message: 'Error issuing warning to user.', error: error.toString() });
        }
    },

    suspendUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            
            await user.update({ isSuspended: true });
            await ModerationAction.create({
                moderatorUserId: req.user.id,
                targetUserId: userId,
                actionType: 'suspend',
                description: 'User suspended.'
            });
            
            res.json({ message: 'User suspended successfully.' });
        } catch (error) {
            console.error('Error suspending user:', error);
            res.status(500).json({ message: 'Error suspending user.', error: error.toString() });
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
                actionType: 'delete',
                description: `${contentType} deleted.`
            });

            res.status(200).json({ message: `${contentType} successfully deleted.` });
        } catch (error) {
            console.error(`Error deleting ${contentType}:`, error);
            res.status(500).json({ message: `Error deleting ${contentType}.`, error: error.toString() });
        }
    },
};

module.exports = moderationController;

