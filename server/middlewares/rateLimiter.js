const rateLimit = require("express-rate-limit");

rateLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message: 'You have exceeded the 10 requests in 10 seconds limit!',
  headers: true,
});

module.exports = rateLimiter