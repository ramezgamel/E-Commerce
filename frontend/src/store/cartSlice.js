import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      itemsPrice: 0,
      itemsQuantity: 0,
      shippingPrice: 0,
      tax: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isExist = state.cartItems.find((i) => i?._id === item?._id);
      if (isExist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === isExist._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== id);
      return updateCart(state);
    },
  },
});
export const { addToCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
