const pool = require('./connection');

/**
 * Get all transactions
 */
const getTransactions = async (envelopeId) => {
  try {
    const client = await pool.connect();
    const res = await client.query(
      'select * from transaction where envelope_id = $1',
      [envelopeId]
    );
    client.release();
    return res.rows;
  } catch (er) {
    console.log(er); 
  }
}

/**
 * Get transaction by id
 */
const getTransactionById = async (id, envelopeId) => {
  try {
    const client = await pool.connect();
    const res = await client.query(
      'select * from transaction where id = $1 and envelope_id = $2',
      [id, envelopeId]
    );
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * 
 * Add new transaction
 */
const addTransaction = async (envelopeId, trans) => {
  try {
    trans['envelope_id'] = envelopeId;

    let queryText = 'insert into transaction (';
    let queryTextPart2 = 'values (';

    Object.entries(trans).forEach((item, index) => {
      queryText += ` ${item[0]}`;
      queryTextPart2 += ` $${index + 1}`;
      queryText += (index < Object.keys(trans).length -1) ? ',' : ')';
      queryTextPart2 += (index < Object.keys(trans).length -1) ? ',' : ')';
    });
    queryText += ' '+ queryTextPart2 +' returning *';

    let values = Object.values(trans);

    const client = await pool.connect();
    const res = await client.query(queryText, values);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * Update transaction by specific id
 */
const updateTransaction = async (id, envelopeId, trans) => {
  try {
    trans['envelope_id'] = envelopeId;

    let queryText = 'update transaction set';

    Object.entries(trans).forEach((item, index) => {
      queryText += ` ${item[0]} = $${index + 1}`;
      if (index < Object.keys(trans).length -1) queryText += ',';
    });
    queryText += ` where id = $${Object.keys(trans).length + 1} returning *`;

    let values = Object.values(trans);
    values.push(id);
    
    const client = await pool.connect();
    const res = await client.query(queryText, values);
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

/**
 * Delete transaction by specific id
 */
const deleteTransaction = async (id, envelopeId) => {
  try {
    const client = await pool.connect();
    const res = await pool.query(
      'delete from transaction where id = $1 and envelope_id = $2 returning *',
      [id, envelopeId]
    );
    client.release();
    return res.rows[0];
  } catch (er) {
    console.log(er);
  }
}

module.exports = {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction
};