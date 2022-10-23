const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validationUserSignIn, validationUserSignUp } = require('../middlewares/validations');

router.post(
  '/signin',
  validationUserSignIn,
  login,
);

router.post(
  '/signup',
  validationUserSignUp,
  createUser,
);

module.exports = router;
