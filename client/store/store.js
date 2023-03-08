import { configureStore } from '@reduxjs/toolkit';
import envelopesReducer from '../features/envelopes/envelopesSlice.js';

const store = configureStore({
  reducer: {
    envelopes: envelopesReducer
  }
})

export default store;
