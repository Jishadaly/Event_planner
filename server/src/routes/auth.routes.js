const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validateRegistration,
  validateLogin,
} = require('../middlewares/validate.middleware');

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.use(protect);
// router.post('/logout', authController.logout);
// router.get('/me', authController.getMe);
// router.patch('/update-me', authController.updateMe);
// router.patch('/update-password', authController.updatePassword);

module.exports = router;