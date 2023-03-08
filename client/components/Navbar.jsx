import React, { useState } from 'react';
import { envelopeLoaderSelector } from '../features/envelopes/envelopesSlice.js';
import { useSelector } from 'react-redux';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import NavDrawer from './NavDrawer.jsx';


const Navbar = () => {

  const [showDrawer, setShowDrawer] = useState(false);
  const loading = useSelector(envelopeLoaderSelector);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{marginBottom: 6}} color="info">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={() => toggleDrawer() }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Envelope Budget
          </Typography>

          { loading && <CircularProgress color="inherit"  /> }
        </Toolbar>
      </AppBar>

      <NavDrawer anchor="left" open={showDrawer} close={toggleDrawer} />
    </React.Fragment>
  );
}

export default Navbar;