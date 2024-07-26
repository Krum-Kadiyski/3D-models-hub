import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './contexts/user';
import App from './app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
