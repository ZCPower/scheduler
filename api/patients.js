const express = require('express');
const patientRouter = express.Router();

patientRouter.use((req, res, next) => {
    console.log('We are in the patient router.')

    res.send({ message: 'Hello from patients' })
})

module.exports = patientRouter;