import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./features/store";
import { Provider } from "react-redux";
import { getProducts } from "./features/slices/ProductSlice";
import { getTotal } from "./features/slices/CartSlice";
import { fillUserData } from "./features/slices/AuthSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(getProducts());
store.dispatch(getTotal());
store.dispatch(fillUserData());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
