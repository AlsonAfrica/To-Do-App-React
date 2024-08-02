import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [openDialog, setOpenDialog] = useState(false); 

  // const [form, setForm] = useState({
  //   username: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  const [form, setForm] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
   
    console.log('Form submitted:', form);
    handleCloseDialog(); 
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Profile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleOpenDialog}>
              <ListItemIcon>
                {index % 2 === 0 ? <CgProfile /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} style={{color:"#4caf50", backgroundColor:"#4caf50"}}>{anchor}<FaUserEdit className='icon' title="profile" /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      {/* Dialog for Profile Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Your Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={form.username}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={form.password}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
