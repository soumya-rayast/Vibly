const express = require('express');
const { signup, login, logout, onboard } = require('../controller.js/auth.Controller');
const { protectRoute } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/onboarding', protectRoute, onboard);

// check if user is logged in 
router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});


module.exports = router;  