import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfirmProvider } from "material-ui-confirm";
import { UserProvider } from "./contexts/user";
import App from "./app";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </UserProvider>
  </StrictMode>
);
