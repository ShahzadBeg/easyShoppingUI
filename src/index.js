import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./features/store";
import { Provider } from "react-redux";
import { getProducts } from "./features/slices/ProductSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(getProducts());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);