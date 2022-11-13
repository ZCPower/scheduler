const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./users');
apiRouter.use('/users', userRouter)

const patientRouter = require('./patients');
apiRouter.use('/patients', patientRouter);

const techRouter = require('./techs');
apiRouter.use('/techs', techRouter)

module.exports = apiRouter;