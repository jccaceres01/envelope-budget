const express = require('express');
const transactionRouter = require('./transactions');
const router = express.Router();
const {
  getEnvelopes,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelope
} = require('../envelopesPersistence');

router.use('/:envelopeId/transactions', transactionRouter);

router.get('/', async (req, res) => {
  const envelopes = await getEnvelopes();
  res.send(envelopes);
});

router.get('/:envelopeId', async (req, res) => {
  const found = await getEnvelopeById(req.params.envelopeId);
  if (found) {
    return res.send(found);
  } else {
    return res.status(404).send('Not found');
  }
});

router.post('/', async (req, res) => {
  const envelopeData = req.body;
  const envelope = await addEnvelope(envelopeData);
  if (envelope) {
    return res.status(201).send(envelope);
  } else {
    return res.status(400).send('Cannot add new envelope');
  }
});

router.put('/:envelopeId', async (req, res) => {
  const envelopeData = req.body;
  const envelope = await getEnvelopeById(req.params.envelopeId);
  if (envelope) {
    const updatedEnvelope = await updateEnvelope(envelope.id, envelopeData);
    if (updateEnvelope) {
      return res.status(200).send(updatedEnvelope);
    } else {
      return res.status(400).send('Error updating envelope');
    }
  } else {
    return res.status(404).send('Envelope not found');
  }
});

router.delete('/:envelopeId', async (req, res) => {
  const deleted = await deleteEnvelope(req.params.envelopeId);
  if (deleted) {
    return res.send(true);
  } else {
    return res.status(404).send('Not found');
  }
});

router.get('/transfer/:from/:to', async (req, res) => {
  const fromEnvelope = await getEnvelopeById(req.params.from);
  const toEnvelope = await getEnvelopeById(req.params.to);

  if ((fromEnvelope && toEnvelope) && (fromEnvelope.id !== toEnvelope.id)) {
    if (fromEnvelope.budget > 0) {
      const totalTransfer = fromEnvelope.budget + toEnvelope.budget;
      const updatedToEnvelope = await updateEnvelope(toEnvelope.id, {
        budget: totalTransfer
      });
      const updatedFromEnvelope = await updateEnvelope(fromEnvelope.id, {
        budget: 0
      });
      
      return res.send([updatedToEnvelope, updatedFromEnvelope]);
    } else {
      return res.status(400).send('nothing to transfer');
    }
  } else {
    return res.status(404).send('Envelope not found or same envelope');
  }
});

router.post('/distribution', async (req, res) => {
  const envelopes = await getEnvelopes();

  if (!req.body.amount || req.body.amount <= 0) return res.status(400)
    .send('Cannot perform a distribution of amount less than zero');
  
  if (envelopes.length > 0) {
    const totalToDistribute = parseFloat(req.body.amount) / envelopes.length;
    envelopes.forEach(async env => {
      await updateEnvelope(env.id, {
        budget: env.budget + totalToDistribute
      });
    });

    return res.json(true);
  } else {
    return res.status(404).send('No envelopes');
  }
});

module.exports = router;