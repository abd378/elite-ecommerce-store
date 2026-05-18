import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

window.OneSignalDeferred = window.OneSignalDeferred || [];

window.OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: "d0c25769-48c3-4bfc-a279-c9a3cad3a442",
    serviceWorkerPath: "OneSignalSDKWorker.js",
    serviceWorkerUpdaterPath: "OneSignalSDKUpdaterWorker.js",
    notifyButton: {
      enable: true,
    },
  });
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);