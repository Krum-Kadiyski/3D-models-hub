import { createContext, useCallback, useMemo, useState } from 'react';
import { clearToken, setToken } from '../helpers';

const initialUserState = {
  username: '',
  email: '',
};

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const setUserWithToken = useCallback((user) => {
    const { accessToken, ...userData } = user;

    setIsLoggedIn(true);
    setUser(userData);
    setToken(accessToken);
  }, []);

  const clearUser = useCallback(() => {
    setIsLoggedIn(false);
    setUser(initialUserState);
    clearToken();
  }, []);

  const contextValue = useMemo(
    () => ({ isLoggedin, user, clearUser, setUser: setUserWithToken }),
    [isLoggedin, user, setUserWithToken, clearUser]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
