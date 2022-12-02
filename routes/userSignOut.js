const router = require('express').Router();
const { messages } = require('../utils/messages');

// router.post('/signout', (req, res) => {
//   res.clearCookie('jwt').send({ message: messages.messageSignOut });
// });

router.post('/signout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
      sameSite: 'none',
      secure:true,
  }).send({ message: messages.messageSignOut });
});

// 'jwt', token, {
//   httpOnly: true,
//   sameSite: 'none',
//   secure:true,
// }


module.exports = router;
