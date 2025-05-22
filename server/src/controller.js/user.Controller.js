const User = require("../models/User");
const FriendRequest = require('../models/FriendRequest.js');

const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, //exclude current user
                { _id: { $nin: currentUser.friends } }, // exclude current users friends
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log('Error in getRecommendedUsers controller', error.message);
        res.status(500).json({ message: 'Internal server Error' })
    }
}

const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('friends').populate('friends', 'fullName profilePic nativeLanguage learningLanguage');
        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({ message: "You can't send friend request to yourself" });
        }
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        // check if the user is already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: 'You are already friends with this user' });
        }
        // check if a req already exists 
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({ message: 'A friend request already exists between you and this user' })
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const acceptFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        // verify the current user in the recipient
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status({ message: 'You are not authorized to accept this request' });
        }
        friendRequest.status = 'accepted';
        await friendRequest.save();

        // add each user to the others friends array 
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.sender },
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        })
        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        consol.log("Error in acceptFriendRequest", error.message);
    }
}
const getFriendRequests = async (req, res) => { // <-- Fix parameter name
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: 'pending',
        }).populate('sender', 'fullName profilePic natFiveLanguage learningLanguage'); // Fixed populate fields

        const acceptedReqs = await FriendRequest.find({
            recipient: req.user.id, // Typically you want requests accepted BY the user
            status: 'accepted',
        }).populate('sender', 'fullName profilePic'); // Changed to populate sender

        res.status(200).json({ // Fixed typo: re -> res
            incomingReqs,
            acceptedReqs
        });

    } catch (error) {
        console.log('Error in getPendingFriendRequests controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getOutgoingFriendRequests = async (req, res) => {
    try {
        const outGoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: 'pending',
        }).populate('recipient', 'fullName , profilePic nativeLanguage learningLanguage');

        res.status(200).json(outGoingRequests);
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs controller", error.message)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    getRecommendedUsers,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRequests
}