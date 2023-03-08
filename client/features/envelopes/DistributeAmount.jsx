import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { envelopesSelector, distributeAmount, getAllEnvelopes } from './envelopesSlice';
import Title from '../../components/Title.jsx';
import {
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';

const DistributeAmount = () => {

  const [amount, setAmount] = useState(0);
  const envelopes = useSelector(envelopesSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAmount(event.target.value);
  }

  const handleDistribution = () => {
    if (parseFloat(amount) > 0) {
      dispatch(distributeAmount(amount)).then(action => {
        dispatch(getAllEnvelopes()).then(() => {
          alert('Distribution Done');
          navigate('/envelopes');
        });
      });
    } else {
      alert('Incorrect amount');
    }
  }

  return (
    <Container>
      <Grid item xs={12}>
        <Title>Distribute Amount</Title>
        <TextField label="Amount to Distribute" fullWidth sx={{marginBottom: 2 }} type="number" onChange={handleChange} value={amount} />
        <Button variant="contained" onClick={handleDistribution}>Distribute...</Button>
      </Grid>

      <Paper>
        <TableContainer sx={{ marginTop: 4 }} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan="3" align="center"><strong>Distribution check</strong></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Envelope</strong></TableCell>
                <TableCell><strong>Current Budget</strong></TableCell>
                <TableCell><strong>Budget After Distribution</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { envelopes.map((env, index) => {
                return <TableRow key={index}>
                  <TableCell>{ env.title }</TableCell>
                  <TableCell>{ env.budget } (+{parseFloat(amount / envelopes.length)})</TableCell>
                  <TableCell>{ parseFloat(env.budget) + parseFloat(amount / envelopes.length) || 0 }</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default DistributeAmount;