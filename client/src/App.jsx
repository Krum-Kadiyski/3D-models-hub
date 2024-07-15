import CardActionArea from './components/card/CardActionArea';
import { AppBar } from './components/app-bar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/login/login';
import Dashboard from './components/Dashboard/Dashboard';
import Viewer from './components/model-viewer/model-viewer';
import { CssBaseline } from '@mui/material';

const App = () => (
  <>
    <CssBaseline />
    <AppBar />
    <SignUp />
    <SignIn />
    {/* <Dashboard /> */}
    {/* <Viewer /> */}
  </>
);

export default App;
