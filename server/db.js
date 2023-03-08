/**
 * Envelopes db
 */
const { v4 } = require('uuid');

// Default envelopes
const defaults = [
  {
    id: v4(),
    title: 'Bills',
    budget: Math.ceil(Math.random() * 1400) + 100
  },
  {
    id: v4(),
    title: 'Groceries',
    budget: Math.ceil(Math.random() * 1400) + 100
  },
  {
    id: v4(),
    title: 'Gas',
    budget: Math.ceil(Math.random() * 1400) + 100
  },
  {
    id: v4(),
    title: 'Pet care',
    budget: Math.ceil(Math.random() * 1400) + 100
  }
];

// Envelopes array
const envelopes = defaults.map(env => env);

// Validate functions
const validEnvelope = (envelope) => {
  if (!envelope.id || typeof envelope.id !== 'string') return false;
  if (!envelope.title || envelope.title.trim() === '') return false;
  if (!envelope.budget || envelope.budget <= 0) return false;

  return true;
}

/**
 * Crud functions
 */

// Get All envelopes
const getAllFromEnvelopes = () => {
  return envelopes;
}

// Find envelope by id
const getEnvelopeById = (envelopeId) => {
  const envelope = envelopes.find(env => env.id === envelopeId);
  if (!envelope) return null;
  return envelope;
}

// Add to envelopes
const addToEnvelope = (envelope) => {
  envelope.id = v4();
  if (validEnvelope(envelope)) {
    envelopes.push(envelope);
    return envelopes[envelopes.length -1];
  } else {
    console.log('Invalid envelope');
    return null;
  }
}

// Update envelopes
const updateEnvelope = (envelopeId, newEnvelopeData) => {
  const found = envelopes.find(env => env.id === envelopeId);
  console.log(newEnvelopeData);
  if (found) {
    for (key in found) {
      console.log(`key: ${key}, Value: ${found[key]}`);
      found[key] = (key in newEnvelopeData) ? newEnvelopeData[key] : found[key]
    }

    return found;
  } else {
    return null;
  }
}

// Delete envelope by id
const deleteFromEnvelopesById = envelopeId => {
  const foundIndex = envelopes.findIndex(env => env.id === envelopeId);
  if (foundIndex !== -1) {
    envelopes.splice(foundIndex, 1);
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAllFromEnvelopes,
  getEnvelopeById,
  addToEnvelope,
  updateEnvelope,
  deleteFromEnvelopesById
};