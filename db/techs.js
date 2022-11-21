const { client } = require('./index');

async function createTech({ name, rbt, tricare, trainer, training, dayoff }) {
    try {
        const { rows: [tech] } = await client.query(`
        INSERT INTO techs (name, rbt, tricare, trainer, training, dayoff)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [name, rbt, tricare, trainer, training, dayoff])
        return tech
    } catch (error) {
        console.error(error)
    }
}

async function getAllTechs() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM techs;
        `)

        return rows
    } catch (error) {
        console.error(error)
    }
}

async function deleteTech(id) {
    try {
        const { rows } = await client.query(`
    DELETE FROM techs
    WHERE id = ${id}
    RETURNING *;
    `)
        return rows
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createTech,
    getAllTechs,
    deleteTech
}