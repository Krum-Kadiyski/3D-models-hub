import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import classes from "./not-found.module.css";

const NotFoundPage = () => (
  <Typography variant="h3" className={classes.wrapper}>
    Page not found. <Link to="/">Go back home.</Link>
  </Typography>
);

export default NotFoundPage;
