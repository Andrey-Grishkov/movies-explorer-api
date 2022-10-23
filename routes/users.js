const routerUsers = require('express').Router();
const { validationUserUpdate } = require('../middlewares/validations');

const {
  updateUserProfile, getUserInfo,
} = require('../controllers/users');

routerUsers.get('/me', getUserInfo);

routerUsers.patch('/me', validationUserUpdate , updateUserProfile);

module.exports = routerUsers;
