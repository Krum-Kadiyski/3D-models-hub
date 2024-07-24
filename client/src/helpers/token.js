export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
