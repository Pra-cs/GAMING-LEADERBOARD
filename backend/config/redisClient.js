// redisClient.js
const redis = require('redis');

const redisClient = redis.createClient(); // default: localhost:6379

redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
