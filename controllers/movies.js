const Movie = require('../models/movie');
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
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
  const userId = req.user._id;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: userId })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка 400: Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Ошибка 404: Фильм не найден'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Ошибка 403: Фильм создан другим пользователем'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка 400: Некорректный id фильма'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovie, createMovie, deleteMovieById,
};

