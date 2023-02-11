const pool =({
    host : process.env.db_user ||'localhost',
    user:process.env.db_host||'postgres',
    password:process.env.db_name||'postgres',
    database:process.env.db_password||'insurance',
    port: 5432,
    max: 100,
    idleTimeoutMillis: 4000,
    connectionTimeoutMillis: 2000
});

module.exports = pool
