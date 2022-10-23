const mongoose = require('mongoose');
const { isURL } = require('validator');
const { messages } = require('../utils/messages');

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
      message: messages.messageErrorLink,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: messages.messageErrorLink,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: messages.messageErrorLink,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movie);
