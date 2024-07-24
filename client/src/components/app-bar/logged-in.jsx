import { Box, IconButton, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useUser } from '../../hooks/use-user';

const LoggedIn = ({ onMenuOpen }) => {
  const { user } = useUser();
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography>{user.username}</Typography>
      <IconButton size="large" edge="end" onClick={onMenuOpen} color="inherit">
        <AccountCircle />
      </IconButton>
    </Box>
  );
};

export default LoggedIn;
