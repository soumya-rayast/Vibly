const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const chatRoutes = require('./src/routes/chatRoutes.js');
const helmet = require('helmet');

// Database connection
const connectDb = require('./src/config/db.js');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
// Body Parsing
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy'
    })
})
app.get('/', (req, res) => {
    res.send('Vibly server running');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDb();
}) 