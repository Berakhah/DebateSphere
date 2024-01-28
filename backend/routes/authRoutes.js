const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const db = require('../models'); // Import the db object from Sequelize setup
const { sendVerificationEmail } = require('../utilities/emailSender'); // Adjust path as needed
const jwt = require('jsonwebtoken');

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/register', [
            body('name').not().isEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Please provide a valid email address'),
            body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
        ], this.register.bind(this));

        this.router.post('/login', this.login.bind(this));
        this.router.get('/verify-email', this.verifyEmail.bind(this));
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await db.User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');

        try {
            const user = await db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role || 'user',
                profileInformation: req.body.profileInformation || '',
                verificationToken: verificationToken,
                verified: false
            });

            const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${verificationToken}`;
            await sendVerificationEmail(user.email, verificationLink);

            res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ message: "An error occurred during registration." });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send({ error: "Login failed! User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: "Login failed! Incorrect password." });
        }

        const token = jwt.sign({ id: user.userId, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    }

    async verifyEmail(req, res) {
        const { token } = req.query;

        try {
            const user = await db.User.findOne({ where: { verificationToken: token } });
            if (!user) {
                return res.status(400).send('Verification failed. Invalid or expired token.');
            }

            user.verified = true;
            user.verificationToken = null;
            await user.save();

            res.send('Email verified successfully. Your account is now active.');
        } catch (error) {
            console.error('Email verification error:', error);
            res.status(500).send('Internal server error during email verification.');
        }
    }
}

module.exports = new AuthRoutes().router;
