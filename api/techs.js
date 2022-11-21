const express = require('express');
const techRouter = express.Router();
const { getAllTechs, createTech, deleteTech } = require('../db/techs')

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

techRouter.post('/', async (req, res, next) => {
    console.log(req.body)
    const { name, rbt, tricare, trainer, training, dayoff } = req.body;

    try {
        const tech = await createTech({
            name: name,
            rbt: rbt,
            tricare: tricare,
            trainer: trainer,
            training: training,
            dayoff: dayoff
        })

        res.send(tech);
    } catch (error) {
        next(error)
    }
})

techRouter.delete('/', async (req, res, next) => {
    console.log(req.body)
    const { id } = req.body

    try {
        const tech = await deleteTech(id);
        res.send(tech)
    } catch (error) {
        console.error(error)
    }
})

module.exports = techRouter;