const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "Shellsha97",
    host: "localhost",
    port: 5432, //default postgres port
    database: "backend-b"
})

module.exports = {
    query: (text, params) => pool.query(text, params)
};
