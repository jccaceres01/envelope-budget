import { configureStore } from '@reduxjs/toolkit';
import envelopesReducer from '../features/envelopes/envelopesSlice.js';
import transactionsReducer from '../features/transactions/transactionsSlice.js';

const store = configureStore({
  reducer: {
    envelopes: envelopesReducer,
    transactions: transactionsReducer
  }
})

export default store;
