import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
