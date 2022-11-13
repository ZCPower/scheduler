const PORT = 3000;
const express = require('express');
const server = express();

const apiRouter = require('./api')
server.use('/api', apiRouter)



server.use((req, res, next) => {
    console.log('Body log starting');
    console.log(req.body);
    console.log('Body log is ending')
    next()
})

server.listen(PORT, () => {
    console.log('WE OUT HERE IN THE', PORT)
});