const express = require('express');
const { signup, login, logout, onboard } = require('../controller.js/auth.Controller');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.post('/onboarding', protectRoute, onboard);

// check if user is logged in 
router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
})

module.exports = router; 