const {StreamChat} = require('stream-chat');
const dotenv = require('dotenv')
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Stream API Key or Secret is missing');
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error('Error upserting Stream user : ', error);
    }
}

const generateStreamToken = async (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr)
    } catch (error) {
        console.log("Error generating Stream token:",error);
    }
}

module.exports = {
    upsertStreamUser,
    generateStreamToken
}