require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { rateLimiter } = require('./utils/rateLimiter');
const cors = require('./middlewares/cors');
const { dataBaseUrl } = require('./utils/constants');

const { PORT, NODE_ENV, DATABASE_URL } = process.env;

const app = express();

//DATABASE_URL = 'mongodb://localhost:27017/moviesdb' - было в энви

mongoose.connect(
  (NODE_ENV === 'production' ? DATABASE_URL : dataBaseUrl),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});

app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(rateLimiter);

app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
