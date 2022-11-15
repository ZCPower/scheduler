const { client } = require(".");

async function createPatient({ name, needsRBT, tricare, trainOn, groupable, dayoff }) {
    try {
        const { rows: [patient] } = await client.query(`
        INSERT INTO patients(name, "needsRBT", tricare, "trainOn", groupable, dayoff)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [name, needsRBT, tricare, trainOn, groupable, dayoff])

        return patient
    } catch (error) {
        throw error
    }
}

async function updatePatient() {

}

async function getAllPatients() {
    const { rows } = await client.query(`
    SELECT * FROM patients;
    `)
    console.log('WE IN THE DB')
    console.log(rows)
    return rows
}

async function getPatientById(id) {
    const { rows: [patient] } = await client.query(`
    SELECT * FROM patients WHERE id = ${id};
    `)
    console.log('in db', patient)
    return patient
}

// async function

module.exports = {
    createPatient,
    getAllPatients,
    updatePatient,
    getPatientById
}