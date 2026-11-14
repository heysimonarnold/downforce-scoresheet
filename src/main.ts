import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/app/App";
import store from "./store";
import "./style.css";
import { AppContextProvider } from "./store/app-context";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' was not found.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      AppContextProvider,
      null,
      React.createElement(Provider, {
        store,
        children: React.createElement(App),
      }),
    ),
  ),
);
