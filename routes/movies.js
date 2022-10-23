const routerMovies = require('express').Router();
const { validationMovieDelete, validationMovieAdd } = require('../middlewares/validations');

const {
  getMovie, createMovie, deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/', getMovie);

routerMovies.delete('/:movieId', validationMovieDelete, deleteMovieById);

routerMovies.post('/', validationMovieAdd, createMovie);

module.exports = routerMovies;
