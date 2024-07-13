import { useState } from 'react';
import { AppBar as MuiAppBar, Box, Toolbar, IconButton } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import Search from './Search';
import Menu from './Menu';
import Logo from './Logo';

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Logo />
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <IconButton size="large" edge="end" onClick={handleMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Menu anchorEl={anchorEl} onClose={handleMenuClose} />
    </Box>
  );
};

export default AppBar;
