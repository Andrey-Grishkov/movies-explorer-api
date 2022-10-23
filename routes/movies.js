const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { messages } = require('../utils/messages')

const {
  getMovie, createMovie, deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/', getMovie);

routerMovies.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().hex().length(24),
  }),
}), deleteMovieById);

routerMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages.messageErrorUrl);
    }),
    trailerLink: Joi.string().uri().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages.messageErrorUrl);
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message(messages.messageErrorUrl);
    }),
    movieId: Joi.number().required(),
  }),
}), createMovie);

module.exports = routerMovies;
