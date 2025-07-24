const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const isBlacklisted = await redisClient.exists(`token:${token}`);
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Token revoked' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },
  
  isAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  }
};