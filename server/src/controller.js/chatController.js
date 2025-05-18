const { generateStreamToken } = require("../config/stream.js");

const getStreamToken = async (req, res) => {
    try {
        const token = generateStreamToken(req.user.id);
        req.status(200).json({ token });
    } catch (error) {
        console.log('Error in getStreamToken controller', error.message);
        res.status(500).json({ message: "Internal Server error" })
    }
}

module.exports = {
    getStreamToken
}