const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

module.exports = server;