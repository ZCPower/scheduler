const { client } = require('./index');
const { createUser, getAllUsers } = require('./users')

async function dropTables() {
    try {
        console.log('Starting to drop tables...')


        await client.query(`
        DROP TABLE IF EXISTS techs;
        DROP TABLE IF EXISTS patients;
        DROP TABLE IF EXISTS users;`);


        console.log('Finished dropping tables...')
    }
    catch (error) {
        throw error
    }
}

async function createTables() {
    try {
        console.log('Starting to build tables...')
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
        );
        CREATE TABLE patients(
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            "needsRBT" BOOLEAN NOT NULL DEFAULT FALSE,
            tricare BOOLEAN NOT NULL DEFAULT FALSE,
            "trainOn" BOOLEAN NOT NULL DEFAULT FALSE, 
            dayoff BOOLEAN NOT NULL DEFAULT FALSE
        );
        CREATE TABLE techs(
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            rbt BOOLEAN NOT NULL DEFAULT FALSE,
            tricare BOOLEAN NOT NULL DEFAULT FALSE,
            trainer BOOLEAN NOT NULL DEFAULT FALSE,
            training BOOLEAN NOT NULL DEFAULT FALSE, 
            dayoff BOOLEAN NOT NULL DEFAULT FALSE
        )
        `)
        console.log('Finished building tables...')
    } catch (error) {
        throw error
    }
}

async function createInitialUsers() {
    try {
        console.log('Starting to create users...');
        const startingUsers = [{
            username: 'KaeLee',
            password: 'yourmom123'
        }, {
            username: 'test',
            password: 'password'
        }]

        const users = await Promise.all(startingUsers.map(createUser))
        console.log(users)
        // const gettem = await getAllUsers();
        // console.log(gettem)
        // return gettem;
        return users
    }
    catch (error) {
        throw error;
    }
}



async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await getAllUsers();
    } catch (error) {
        throw error
    }
}


rebuildDB()
    // .then(testDB())
    .catch(console.error)
    .finally(() => client.end())