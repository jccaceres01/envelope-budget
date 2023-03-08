/**
 * Envelopes slice and features
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config.js';

const initialState = {
  envelopes: [],
  selectedEnvelope: null,
  envelopeStatus: '',
  envelopeErrors: [],
  envelopeLoader: false
}

/**
 * Get envelopes async thunk
 */
export const getAllEnvelopes = createAsyncThunk(
  'envelopes/getAllEnvelopes',
  async () => {
    const res = await fetch(`${config.baseUrl}/envelopes`);
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Get envelope by ID
 */
export const getEnvelopeById = createAsyncThunk(
  'envelopes/getEnvelopeById',
  async (id) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${id}`);
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * create envelope
 */
export const addEnvelopeToDatabase = createAsyncThunk(
  'envelopes/addEnvelopeToDatabase',
  async (envelope) => {
    const res = await fetch(`${config.baseUrl}/envelopes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(envelope)
    });

    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Update envelope
 */
export const updateEnvelope = createAsyncThunk(
  'envelopes/updateEnvelope',
  async ({id, envelope}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(envelope)
    });
    
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Delete envelope
 */
export const deleteEnvelope = createAsyncThunk(
  'envelopes/deleteEnvelope',
  async (id) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) return Promise.reject(res.message);
    const data = await res.json();
    return data;
  }
);

/**
 * Transfer budgetbetween envelopes
 */
export const transferBudget = createAsyncThunk(
  'envelopes/transferBudget',
  async ({from, to}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/transfer/${from}/${to}`);
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Distribute amount between envelopes
 */
export const distributeAmount = createAsyncThunk(
  'envelopes/distributeAmount',
  async (amount) => {
    const res = await fetch(`${config.baseUrl}/envelopes/distribution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount: amount})
    });
    
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Envelopes slice create
 */
const envelopesSlice = createSlice({
  name: 'envelopes',
  initialState,
  reducers: {
    setSelectedEnvelope: (state, action) => {
      state.selectedEnvelope = action.payload;
    },
    clearSelected: (state) => {
      state.selectedEnvelope = null;
    },
    setSelectedFromState: (state, action) => {
      const foundEnv = state.envelopes.find(env => env.id == action.payload);
      if (foundEnv) {
        state.selectedEnvelope = foundEnv;
      } else {
        state.selectedEnvelope = null;
      }
    }
  },
  extraReducers: (build) => {
    /**
     * getAllEnvelope extra reducers
     */
    build.addCase(getAllEnvelopes.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'getting envelopes...';
    })
    .addCase(getAllEnvelopes.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Envelopes ready';
      state.envelopes = action.payload;
    })
    .addCase(getAllEnvelopes.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error getting envelopes';
      state.envelopeErrors = action.error;
    });

    /**
     * Get envelope by id extra reducers
     */
    build.addCase(getEnvelopeById.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'getting envelope...';
    })
    .addCase(getEnvelopeById.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Envelope Found';
      state.selectedEnvelope = action.payload;
    })
    .addCase(getEnvelopeById.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error getting envelope';
      state.envelopeErrors = action.error;
    });

    /**
     * Add envelope extra reducers
     */
    build.addCase(addEnvelopeToDatabase.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'Adding envelope...';
    })
    .addCase(addEnvelopeToDatabase.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Envelope Added';
      state.envelopes.push(action.payload);
    })
    .addCase(addEnvelopeToDatabase.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error adding envelope';
      state.envelopeErrors = action.error;
    });

    /**
     * Update envelope extra reducers
     */
    build.addCase(updateEnvelope.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'Updating envelope...';
    })
    .addCase(updateEnvelope.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Envelope updated';
      state.envelopes = state.envelopes.map(envelope => {
        if (envelope.id === action.payload.id) {
          return ({
            ...envelope,
            title: action.payload.title,
            budget: action.payload.budget
          })
        } else {
          return envelope;
        }
      });
    })
    .addCase(updateEnvelope.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error updating envelope';
      state.envelopeErrors = action.error;
    });

    /**
     * Delete envelope extra reducers
     */
    build.addCase(deleteEnvelope.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'Updating envelope...';
    })
    .addCase(deleteEnvelope.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Envelope delete';
      state.envelopes = state.envelopes
        .filter(env => env.id !== action.meta.arg);
    })
    .addCase(deleteEnvelope.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error deleting envelope';
      state.envelopeErrors = action.error;
    });

    /**
     * Transfer budget from envelopes extra reducers
     */
    build.addCase(transferBudget.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'Transfering budget between envelopes...';
    })
    .addCase(transferBudget.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Budget Transfered';
      const updatedEnvelopes = action.payload;

      console.log(action);
      state.envelopes.forEach(env => {
        updatedEnvelopes.forEach(uEnv => {
          if (env.id === uEnv.id) {
            env.budget = uEnv.budget;
          }
        });
      })
    })
    .addCase(transferBudget.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error transfering envelopes';
      state.envelopeErrors = action.error;
    });

    /**
     * Distribute amount between envelopes extra reducers
     */
    build.addCase(distributeAmount.pending, (state) => {
      state.envelopeLoader = true;
      state.envelopeStatus = 'Distributing amount between envelopes...';
    })
    .addCase(distributeAmount.fulfilled, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Distribution done';
      console.log('distributed');
    })
    .addCase(distributeAmount.rejected, (state, action) => {
      state.envelopeLoader = false;
      state.envelopeStatus = 'Error distributing amount between envelopes';
      state.envelopeErrors.push(action.error);
    });
  }
});

/**
 * Export envelopes actions
 */

export const {
  setSelectedEnvelope,
  setSelectedFromState,
  clearSelected
} = envelopesSlice.actions;

/**
 * Export envelopes selectors
 */

export const envelopesSelector = state => state.envelopes.envelopes;
export const selectedEnvelopeSelector = state => state.envelopes.selectedEnvelope;
export const envelopeLoaderSelector = state => state.envelopes.envelopeLoader;
export const envelopeErrorsSelector = state => state.envelopes.envelopeErrors;

export default envelopesSlice.reducer;
