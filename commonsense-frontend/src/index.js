import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./API/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { BrowserRouter } from 'react-router-dom';

const msalInstance = new PublicClientApplication(msalConfig)
await msalInstance.initialize();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
