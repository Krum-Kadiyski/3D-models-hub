import { Navigate } from 'react-router-dom';
import { Login } from '../../components/login';
import { useUser } from '../../hooks/use-user';

const LoginPage = () => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Login />;
};

export default LoginPage;
