
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import "./index.css";
import App from "./App";
import store from "./redux/reduxStore";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";

let rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

rerenderEntireTree()

store.subscribe(() => {
  rerenderEntireTree();
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
