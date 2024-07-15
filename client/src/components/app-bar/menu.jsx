import { Menu as MuiMenu, MenuItem } from '@mui/material';

const Menu = ({ anchorEl, onClose }) => {
  const isOpen = Boolean(anchorEl);

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
    </MuiMenu>
  );
};

export default Menu;
