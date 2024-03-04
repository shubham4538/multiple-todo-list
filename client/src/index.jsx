import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LoginContextProvider from "./context/LoginContext.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
