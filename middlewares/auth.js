const jwt = require('jsonwebtoken');
const { messages } = require('../utils/messages')
const UnauthorizedError = require('../errors/UnauthorizedError');
const jwtSecretKey = require('../utils/constants')
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError(messages.messageAuth));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtSecretKey);
  } catch (err) {
    next(new UnauthorizedError(`auth born ${messages.messageAuth}`));
    return;
  }

  req.user = payload;

  next();
};
