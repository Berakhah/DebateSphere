const { User } = require('../models');

const restrictAccess = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (user.isBanned) return res.status(403).json({ message: 'Account is banned.' });
    if (user.isSuspended) return res.status(403).json({ message: 'Account is suspended.' });
    next();
};
module.exports = restrictAccess;
