//authMiddleware.js

const jwt = require('jsonwebtoken');
const db = require('../models');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if token is not provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification error:", err);
            return res.sendStatus(403);
        }
        console.log("Decoded user:", user);
        req.user = user;
        next();
    });
    
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    };
};

const checkDebateOwnership = async (req, res, next) => {
    const debateId = req.params.debateId;

    try {
        const debate = await db.Debate.findByPk(debateId);
        if (!debate) {
            return res.status(404).send({ message: "Debate not found." });
        }

        // Allow moderators or admins to bypass ownership check
        if (['moderator', 'administrator'].includes(req.user.role)) {
            return next();
        }

        // Check if the logged-in user is the debate creator
        if (debate.creatorUserId !== req.user.id) {
            return res.status(403).send({ message: "Unauthorized access." });
        }

        next();
    } catch (error) {
        console.error("Error in checkDebateOwnership:", error);
        res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = { authenticate, checkDebateOwnership, checkRole };
