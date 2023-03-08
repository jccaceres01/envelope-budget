const express = require('express');
const router = express.Router();
const {
  getAllFromEnvelopes,
  getEnvelopeById,
  addToEnvelope,
  updateEnvelope,
  deleteFromEnvelopesById
} = require('../db');

router.get('/', (re, res) => {
  const envelopes = getAllFromEnvelopes();
  res.send(envelopes);
});

router.get('/:envelopeId', (req, res) => {
  const found = getEnvelopeById(req.params.envelopeId);
  if (found) {
    return res.send(found);
  } else {
    return res.status(404).send('Not found');
  }
});

router.post('/', (req, res) => {
  const envelopeData = req.body;
  const envelope = addToEnvelope(envelopeData);
  if (envelope) {
    return res.status(201).send(envelope);
  } else {
    return res.status(400).send('Cannot add new envelope');
  }
});

router.put('/:envelopeId', (req, res) => {
  const envelopeData = req.body;
  const envelope = getEnvelopeById(req.params.envelopeId);
  if (envelope) {
    const updatedEnvelope = updateEnvelope(envelope.id, envelopeData);
    if (updateEnvelope) {
      return res.status(200).send(updatedEnvelope);
    } else {
      return res.status(400).send('Error updating envelope');
    }
  } else {
    return res.status(404).send('Envelope not found');
  }
});

router.delete('/:envelopeId', (req, res) => {
  const deleted = deleteFromEnvelopesById(req.params.envelopeId);
  if (deleted) {
    return res.send(true);
  } else {
    return res.status(404).send('Not found');
  }
});

router.get('/transfer/:from/:to', (req, res) => {
  const fromEnvelope = getEnvelopeById(req.params.from);
  const toEnvelope = getEnvelopeById(req.params.to);

  if ((fromEnvelope && toEnvelope) && (fromEnvelope.id !== toEnvelope.id)) {
    if (fromEnvelope.budget > 0) {
      const totalTransfer = fromEnvelope.budget + toEnvelope.budget;
      const updatedToEnvelope = updateEnvelope(toEnvelope.id, {
        budget: totalTransfer
      });
      const updatedFromEnvelope = updateEnvelope(fromEnvelope.id, {
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

router.post('/distribution', (req, res) => {
  const envelopes = getAllFromEnvelopes();

  if (!req.body.amount || req.body.amount <= 0) return res.status(400)
    .send('Cannot perform a distribution of amount less than zero');
  
  if (envelopes.length > 0) {
    const totalToDistribute = parseFloat(req.body.amount) / envelopes.length;
    envelopes.forEach(env => {
      updateEnvelope(env.id, {
        budget: env.budget + totalToDistribute
      });
    });

    return res.json(true);
  } else {
    return res.status(404).send('No envelopes');
  }
});

module.exports = router;