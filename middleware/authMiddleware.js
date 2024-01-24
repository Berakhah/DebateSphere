const jwt = require('jsonwebtoken');
const { Debate } = require('../model'); // Correct the path as necessary

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if token is not provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = user;
        next();
    });
};

// Middleware to check if the logged-in user is the owner of the debate
const checkDebateOwnership = async (req, res, next) => {
    try {
        const debate = await Debate.findByPk(req.params.debateId);

        if (!debate) {
            return res.status(404).send({ message: "Debate not found." });
        }

        if (debate.creatorUserId !== req.user.id) {
            return res.status(403).send({ message: "User is not authorized to perform this action." });
        }

        // Attach the debate to the request object if further operations need it
        req.debate = debate;
        next();
    } catch (error) {
        console.error('Error checking debate ownership:', error);
        res.status(500).send({ message: "Internal server error." });
    }
};

module.exports = { authenticate, checkDebateOwnership };
