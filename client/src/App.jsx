import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import Router from './router';
import { UserProvider } from './contexts/user';

const App = () => (
  <UserProvider>
    <SnackbarProvider>
      <CssBaseline />
      <Router />
    </SnackbarProvider>
  </UserProvider>
);

export default App;
