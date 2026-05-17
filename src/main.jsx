import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import OneSignal from "react-onesignal";

async function initOneSignal() {
  await OneSignal.init({
    appId: "d0c25769-48c3-4bfc-a279-c9a3cad3a442",
    allowLocalhostAsSecureOrigin: true,
    promptOptions: {
      slidedown: {
        prompts: [
          {
            type: "push",
            autoPrompt: true,
            text: {
              actionMessage: "We want to notify you when a new order arrives.",
              acceptButton: "Allow",
              cancelButton: "Later",
            },
          },
        ],
      },
    },
  });

  OneSignal.showSlidedownPrompt();
}

initOneSignal();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);