import { useState } from 'react';
import { AppBar as MuiAppBar, Box, Toolbar, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Search from './search';
import Menu from './menu';
import Logo from './logo';
import LoggedIn from './logged-in';
import LoggedOut from './logged-out';
import { useUser } from '../../hooks/use-user';

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useUser();

  const isLoggedIn = Boolean(user.token);

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
          {isLoggedIn ? <LoggedIn onMenuOpen={handleMenuOpen} /> : <LoggedOut />}
        </Toolbar>
      </MuiAppBar>
      <Menu anchorEl={anchorEl} onClose={handleMenuClose} />
    </Box>
  );
};

export default AppBar;
