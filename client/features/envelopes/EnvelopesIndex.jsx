import { useSelector } from "react-redux";
import { envelopesSelector } from "./envelopesSlice";
import Envelope from './Envelope.jsx';
import Title from '../../components/Title.jsx';

import {
  Grid,
  Box
} from '@mui/material';

const EnvelopesIndex = () => {

  const envelopes = useSelector(envelopesSelector);

  return (
    <>
    <Title>Envelopes: </Title>
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
      { envelopes.map((env, index) => {
        return (
          <Grid item key={index} xs={2} sm={4} md={4}>
            <Envelope envelope={env} key={index} />
          </Grid>
        )
      })}
    </Grid>
    </>
  );
}

export default EnvelopesIndex;