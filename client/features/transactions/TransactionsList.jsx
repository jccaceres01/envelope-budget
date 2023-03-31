import { 
  Paper,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import { useDispatch } from 'react-redux';
import { transactionLoaderSelector, deleteTransaction } from './transactionsSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TransactionsList = ({transactions, envelope}) => {

  const transLoading = useSelector(transactionLoaderSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteTransaction = (envId, transId) => {
    if (confirm('Delete this record?')) {
      dispatch(deleteTransaction({envelopeId: envId, transactionId: transId}));
    }
  }

  const renderTableBody = () => {
    if (transactions.length > 0) {
      return (transactions.map((trans, index) => {
        return <TableRow key={index}>
          <TableCell>{ new Date(trans.date).toLocaleDateString() }</TableCell>
          <TableCell>{ trans.payment_amount.toFixed(2) }</TableCell>
          <TableCell>{ trans.payment_recipient}</TableCell>
          <TableCell>
            <IconButton variant="text"><SystemUpdateAltIcon onClick={() => navigate(`/envelopes/${envelope.id}/transactions/${trans.id}/edit`)} /></IconButton>
            <IconButton variant="text" color="error" onClick={() => handleDeleteTransaction(envelope.id, trans.id)}><DeleteIcon /></IconButton>
          </TableCell>
        </TableRow>
      }))
    } else {
      return (
        <TableRow>
          <TableCell>No Data</TableCell>
        </TableRow>
      )
    }
  }

  return (
    <Paper>
      <TableContainer sx={{ marginTop: 4 }} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan="4" align="center"><strong>Transactions Details</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Payment Amount</strong></TableCell>
              <TableCell><strong>Payment Recipient</strong></TableCell>
              <TableCell><strong><SettingsIcon /></strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (transLoading) 
                ? <TableRow><TableCell><Box><CircularProgress /></Box></TableCell></TableRow>
                : renderTableBody()
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TransactionsList;