import { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routes from "./routes";
import { useUser } from "./hooks";
import { clearToken, getToken, restService } from "./helpers";
import { theme } from "./theme";

const App = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const accessToken = getToken();

    const fetchCurrentUser = async () => {
      const { data, error } = await restService.get("/users/me");

      if (!error) {
        setUser({ accessToken, ...data });
      } else {
        clearToken();
      }
    };

    if (accessToken) {
      fetchCurrentUser();
    }
  }, [setUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
