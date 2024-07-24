import { Outlet } from 'react-router-dom';
import AppBar from './components/app-bar/app-bar';

const AppLayout = () => (
  <>
    <AppBar />
    <Outlet />
  </>
);

export default AppLayout;
