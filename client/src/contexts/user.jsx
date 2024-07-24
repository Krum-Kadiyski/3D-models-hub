import { createContext, useCallback, useMemo, useState } from 'react';

const initialState = {
  token: null,
  username: '',
};

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const clearUser = useCallback(() => setUser(initialState), []);

  const contextValue = useMemo(() => ({ user, setUser, clearUser }), [user, setUser, clearUser]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
