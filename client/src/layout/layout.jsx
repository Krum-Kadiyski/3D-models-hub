import { Outlet } from "react-router-dom";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { Menu } from "./menu";

const Layout = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Paper
            square
            sx={{
              bgcolor: "#f7f9fc",
              height: "100vh",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                pt: 2,
                cursor: "pointer",
                color: theme.palette.primary.main,
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                transition: "text-shadow 0.5s",
                "&:hover": {
                  textShadow: "10px 10px 2px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              3D Models Hub
            </Typography>
            <Menu />
          </Paper>
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={9}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                pb: 5,
                minWidth: 600,
                display: "flex",
                justifyContent: "center",
                flex: 1,
                overflow: "auto",
                height: "92vh",
              }}
            >
              <Outlet />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
