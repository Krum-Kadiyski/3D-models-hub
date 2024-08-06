import { useMatch } from "react-router-dom";
import {
  Divider,
  List,
  ListItemButton,
  ListSubheader,
  useTheme,
} from "@mui/material";
import ViewInArSharpIcon from "@mui/icons-material/ViewInArSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { useUser } from "../../hooks";
import { restService } from "../../helpers";
import MenuItem from "./menu-item";
import ModelsPageDetails from "./models-page-details";

const modelsMenu = (isLoggedIn) => [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardSharpIcon />,
  },
  {
    title: "Models",
    path: "/models",
    icon: <ViewInArSharpIcon />,
  },
  {
    title: "Create model",
    path: "/create-model",
    hidden: !isLoggedIn,
    icon: <AddCircleOutlineSharpIcon />,
  },
];

const userMenu = ({ isLoggedIn, user, handleLogout }) => [
  {
    title: "Login",
    path: "/login",
    hidden: isLoggedIn,
    icon: <LoginSharpIcon />,
  },
  {
    title: "Register",
    path: "/register",
    hidden: isLoggedIn,
    icon: <HowToRegSharpIcon />,
  },
  {
    title: "Profile",
    path: `/profile/${user.username}`,
    hidden: !isLoggedIn,
    icon: <AccountCircleSharpIcon />,
  },
  {
    title: "Logout",
    hidden: !isLoggedIn,
    icon: <LogoutSharpIcon />,
    component: ListItemButton,
    onClick: handleLogout,
  },
];

const Menu = () => {
  const isModelsPage = useMatch("/models");
  const theme = useTheme();
  const { isLoggedIn, user, clearUser } = useUser();

  const handleLogout = async () => {
    const { error } = await restService.post("/users/logout");

    if (!error) {
      clearUser();
    }
  };

  const modelsMenuList = modelsMenu(isLoggedIn);
  const userMenuList = userMenu({ isLoggedIn, user, handleLogout });

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            sx={{
              bgcolor: "transparent",
              color: theme.palette.primary.main,
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: "bold",
              lineHeight: 1,
              marginLeft: 1,
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            Models
          </ListSubheader>
        }
        sx={{
          bgcolor: "#f7f9fc",
          overflow: "auto",
        }}
      >
        {modelsMenuList
          .filter(({ hidden }) => !hidden)
          .map(({ title, path, icon }) => (
            <MenuItem key={path} to={path} icon={icon}>
              {title}
            </MenuItem>
          ))}
      </List>
      <Divider sx={{ m: 2 }} />
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            sx={{
              bgcolor: "transparent",
              color: theme.palette.primary.main,
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: "bold",
              lineHeight: 1,
              marginLeft: 1,
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            User{isLoggedIn && `: ${user.username}`}
          </ListSubheader>
        }
        sx={{
          bgcolor: "#f7f9fc",
          overflow: "auto",
        }}
      >
        {userMenuList
          .filter(({ hidden }) => !hidden)
          .map(({ title, path, icon, ...rest }) => (
            <MenuItem key={title} to={path} icon={icon} {...rest}>
              {title}
            </MenuItem>
          ))}
      </List>
      {isModelsPage && <ModelsPageDetails />}
    </>
  );
};

export default Menu;
