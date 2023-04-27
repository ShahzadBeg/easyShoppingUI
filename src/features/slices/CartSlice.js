import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
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
        // toast.info(`${state.cartItems[getIndex].name} increased`, {
        //   position: "bottom-left",
        // });
      } else {
        const tempProduct = { ...action.payload, Quantity: 1 };
        state.cartItems.push(tempProduct);
        // toast.success(`${tempProduct.name} added into cart`, {
        //   position: "bottom-left",
        // });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} remove from cart`, {
        position: "bottom-left",
      });
    },
    decreseCart(state, action) {
      const getIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[getIndex].Quantity > 1) {
        state.cartItems[getIndex].Quantity -= 1;
      } else {
        const restCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = restCartItem;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state, action) {
      let { total, totalQuantity } = state.cartItems.reduce(
        (cardTotal, cartItem) => {
          const { price, Quantity } = cartItem;
          const itemTotal = price * Quantity;

          cardTotal.total += itemTotal;
          cardTotal.totalQuantity += Quantity;
          return cardTotal;
        },
        {
          total: 0,
          totalQuantity: 0,
        }
      );
      state.cartTotalQuantity = totalQuantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreseCart, clearCart, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
