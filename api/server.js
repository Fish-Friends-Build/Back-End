const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
require('express-async-errors');

const errorHandler = require('../utils/errorHandler.js');
const apiRouter = require('./api-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api', apiRouter);

server.use((req, res, next) => {
  const error = new Error('Invalid endpoint');
  error.status = 404;
  next(error);
});

server.use(errorHandler);

module.exports = server;
