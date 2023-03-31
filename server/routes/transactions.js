const express = require('express');
const router = express.Router({mergeParams: true});
const {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require('../transactionsPersistence');

/**
 * Get all transaction
 */
router.get('/', async (req, res) => {
  const envelopeId = req.params.envelopeId;
  const transactions = await getTransactions(envelopeId);
  res.send(transactions);
});

/**
 * Get transaction by id
 */
router.get('/:transactionId', async (req, res) => {
  let { transactionId, envelopeId } = req.params;
  console.log(transactionId, envelopeId);
  const found = await getTransactionById(transactionId, envelopeId);
  if (found) {
    return res.send(found);
  } else {
    return res.status(404).send('Transaction not found');
  }
});

/**
 * Create new transaction
 */
router.post('/', async (req, res) => {
  const transData = req.body;
  const { envelopeId } = req.params;
  const trans = await addTransaction(envelopeId, transData);
  if (trans) {
    return res.status(201).send(trans);
  } else {
    return res.status(400).send('Cannot add new transaction');
  }
});

/**
 * Updated specific envelope transaction by id
 */
router.put('/:transactionId', async (req, res) => {
  const transData = req.body;
  const { transactionId, envelopeId } = req.params;

  const trans = await getTransactionById(transactionId, envelopeId);
  if (trans) {
    const updatedTrans = await updateTransaction(transactionId, envelopeId, transData);
    if (updatedTrans) {
      return res.status(200).send(updatedTrans);
    } else {
      return res.status(400).send('Error updating transaction');
    }
  } else {
    return res.status(404).send('Transaction not found');
  }
});

/**
 * Delete transaction by id
 */
router.delete('/:transactionId', async (req, res) => {
  const { envelopeId, transactionId } = req.params;
  const deleted = await deleteTransaction(transactionId, envelopeId);
  if (deleted) {
    return res.send(true);
  } else {
    return res.status(404).send('Transaction not found');
  }
});

module.exports = router;