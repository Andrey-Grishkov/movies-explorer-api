const router = require('express').Router();
const { messages } = require('../utils/messages')

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: messages.messageSignOut});
});

module.exports = router;
