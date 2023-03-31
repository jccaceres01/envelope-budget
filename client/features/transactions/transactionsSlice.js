/**
 * Transactions slice and features
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config.js';

const initialState = {
  transaction: [],
  selectedTransaction: null,
  transactionStatus: '',
  transactionErrors: [],
  transactionLoader: false
}

/**
 * Get transaction async thunk
 */
export const getAllTransaction = createAsyncThunk(
  'transaction/getAllTransaction',
  async (envelopeId) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${envelopeId}/transactions`);
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Get transaction by ID
 */
export const getTransactionById = createAsyncThunk(
  'transaction/getTransactionById',
  async ({envelopeId, transactionId}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${envelopeId}/transactions/${transactionId}`);
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * create transaction
 */
export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async ({envelopeId, transaction}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${envelopeId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    });

    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Update transaction
 */
export const updateTransaction = createAsyncThunk(
  'transaction/updateEnvelope',
  async ({envelopeId, transactionId, transaction}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${envelopeId}/transactions/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    });
    
    if (!res.ok) return Promise.reject();
    const data = await res.json();
    return data;
  }
);

/**
 * Delete transaction
 */
export const deleteTransaction = createAsyncThunk(
  'transaction/deleteEnvelope',
  async ({envelopeId, transactionId}) => {
    const res = await fetch(`${config.baseUrl}/envelopes/${envelopeId}/transactions/${transactionId}`, {
      method: 'DELETE'
    });

    if (!res.ok) return Promise.reject(res.message);
    const data = await res.json();
    return data;
  }
);

/**
 * Transactions slice create
 */
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    clearSelected: (state) => {
      state.selectedTransaction = null;
    },
    setSelectedFromState: (state, action) => {
      const foundTrans = state.transaction.find(trans => trans.id == action.payload);
      if (foundTrans) {
        state.selectedTransaction = foundTrans;
      } else {
        state.selectedTransaction = null;
      }
    }
  },
  extraReducers: (build) => {
    /**
     * getAllTransaction extra reducers
     */
    build.addCase(getAllTransaction.pending, (state) => {
      state.transactionLoader = true;
      state.transactionStatus = 'getting transaction...';
    })
    .addCase(getAllTransaction.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Transactions ready';
      state.transaction = action.payload;
    })
    .addCase(getAllTransaction.rejected, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Error getting transaction';
      state.transactionErrors = action.error;
    });

    /**
     * Get transaction by id extra reducers
     */
    build.addCase(getTransactionById.pending, (state) => {
      state.transactionLoader = true;
      state.transactionStatus = 'getting transaction...';
    })
    .addCase(getTransactionById.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Transaction Found';
      state.selectedTransaction = action.payload;
    })
    .addCase(getTransactionById.rejected, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Error getting transaction';
      state.transactionErrors = action.error;
    });

    /**
     * Add transaction extra reducers
     */
    build.addCase(addTransaction.pending, (state) => {
      state.transactionLoader = true;
      state.transactionStatus = 'Adding transaction...';
    })
    .addCase(addTransaction.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Envelope Added';
      state.transaction.push(action.payload);
    })
    .addCase(addTransaction.rejected, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Error adding transaction';
      state.transactionErrors = action.error;
    });

    /**
     * Update transaction extra reducers
     */
    build.addCase(updateTransaction.pending, (state) => {
      state.transactionLoader = true;
      state.transactionStatus = 'Updating transaction...';
    })
    .addCase(updateTransaction.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Envelope updated';
      state.transaction = state.transaction.map(transaction => {
        if (transaction.id === action.payload.id) {
          return ({
            ...transaction,
            date: action.payload.date,
            payment_amount: action.payload.payment_amount,
            payment_recipient: action.payload.payment_recipient,
            envelope_id: action.payload.envelope_id
          })
        } else {
          return transaction;
        }
      });
    })
    .addCase(updateTransaction.rejected, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Error updating transaction';
      state.transactionErrors = action.error;
    });

    /**
     * Delete transaction extra reducers
     */
    build.addCase(deleteTransaction.pending, (state) => {
      state.transactionLoader = true;
      state.transactionStatus = 'Updating transaction...';
    })
    .addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Envelope delete';
      state.transaction = state.transaction
        .filter(trans => trans.id !== action.meta.arg.transactionId);
    })
    .addCase(deleteTransaction.rejected, (state, action) => {
      state.transactionLoader = false;
      state.transactionStatus = 'Error deleting transaction';
      state.transactionErrors = action.error;
    });
  }
});

/**
 * Export transaction actions
 */

export const {
  setSelectedTransaction,
  clearSelected,
  setSelectedFromState
} = transactionsSlice.actions;

/**
 * Export transaction selectors
 */

export const transactionsSelector = state => state.transactions.transaction;
export const selectedTransactioneSelector = state => state.transactions.selectedTransaction;
export const transactionLoaderSelector = state => state.transactions.transactionLoader;
export const transactionErrorsSelector = state => state.transactions.transactionErrors;

export default transactionsSlice.reducer;
