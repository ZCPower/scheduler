const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv").config();
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getAllUsers, getUserById, getUserByUsername, createUser } = require('../db/users')

userRouter.use((req, res, next) => {
    console.log('We are in the users router.')

    next();
});

//Simple Get Route for entire user route - getsAllUsers
//just to test out userRouter, not necessary for final product.
userRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users
    })
});





//NO IDEA WHY THIS IS RETURNING UNDEFINED FOR COLUMNS...
module.exports = userRouter;