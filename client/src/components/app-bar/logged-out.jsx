import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LoggedOut = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => () => {
    navigate(path);
  };

  return (
    <>
      <Button variant="text" onClick={handleRedirect('/login')} sx={{ color: 'white' }}>
        Login
      </Button>
      <Button variant="text" onClick={handleRedirect('/register')} sx={{ color: 'white' }}>
        Register
      </Button>
    </>
  );
};

export default LoggedOut;
