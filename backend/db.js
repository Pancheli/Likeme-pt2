const { Pool } = require("pg");
const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE} = require("./config");

const pool = new Pool ({
    user: DB_USER,
    password: DB_PASSWORD,
    host:  DB_HOST,
    port : DB_PORT,
    database: DB_DATABASE,
    allowExitOnIdle: true
})

module.exports = pool;