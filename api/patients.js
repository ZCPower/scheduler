const express = require('express');
const patientRouter = express.Router();
const { getAllPatients, getPatientById, createPatient } = require('../db/patients')

patientRouter.use((req, res, next) => {
    console.log('We are in the patient router.')

    next();
})

patientRouter.get('/', async (req, res, next) => {
    const patients = await getAllPatients();

    res.send({
        patients
    })
});


patientRouter.post('/', async (req, res, next) => {
    const { name, needsRBT, tricare, trainOn, groupable, dayoff } = req.body
    try {
        const patient = await createPatient({
            name: name,
            needsRBT: needsRBT,
            tricare: tricare,
            trainOn: trainOn,
            groupable: groupable,
            dayoff: dayoff
        })

        res.send(patient);
    } catch (error) {

    }
})

// patientRouter.get(`/${id}`, async (req, res, next) => {
//     const patient = await getPatientById();

//     res.send({
//         patient
//     })
// })


module.exports = patientRouter;