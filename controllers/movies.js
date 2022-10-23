const Movie = require('../models/movie');
const { messages } = require('../utils/messages')
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.messageErrorData));
        return;
      }
      next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(messages.messageErrorMovieNotFind));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(messages.messageErrorMovieCreateAnotherUser));
      }
      return movie.remove()
        .then(() => res.send({ message: messages.messageRemoveMovie }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.messageErrorMovieId));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovie, createMovie, deleteMovieById,
};
