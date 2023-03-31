/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Title from '../../components/Title.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTransactionById, selectedTransactioneSelector, updateTransaction } from './transactionsSlice.js';
import { formatDate } from '../../utils/helpers.js';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  TextField,
  Button,
  Typography
} from '@mui/material';

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const TransactionForm = () => {

  const initalTransState = {
    date: new Date(),
    payment_amount: 0,
    payment_recipient: '',
    envelope_id: null
  };

  const [transData, setTransData] = useState(initalTransState);
  const [inputErrors, setInputErrors] = useState(false);
  const { id, transactionId } = useParams();
  const transaction = useSelector(selectedTransactioneSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateFormater = (date) => {
    try {
      if (typeof date === 'string') {
        return new Date(date).toLocaleDateString();
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    dispatch(getTransactionById({envelopeId: id, transactionId}));
  }, []);

  useEffect(() => {
    setTransData(transaction);
  }, [transaction]);

  const validate = (trans) => {
    if (!trans?.date || trans?.date.trim() === '') return false;
    if (!trans?.payment_amount || trans?.payment_amount <= 0) return false;
    if (!trans?.payment_recipient || trans?.payment_recipient.trim() === '')
      return false;
    
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    data.envelope_id = id;

    if (validate(data)) {
      dispatch(updateTransaction({envelopeId: id, transactionId, 
        transaction: data}));

      navigate(`/envelopes/${id}/transactions`);
    } else {
      setInputErrors(true);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTransData(prev => (
      {
        ...prev,
        [name]: value
      }
    ));
  }
  
  return (
    <div>
      <Title>Edit Transaction</Title>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} container spacing={2}>
            <Grid item xs={8}>
              <TextField label="Date" type="date" variant="outlined" name="date" value={formatDate(transData?.date) || ''} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={8}>
              <TextField label="Payment Amount" variant="outlined" fullWidth type="number" name="payment_amount" value={ transData?.payment_amount} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={8}>
              <TextField label="Payment Recipient" variant="outlined" fullWidth type="text" name="payment_recipient" value={transData?.payment_recipient} onChange={(e) => handleChange(e)}  />
            </Grid>
            <Grid item xs={8}>
              <Button variant="contained" type="submit" >
                <SystemUpdateAltIcon xs={{}} />
                <Typography variant="p">Update</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            { inputErrors && <h3 css={css`color: crimson;`}>* There are errors in inputs</h3>}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default TransactionForm;