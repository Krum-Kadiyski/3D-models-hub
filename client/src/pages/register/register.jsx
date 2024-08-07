import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUser } from "../../hooks";
import { restService } from "../../helpers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn, setUser } = useUser();
  const [fields, setFields] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (name) => (event) => {
    setFields((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, username, password, repeatPassword } = fields;

    if (password !== repeatPassword) {
      return enqueueSnackbar("Passwords don't match", {
        variant: "warning",
      });
    }

    const { data, error } = await restService.post("/users/register", {
      email,
      password,
      username,
    });

    if (!error) {
      setUser(data);

      navigate("/");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                autoComplete="given-name"
                name="username"
                id="username"
                label="Username"
                value={fields.username}
                onChange={handleChange("username")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={fields.email}
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={fields.password}
                onChange={handleChange("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeatPassword"
                autoComplete="new-password"
                value={fields.repeatPassword}
                onChange={handleChange("repeatPassword")}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to="/login">Already have an account? Sign in</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
