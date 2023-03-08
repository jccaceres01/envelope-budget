import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllEnvelopes } from "./features/envelopes/envelopesSlice.js";

import { 
  Container,
} from '@mui/material';

import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEnvelopes());
  }, []);

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer></footer>
    </>
  )
}
export default App;