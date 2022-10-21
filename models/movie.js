const mongoose = require('mongoose');
const { isURL } = require('validator');

const movie = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: 'Некорректная ссылка',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: 'Некорректная ссылка',
    },
  },
  movieId: {
    type: Number,
    required: true,
    ref: 'user',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('movie', movie);
