const { celebrate, Joi } = require('celebrate');
const routerUsers = require('express').Router();

const {
  updateUserProfile, getUserInfo,
} = require('../controllers/users');

routerUsers.get('/me', getUserInfo);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30)
      .trim(),
  }),
}), updateUserProfile);

module.exports = routerUsers;
