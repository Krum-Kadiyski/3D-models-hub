import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import Router from './router';
import { UserProvider } from './contexts/user';
import AxiosProvider from './components/axios-provider';

const App = () => (
  <UserProvider>
    <SnackbarProvider>
      <AxiosProvider>
        <CssBaseline />
        <Router />
      </AxiosProvider>
    </SnackbarProvider>
  </UserProvider>
);

export default App;
