const express = require('express');
const authenticate = require('../middleware/authMiddleware').authenticate;
const isModerator = require('../middleware/isModerator'); // Ensure this middleware checks for moderator role
const moderationController = require('../controllers/moderationController');

const router = express.Router();


router.delete('/content/:contentId', authenticate, isModerator, moderationController.deleteContent);
router.post('/user/:userId/suspend', authenticate, isModerator, moderationController.suspendUser);
router.post('/user/:userId/ban', authenticate, isModerator, moderationController.banUser);
router.post('/user/:userId/warn', authenticate, isModerator, moderationController.issueWarning);


module.exports = router;
