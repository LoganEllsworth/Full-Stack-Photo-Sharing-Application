const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "group54",
    password: "group54",
    port: "5432"
});

module.exports = pool;