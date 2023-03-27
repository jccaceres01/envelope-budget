const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'envelopes',
  password: 'Abcd:1234',
  port: 5432
});

module.exports = pool;