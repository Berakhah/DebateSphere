const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], authController.register);

router.post('/login', authController.login);

router.get('/verify-email/:token', authController.verifyEmail);

router.post('/request-password-reset', [
    body('email').isEmail().withMessage('Please provide a valid email address')
], authController.requestPasswordReset);

router.post('/reset-password/:token', [
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], authController.resetPassword);

module.exports = router;
