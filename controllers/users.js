const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token)
        .send({
          message: 'Успешная авторизация',
          token,
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => (User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    })))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    })).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Указанный email уже существует'));
        return;
      }
      next(err);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка 404: Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка 400: Переданы некорректные данные'));
        return;
      } else if (err.code === 11000) {
        next(new ConflictError('Указанный email уже существует'));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id: ${_id} не найден`);
      }
      res.send({ message: user });
    })
    .catch(next);
};

module.exports = {
  createUser, updateUserProfile, login, getUserInfo,
};
