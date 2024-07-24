import { useContext } from 'react';
import { UserContext } from '../contexts/user';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUser must be used within the UserProvider');
  }

  return context;
};
