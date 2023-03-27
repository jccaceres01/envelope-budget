const pool = require('./connection');

/**
 * Get all envelopes
 */
const getEnvelopes = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('select * from envelope');
    client.release();
    return res.rows;
  } catch (er) {
    console.log(er);
  }
}

/**
 * Get envelope by id
 */
const getEnvelopeById = async (id) => {
  try {
    const client = await pool.connect();
    const res = await client.query('select * from envelope where id = $1', [id]);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * 
 * Add new envelope
 */
const addEnvelope = async (env) => {
  try {
    let queryText = 'insert into envelope (';
    let queryTextPart2 = 'values (';

    Object.entries(env).forEach((item, index) => {
      queryText += ` ${item[0]}`;
      queryTextPart2 += ` $${index + 1}`;
      queryText += (index < Object.keys(env).length -1) ? ',' : ')';
      queryTextPart2 += (index < Object.keys(env).length -1) ? ',' : ')';
    });
    queryText += ' '+ queryTextPart2 +' returning *';

    let values = Object.values(env);

    const client = await pool.connect();
    const res = await client.query(queryText, values);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * Update envelope by specific id
 */
const updateEnvelope = async (id, env) => {
  try {
    let queryText = 'update envelope set';

    Object.entries(env).forEach((item, index) => {
      queryText += ` ${item[0]} = $${index + 1}`;
      if (index < Object.keys(env).length -1) queryText += ',';
    });
    queryText += ` where id = $${Object.keys(env).length + 1} returning *`;

    let values = Object.values(env);
    values.push(id);
    
    console.log(queryText);
    console.log(values);

    const client = await pool.connect();
    const res = await client.query(queryText, values);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * Delete envelope by specific id
 */
const deleteEnvelope = async (id) => {
  try {
    const client = await pool.connect();
    const res = await pool.query('delete from envelope where id = $1 returning *', [id]);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

module.exports = {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope
};
