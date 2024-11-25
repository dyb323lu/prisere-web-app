require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const UserRoutes = require('./routes/UserRoutes.js');
const app = express();

// Middleware, enable cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'placeholder_secret'));

// Connects to the db using .env MONGO_URI constant
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', UserRoutes);

// Sample API endpoint
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Port configuration
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});