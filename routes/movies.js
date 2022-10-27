const routerMovies = require('express').Router();
const { validationMovieDelete, validationMovieAdd } = require('../middlewares/validations');

const {
  getMovie, createMovie, deleteMovieById,
} = require('../controllers/movies');

routerMovies.get('/', getMovie);

routerMovies.post('/', validationMovieAdd, createMovie);

routerMovies.delete('/:movieId', validationMovieDelete, deleteMovieById);

module.exports = routerMovies;
