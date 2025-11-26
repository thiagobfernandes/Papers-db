import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "./lib/auth-context.tsx";
import { MessageProvider } from "./lib/message-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <AuthProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </AuthProvider>
    </Theme>
  </StrictMode>
);
