const InternalError = require('../errors/InternalError');
const { messages } = require('../utils/messages')

module.exports = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  const error = new InternalError(messages.messageErrorServer);
  res.status(error.status).send({ message: error.message });
  return next();
};
