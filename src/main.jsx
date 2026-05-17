import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import OneSignal from "react-onesignal";

async function initOneSignal() {
  await OneSignal.init({
    appId: "d0c25769-48c3-4bfc-a279-c9a3cad3a442",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  });
}

initOneSignal();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);