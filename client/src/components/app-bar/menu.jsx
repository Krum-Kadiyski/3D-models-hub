import { Menu as MuiMenu, MenuItem } from '@mui/material';
import { clearToken, restService } from '../../helpers';
import { useUser } from '../../hooks/use-user';

const Menu = ({ anchorEl, onClose }) => {
  const { clearUser } = useUser();
  const isOpen = Boolean(anchorEl);

  const handleLogout = async () => {
    const { error } = await restService.get('/users/logout');

    if (!error) {
      clearUser();
      clearToken();
      onClose();
    }
  };

  return (
    <MuiMenu
      keepMounted
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={onClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </MuiMenu>
  );
};

export default Menu;
