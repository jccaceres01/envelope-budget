import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  envelopesSelector,
  transferBudget
} from './envelopesSlice.js';

import { 
  Container,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';

import Title from '../../components/Title.jsx';

const Transfer = () => {
  
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const dispatch = useDispatch();
  const envelopes = useSelector(envelopesSelector);
  const navigate = useNavigate();

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }

  const handleToChange = (event) => {
    setTo(event.target.value);
  }

  const validate = (entries) => {
    if (entries?.from === entries?.to) return false;
    if (!entries) return false;
    if (!entries?.from || !entries?.to) return false;
    return true;
  }

  const transfer = () => {
    const entries = {
      from,
      to
    };

    if (validate(entries)) {
      dispatch(transferBudget(entries)).then(action => {
        navigate('/envelopes');
      });
    } else {
      alert('Invalid selection');
    }
  }

  return (
    <>
      <Container spacing="2">
        <Title>Transfer Budget</Title>

        <FormControl fullWidth style={{marginBottom: 20}}>
          <InputLabel id="transferFromId">Budget From</InputLabel>
          <Select 
            labelId="transferFromId"
            value={from} 
            label="Transfer From" 
            onChange={handleFromChange} 
            id="from"
          >
            { envelopes.map((env, index) => {
              if (parseFloat(env.budget) > 0) {
                return <MenuItem value={env.id} key={index}><strong>{ env.title }</strong>, { env.budget.toFixed(2) }</MenuItem>
              }
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{marginBottom: 20}}>
          <InputLabel id="transferFromId">Budget To</InputLabel>
          <Select 
            labelId="transferToId"
            value={to} 
            label="Transfer To" 
            onChange={handleToChange} 
            id="to"
          >
            { envelopes.map((env, index) => {
              return <MenuItem value={env.id} key={index}><strong>{ env.title }</strong>, { env.budget.toFixed(2) }</MenuItem>
            })}
          </Select>
        </FormControl>
        
        <Button variant="contained" onClick={transfer}>Transfer</Button>
      </Container>
    </>
  );
}

export default Transfer;