import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEnvelope } from './envelopesSlice';
import { addTransaction } from '../transactions/transactionsSlice';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@mui/material';

const WithdrawEnvelope = ({env, open, close}) => {

  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  }

  const validWithdraw = (amount) => {
    if (parseFloat(amount) <= 0 ) {
      setAlertMsg('Cannot withdraw 0');
      return false;
    }

    if (parseFloat(amount) > parseFloat(env.budget)) {
      setAlertMsg('Cannot withdraw more than the available budget');
      return false;
    }

    if (recipient.trim().length == 0) {
      setAlertMsg('Recipient cannot be null');
      return false;
    }

    return true;
  }

  const withdrawAmount = () => {
    if (validWithdraw(amount)) {

      const data = {
        id: env.id,
        envelope: {budget: parseFloat(env.budget) - parseFloat(amount) }
      };

      const transData = {
        date: new Date(),
        payment_amount: amount,
        payment_recipient: recipient,
        envelope_id: env.id
      };

      dispatch(updateEnvelope(data));
      dispatch(addTransaction({envelopeId: env.id, transaction: transData}));
      
      alert('Withdraw success');
      close();
    }
  }

  return (
    <Dialog open={open} onClose={close}>
        <DialogTitle>Withdraw from <strong>{env.title}</strong>, ({env.budget.toFixed(2)}$)</DialogTitle>
        <DialogContent>
          <TextField type="number" label="Withdraw amount" variant="outlined" fullWidth onChange={e => handleAmountChange(e)} onClick={() => setAlertMsg(null)} size="small" sx={{marginTop: 2}} />
          <TextField type="text" label="Withdraw recipient" variant="outlined" fullWidth onChange={e => handleRecipientChange(e)} onClick={() => setAlertMsg(null)} size="small" sx={{marginTop: 2, marginBottom: 2}} />
          <Button variant="contained" size="small" fullWidth xs={{marginBottom: 2}} onClick={withdrawAmount}>WithDraw</Button>
          { alertMsg && <p style={{color: 'crimson'}}>{ alertMsg }</p>} 
        </DialogContent>
    </Dialog>
  );
}

export default WithdrawEnvelope;