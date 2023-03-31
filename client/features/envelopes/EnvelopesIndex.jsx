import { useSelector, useDispatch } from "react-redux";
import { envelopesSelector, getAllEnvelopes } from "./envelopesSlice";
import Envelope from './Envelope.jsx';
import Title from '../../components/Title.jsx';
import { useEffect } from "react";


import {
  Grid,
  Box,
  CircularProgress, Typography
} from '@mui/material';

const EnvelopesIndex = () => {

  const envelopes = useSelector(envelopesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEnvelopes());
  }, []);

  const renderEnvelopes = () => {
    if (envelopes.length > 0) {
      return ( envelopes.map((env, index) => {
        return (
          <Grid item key={index} xs={2} sm={4} md={4}>
            <Envelope envelope={env} key={index} />
          </Grid>
        )
      }))
    } else {
      return (
        <Box alignContent="center" alignItems="center">
          <Typography variant="h3" color="initial">No envelopes</Typography>
        </Box>
      );
    }
  }

  return (
    <>
    <Title>Envelopes ({envelopes.length}): </Title>
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
      { renderEnvelopes() }
    </Grid>
    </>
  );
}

export default EnvelopesIndex;