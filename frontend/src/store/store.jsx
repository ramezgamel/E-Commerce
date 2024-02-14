/* eslint-disable react/prop-types */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import cartSliceReducers from "./cartSlice";
import authSliceReducer from "./authSlice";
import { Provider } from "react-redux";
import { memo } from "react";

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

const StoreProvider = memo(function StoreProvider({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
})

export default StoreProvider
