const express = require('express');
const userRouter = express.Router();
const { getAllUsers } = require('../db/users')

userRouter.use((req, res, next) => {
    console.log('We are in the users router.')

    next();
});

userRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    })
})

module.exports = userRouter;