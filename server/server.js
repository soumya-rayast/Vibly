const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const chatRoutes = require('./src/routes/chatRoutes.js');

const connectDb = require('./src/config/db.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('Vibly server running');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDb();
}) 