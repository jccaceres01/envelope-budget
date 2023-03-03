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
  res.json(envelopes);
});

router.get('/:envelopeId', (req, res) => {
  const found = getEnvelopeById(req.params.envelopeId);
  if (found) {
    return res.json(found);
  } else {
    return res.status(404).json('Not found');
  }
});

router.post('/', (req, res) => {
  const envelopeData = req.body;
  const envelope = addToEnvelope(envelopeData);
  if (envelope) {
    return res.status(201).json(envelope);
  } else {
    return res.status(400).json('Cannot add new envelope');
  }
});

router.put('/:envelopeId', (req, res) => {
  const envelopeData = req.body;
  const envelope = getEnvelopeById(req.params.envelopeId);
  if (envelope) {
    const updatedEnvelope = updateEnvelope(envelope.id, envelopeData);
    if (updateEnvelope) {
      return res.status(200).json(updatedEnvelope);
    } else {
      return res.status(400).json('Error updating envelope');
    }
  } else {
    return res.status(404).json('Envelope not found');
  }
});

router.delete('/:envelopeId', (req, res) => {
  const deleted = deleteFromEnvelopesById(req.params.envelopeId);
  if (deleted) {
    return res.json(true);
  } else {
    return res.status(404).json('Not found');
  }
});

module.exports = router;