const express = require('express');
const patientRouter = express.Router();
const { getAllPatients, getPatientById } = require('../db/patients')

patientRouter.use((req, res, next) => {
    console.log('We are in the patient router.')

    next();
})

patientRouter.get('/', async (req, res, next) => {
    const patients = await getAllPatients();

    res.send({
        patients
    })
})

// patientRouter.get(`/${id}`, async (req, res, next) => {
//     const patient = await getPatientById();

//     res.send({
//         patient
//     })
// })


module.exports = patientRouter;