const { User } = require('../models');
const jwt = require('jsonwebtoken');

const isModerator = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user && user.role === 'moderator') {
        next();
    } else {
        return res.status(403).json({ message: 'Insufficient permissions.' });
    }
};

module.exports = isModerator;
