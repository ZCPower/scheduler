const express = require('express');
const techRouter = express.Router();

techRouter.use((req, res, next) => {
    console.log('We are in the techs router.')

    res.send({ message: 'Hello from techs ' })
})

module.exports = techRouter;