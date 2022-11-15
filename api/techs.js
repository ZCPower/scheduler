const express = require('express');
const techRouter = express.Router();
const { getAllTechs } = require('../db/techs')

techRouter.use((req, res, next) => {
    console.log('We are in the techs router.')

    next();
})

techRouter.get('/', async (req, res, next) => {
    const techs = await getAllTechs();

    res.send({
        techs
    })
})

module.exports = techRouter;