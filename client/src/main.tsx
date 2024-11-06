import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./providers/userProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
      <Toaster richColors position="bottom-right" />
    </UserProvider>
  </StrictMode>,
);
