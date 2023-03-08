import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEnvelope } from './envelopesSlice';

import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Container,
  Grid
} from '@mui/material';

const WithdrawEnvelope = ({env, open, close}) => {

  const [amount, setAmount] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAmount(event.target.value);
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

    return true;
  }

  const withdrawAmount = () => {
    if (validWithdraw(amount)) {
      const data = {
        id: env.id,
        envelope: {budget: parseFloat(env.budget) - parseFloat(amount) }
      }

      dispatch(updateEnvelope(data)).then(action => {
        alert('Withdraw success');
        close();
      });
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Withdraw from <strong>{env.title}</strong>, ({env.budget}$)</DialogTitle>

      <Container spacing={3} sx={{marginBottom: 2}}>
        <Grid item xs={12}>
          <TextField type="number" label="Withdraw amount" variant="outlined" fullWidth onChange={e => handleChange(e)} onClick={() => setAlertMsg(null)} size="small" />
        </Grid>
        <Grid item>
          <Button variant="contained" size="small" fullWidth xs={{marginBottom: 2}} onClick={withdrawAmount}>WithDraw</Button>
          { alertMsg && <p style={{color: 'crimson'}}>{ alertMsg }</p>} 
        </Grid>
      </Container>
    </Dialog>
  );
}

export default WithdrawEnvelope;