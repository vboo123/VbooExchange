import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

class Navbar extends Component {

  render(){
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: "black"}} position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Vboo Token Exchange
          </Typography>
          <Typography color="inherit">Welcome: {this.props.account}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
}
  export default Navbar;
