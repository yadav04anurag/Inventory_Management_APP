const { createClient } = require('redis');
require('dotenv').config()
const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19596.c246.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 19596
    }
});

module.exports = redisClient;