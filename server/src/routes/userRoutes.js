const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } = require('../controller.js/user.Controller');
const router = express.Router();

router.use(protectRoute);

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)
router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest);
router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);

module.exports = router; 