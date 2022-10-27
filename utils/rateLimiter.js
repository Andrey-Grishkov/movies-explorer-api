const rateLimit = require('express-rate-limit');

module.exports.rateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 200,
});
