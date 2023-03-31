import { useEffect } from 'react';
import Title from '../../components/Title.jsx';
import SubTitle from '../../components/SubTitle.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectedEnvelopeSelector, getEnvelopeById } from './envelopesSlice.js';
import { transactionsSelector, getAllTransaction } from '../transactions/transactionsSlice';
import { useParams } from 'react-router-dom';
import TransactionsList from '../transactions/TransactionsList.jsx';

const EnvelopeDetail = () => {

  const { id } = useParams();
  const envelope = useSelector(selectedEnvelopeSelector);
  const transactions = useSelector(transactionsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getEnvelopeById(id));
      dispatch(getAllTransaction(id));
    }

  }, [id, dispatch]);

  return (
    <>
      <Title>Envelope Details</Title>
      <SubTitle>For Envelope: { envelope?.title } ({ envelope?.budget.toFixed(2)}$)</SubTitle>

      <TransactionsList transactions={transactions} envelope={envelope} />
    </>
  );
}

export default EnvelopeDetail;