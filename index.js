const PORT = 3000;
const express = require('express');
const server = express();
require('dotenv').config();

const apiRouter = require('./api')
server.use('/api', apiRouter)

const morgan = require('morgan')
server.use(morgan('dev'))
server.use(express.json())


server.use((req, res, next) => {
    console.log('Body log starting');
    console.log(req.body);
    console.log('Body log is ending')
    next()
})

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('WE OUT HERE IN THE', PORT)
});