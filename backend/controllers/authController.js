const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../models');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utilities/emailSender');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role, profileInformation } = req.body;
            const existingUser = await db.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already in use' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationToken = crypto.randomBytes(20).toString('hex');
            const user = await db.User.create({
                name,
                email,
                password: hashedPassword,
                role: role || 'user',
                profileInformation: profileInformation || '',
                verificationToken,
                verified: false
            });
            const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
            await sendVerificationEmail(user.email, verificationLink);
            res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });
        } catch (error) {
            res.status(500).json({ message: "An error occurred during registration.", error: error.toString() });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({ where: { email } });
            if (!user) return res.status(401).json({ message: "Login failed! User not found." });
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ message: "Login failed! Incorrect password." });
            const token = jwt.sign({ id: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ id: user.userId, name: user.name, email: user.email, role: user.role, accessToken: token });
        } catch (error) {
            res.status(500).json({ message: "Login failed.", error: error.toString() });
        }
    }

    async verifyEmail(req, res) {
        try {
            const { token } = req.params;
            const user = await db.User.findOne({ where: { verificationToken: token } });
            if (!user) return res.status(400).json({ message: 'Verification failed. Invalid or expired token.' });
            await user.update({ verified: true, verificationToken: null });
            res.json({ message: 'Email verified successfully. Your account is now active.' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error during email verification.', error: error.toString() });
        }
    }

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const user = await db.User.findOne({ where: { email } });
            if (!user) return res.status(404).json({ message: "User not found." });
            const resetToken = crypto.randomBytes(20).toString('hex');
            const resetTokenExpires = Date.now() + 3600000; // 1 hour from now
            await user.update({ resetPasswordToken: resetToken, resetPasswordExpires: resetTokenExpires });
            const resetLink = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
            await sendPasswordResetEmail(user.email, resetLink);
            res.json({ message: "Password reset email sent." });
        } catch (error) {
            res.status(500).json({ message: "Error sending password reset email.", error: error.toString() });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const user = await db.User.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [db.Sequelize.Op.gt]: Date.now() } } });
            if (!user) return res.status(400).json({ message: "Password reset token is invalid or has expired." });
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });
            res.json({ message: "Password has been reset successfully." });
        } catch (error) {
            res.status(500).json({ message: "Failed to reset password.", error: error.toString() });
        }
    }
}

module.exports = new AuthController();
