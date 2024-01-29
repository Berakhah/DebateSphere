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

const checkDebateOwnership = async (req, res, next) => {
    const debateId = req.params.debateId;
    console.log("Debate ID from request:", debateId);

    try {
        const debate = await db.Debate.findByPk(debateId);
        if (!debate) {
            console.log("Debate not found for ID:", debateId);
            return res.status(404).send({ message: "Debate not found." });
        }

        if (debate.creatorUserId !== req.user.id) {
            console.log("User not authorized. User ID:", req.user.id, "Creator ID:", debate.creatorUserId);
            return res.status(403).send({ message: "User is not authorized to perform this action." });
        }

        req.debate = debate;
        next();
    } catch (error) {
        console.error("Error in checkDebateOwnership:", error);
        res.status(500).send({ message: "Internal server error." });
    }
};


module.exports = { authenticate, checkDebateOwnership };
