const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${connect.connection.host}`);
    } catch (error) {
        console.log("Error in Connecting to MongoDB", error);
        process.exit(1);
    }
}
module.exports = connectDb; 