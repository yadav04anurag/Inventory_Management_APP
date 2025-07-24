const jwt = require('jsonwebtoken');
const User = require('../models/User');
const  redisClient  = require('../config/redis');
const { validateRegisterInput } = require('../utils/validation');

module.exports = {
  register: async (req, res) => {
    try {
      const { isValid, errors } = validateRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json({ errors });
      }

      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const user = await User.create({ username, password, role: 'user' });

      const token = jwt.sign(
        { id: user._id, username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      });

      res.status(201).json({
        id: user._id,
        username,
        role: user.role,
        message: 'Registration successful'
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user._id, username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
      });

      res.json({
        id: user._id,
        username,
        role: user.role,
        message: 'Login successful'
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(400).json({ message: 'No active session' });
      }

      const decoded = jwt.decode(token);
      const expiration = decoded.exp * 1000 - Date.now();
      
      await redisClient.set(`token:${token}`, 'blacklisted');
      await redisClient.expire(`token:${token}`, Math.ceil(expiration / 1000));

      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      res.json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ error: 'Logout failed' });
    }
  },

  getProfile: async (req, res) => {
    try {
      // The user's ID is attached to the request object by the verifyToken middleware
      const user = await User.findById(req.user.id).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user._id,
        username: user.username,
        role: user.role,
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  adminRegister: async (req, res) => {
    try {
      const { isValid, errors } = validateRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json({ errors });
      }

      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const user = await User.create({ username, password, role: 'admin' });

      res.status(201).json({
        id: user._id,
        username,
        role: user.role,
        message: 'Admin created successfully'
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.clearCookie('token');
      res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Deletion failed' });
    }
  }
};