import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const getIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (getIndex >= 0) {
        state.cartItems[getIndex].Quantity += 1;
        toast.info(`${state.cartItems[getIndex].name} increased`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, Quantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${tempProduct.name} added into cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
