/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEnvelope } from './envelopesSlice';
import { css } from '@emotion/react';
import envImg from '../../images/env2.png';
import { 
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import InfoIcon from '@mui/icons-material/Info';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import WithdrawEnvelope from './WithdrawEnvelope.jsx';

const Envelope = ({envelope}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDeleteEnvelope = (id) => {
    if (confirm('Drop this envelope?')) {
      dispatch(deleteEnvelope(id));
    }

    handleClose();
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  }

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: url('${envImg}');
      background-size: cover;
      width: 300px;
      height: 300px;
      color: black;
      &:hover {
        transform: rotate(-3deg);
        transition: 100ms ease-in-out;
        cursor: pointer;
      }
    `}>
      <h3>{envelope.title}:</h3>
      <strong>{ envelope.budget.toFixed(2) } $</strong>
      <ButtonGroup size="small">
        <Button variant="contained" onClick={() => setShowDialog(true) }>withdraw</Button>
        <Button 
          variant="contained"
          id="drop-down-envelope-menu"
          onClick={handleClick}
        >
          <ArrowDropDownIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate(`/envelopes/${envelope.id}/transactions`)}>
            <InfoIcon css={css`margin-right: 4px;` }  />
            Details
          </MenuItem>
          <MenuItem onClick={() => navigate(`/envelopes/${envelope.id}/edit`)}>
            <SystemUpdateAltIcon css={css`margin-right: 4px;` }  />
            Update
          </MenuItem>
          <MenuItem onClick={() => handleDeleteEnvelope(envelope.id)}>
            <DeleteForeverIcon css={css`
              margin-right: 4px;
              color: crimson;
            `} />
            Delete
          </MenuItem>
        </Menu>
      </ButtonGroup>

      <WithdrawEnvelope open={showDialog} env={envelope} close={handleCloseDialog} />
    </div>
  );
}

export default Envelope;