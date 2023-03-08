import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addEnvelopeToDatabase, 
  setSelectedEnvelope,
  updateEnvelope,
  clearSelected,
  setSelectedFromState,
  selectedEnvelopeSelector
} from './envelopesSlice.js';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { 
  Grid,
  Button,
  TextField
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateIcon from '@mui/icons-material/Update';

const NewEnvelope = () => {

  const initialState = {
    title: '',
    budget: 0
  };

  const [envelope, setEnvelope] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedEnvelope = useSelector(selectedEnvelopeSelector);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(setSelectedFromState(id));
    } else {
      dispatch(clearSelected());
    }
  }, [id]);

  useEffect(() => {
    if (selectedEnvelope) {
      setEnvelope(selectedEnvelope);
    } else {
      setEnvelope(initialState);
    }
  }, [selectedEnvelope])

  const handleChange = (event) => {
    setEnvelope(prev => (
      {
        ...prev,
        [event.target.name]: event.target.value
      }
    ));
  }

  const validateEntries = (entries) => {
    if (!entries?.title || entries?.title.trim() === '') return false;
    if (!entries?.budget || entries?.budget <= 0) return false;
    return true;
  }

  const addNewEnvelope = () => {
    if (validateEntries(envelope)) {
      dispatch(addEnvelopeToDatabase(envelope)).then(action => {
        dispatch(setSelectedEnvelope(action.payload));
        alert('Envelope Added');
        navigate('/envelopes');
      });
    } else {
      alert('There is a problem with the data imput');
    }
  }

  const handleUpdateEnvelope = () => {
    if (validateEntries(envelope)) {
      const data = {
        id,
        envelope
      };

      dispatch(updateEnvelope(data)).then(action => {
        alert('Envelope updated');
        navigate('/envelopes');
      });
    } else {
      alert('There is a problem with the data imput');
    }
  }

  return (
    <>
      <Title>
        { selectedEnvelope ? 'Update Envelope' : 'New Envelope' }
        <AddBoxIcon />
      </Title>

      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField label="Title" variant="outlined" fullWidth type="text" name="title" value={envelope.title} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Budget" variant="outlined" fullWidth type="number" name="budget" value={envelope.budget} onChange={handleChange}  />
        </Grid>
        <Grid item xs={6} >
          { !selectedEnvelope && <Button variant="contained" color="inherit" sx={{mr: 2}} onClick={() => setEnvelope(initialState)}>
            <HighlightOffIcon sx={{mr: 1}} />
            Clear
          </Button>}
          
          {
            (selectedEnvelope) ?
              <Button variant="contained" onClick={handleUpdateEnvelope}>
                <UpdateIcon sx={{mr: 1}} />
                Update
              </Button>
            : 
              <Button variant="contained" onClick={addNewEnvelope}>
                <AddCircleIcon sx={{mr: 1}} />
                Add
              </Button>
            }
        </Grid>
      </Grid>
    </>
  );
}

export default NewEnvelope;
