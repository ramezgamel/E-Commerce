import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import cartSliceReducers from "./cartSlice";
import authSliceReducer from "./authSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducers,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
