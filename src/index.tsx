import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { AlertProvider } from "./Alert";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import config from "./config";
import "./index.css";
import { Typography } from "@mui/material";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: config.USER_POOL_CLIENT_ID || "",
      userPoolId: config.USER_POOL_ID || "",
    },
  },
});

const components = {
  Header() {
    return (
      <div className="w-100 flex justify-center items-center py-5">
        <h3 className="text-2xl">Govtech Football Tournament ⚽</h3>
      </div>
    );
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AlertProvider>
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <Authenticator components={components}>
          <App />
        </Authenticator>
      </div>
    </AlertProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
