const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/user'); // Adjust this path to match your project structure
const { sendVerificationEmail } = require('../utilities/emailSender');
const jwt = require('jsonwebtoken');

// Controller for user registration
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Create user with a verification token
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || 'user', // Default role
            profileInformation: req.body.profileInformation || '',
            verificationToken: verificationToken,
            verified: false // User is not verified until they click the email link
        });

        // Construct the verification link
        const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${verificationToken}`;

        // Send verification email
        await sendVerificationEmail(user.email, verificationLink);

        res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
};

// Controller for user login
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).send({ error: "Login failed! User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ error: "Login failed! Incorrect password." });
    }

    // Sign JWT
    const token = jwt.sign({ id: user.UserID, role: user.Role }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
        id: user.UserID,
        name: user.Name,
        email: user.Email,
        role: user.Role,
        accessToken: token
    });
};

// Controller for verifying user email
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ where: { VerificationToken: token } });
        if (!user) {
            return res.status(400).send('Verification failed. Invalid or expired token.');
        }

        // Update the user as verified
        user.Verified = true;
        user.VerificationToken = null; // Clear the token post-verification
        await user.save();

        res.send('Email verified successfully. Your account is now active.');
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).send('Internal server error during email verification.');
    }
};

module.exports = {
    register,
    login,
    verifyEmail
};
