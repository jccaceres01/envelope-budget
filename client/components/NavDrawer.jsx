import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmailIcon from '@mui/icons-material/Email';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ShareIcon from '@mui/icons-material/Share';

const NavDrawer = ({anchor, open, close}) => {
  
  const navigate = useNavigate();

  const menu = [
    {
      label: 'New Envelope',
      path: '/envelopes/new',
      icon:  <AddCircleIcon />
    },
    {
      label: 'Envelopes',
      path: '/envelopes',
      icon:  <EmailIcon />
    },
    {
      label: 'Transfer Budget',
      path: '/envelopes/transfer',
      icon:  <MoveDownIcon />
    },
    {
      label: 'Distribute Between',
      path: '/envelopes/distribution',
      icon:  <ShareIcon />
    }
  ];

  const renderMenu = () => {
    return <List>
      {menu.map((menuItem, index) => {
        return (
          <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => navigate(menuItem.path)}>
              <ListItemIcon>
                { menuItem.icon }
              </ListItemIcon>
                <ListItemText primary={menuItem.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  }

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={close}
    >
      <List>
        { renderMenu() }
      </List>
    </Drawer>
  );
}

export default NavDrawer;
