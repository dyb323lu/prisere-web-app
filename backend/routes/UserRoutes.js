const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../schema/UserSchema');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing name, email, or password'});
    }

    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await User.create({ name, email, password: hashedPassword });
    
        res.cookie('userId', newUser._id, {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
    
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password'});
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    
        res.cookie('userId', user._id, {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
    
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('userId');
    res.status(200).json({ message: 'Logout successful' });
});

router.get('/status', (req, res) => {
    const userId = req.signedCookies.userId;

    if (userId) {
        return res.status(200).json({ loggedIn: true, userId });
    }

    // User is not logged in
    res.status(200).json({ loggedIn: false });
});

module.exports = router;