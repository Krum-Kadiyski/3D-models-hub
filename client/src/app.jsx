import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import Router from './router';
import { useUser } from './hooks/use-user';
import { clearToken, getToken, restService } from './helpers';

const App = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const accessToken = getToken();

    const getCurrentUser = async () => {
      const { data, error } = await restService.get('/users/me');

      if (!error) {
        setUser({ accessToken, ...data });
      } else {
        clearToken();
      }
    };

    if (accessToken) {
      getCurrentUser();
    }
  }, [setUser]);

  return (
    <SnackbarProvider>
      <CssBaseline />
      <Router />
    </SnackbarProvider>
  );
};

export default App;
