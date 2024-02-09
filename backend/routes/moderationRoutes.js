const express = require('express');
const authenticate = require('../middleware/authMiddleware').authenticate;
const { checkAdmin } = require('../middleware/roleCheck'); 
const moderationController = require('../controllers/moderationController');
const router = express.Router();

router.patch('/user/:userId/ban',
 authenticate,
  checkAdmin, moderationController.banUser);
router.patch('/user/:userId/warn',
 authenticate, 
 checkAdmin, moderationController.issueWarning);
router.patch('/user/:userId/suspend',
 authenticate,
  checkAdmin, moderationController.suspendUser);
router.delete('/content/:contentType/:contentId',
 authenticate, 
 checkAdmin, moderationController.deleteContent);
router.get('/users', 
authenticate,
moderationController.listUsers);

module.exports = router;


