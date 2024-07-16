import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import Router from './router';
import AppBar from './components/app-bar/app-bar';

const App = () => (
  <>
    <CssBaseline />
    <SnackbarProvider>
      <AppBar />
      <Router />
    </SnackbarProvider>
  </>
);

export default App;
