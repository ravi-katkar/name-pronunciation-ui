import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function AppBarMenu() {
  return (
    
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Name Pronunciation
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          {/* <Login /> */}
          <Avatar src="../resources/avatar.png">R</Avatar>
        </Toolbar>
      </AppBar>
  );
}
