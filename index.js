require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();
const cors = require('cors');

const bodyParser = require('body-parser');
server.use(express.urlencoded({ extended: false }))

server.use(bodyParser.json());
server.use(express.json());

const morgan = require('morgan');
server.use(morgan('dev'));
server.use(cors())

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
});