import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import config from "./config";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: config.USER_POOL_CLIENT_ID || "",
      userPoolId: config.USER_POOL_ID || "",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
