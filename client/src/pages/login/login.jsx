import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUser } from "../../hooks";
import { restService } from "../../helpers";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setUser } = useUser();
  const [fields, setFields] = useState({ email: "", password: "" });

  const handleChange = (name) => (event) => {
    setFields((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = fields;

    const { data, error } = await restService.post("/users/login", {
      email,
      password,
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            autoFocus
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange("email")}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange("password")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
