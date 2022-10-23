const router = require('express').Router();
const { messages } = require('../utils/messages')
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const userSign = require('./userSign');
const userSignOut = require('./userSignOut');

router.use('/', userSign);
router.use(auth);
router.use('/', userSignOut);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.use((req, res, next) => {
  next(new NotFoundError(messages.messageIndefPage));
});

module.exports = router;
