const { client } = require('./index');

async function createUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users (username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `, [username, password]);
        return user
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
    `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    }
}


async function getAllUsers() {
    const { rows } = await client.query(`SELECT id, username FROM users;`)
    return rows;
}

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username FROM users
        WHERE id=${id}
        ;`)

        return user
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username FROM users
        WHERE username = ${username};
        `);

        return user
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    getUserById,
    getUserByUsername
}