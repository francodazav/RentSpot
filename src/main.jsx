import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "../src/userContext/userContext.jsx";
import { SpotsProvider } from "./userContext/spotsContex.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <SpotsProvider>
      <App />
    </SpotsProvider>
  </UserProvider>
);
