const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const { getStreamToken } = require('../controller.js/chatController');
const router = express.Router();

router.get('/token', protectRoute, getStreamToken);

module.exports = router;