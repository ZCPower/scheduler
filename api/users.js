const express = require('express');
const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('We are in the users router.')

    res.send({ message: 'Hello from users ' })
})

module.exports = userRouter;