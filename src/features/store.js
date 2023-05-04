import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/ProductSlice";
import CartReducer from "./slices/CartSlice";
import AuthReducer from "./slices/AuthSlice";
import AddressReduce from "./slices/AddressSlice";

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    auth: AuthReducer,
    address: AddressReduce,
  },
});

export default store;
