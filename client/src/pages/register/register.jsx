import { Navigate } from 'react-router-dom';
import { Register } from '../../components/register';
import { useUser } from '../../hooks/use-user';

const RegisterPage = () => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Register />;
};

export default RegisterPage;
