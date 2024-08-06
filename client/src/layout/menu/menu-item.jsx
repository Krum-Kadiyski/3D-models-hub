import { NavLink } from "react-router-dom";
import { ListItemButton, ListItemIcon } from "@mui/material";

const MenuItem = ({ children, icon, component = NavLink, ...rest }) => (
  <ListItemButton component={component} {...rest}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    {children}
  </ListItemButton>
);

export default MenuItem;
