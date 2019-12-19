const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const apiRouter = require('./api-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api', apiRouter);

module.exports = server;