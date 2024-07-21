/* eslint-disable react/prop-types */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSliceReducer from "./authSlice";
import { Provider } from "react-redux";
import { memo } from "react";
import offlineSlice from "./offlineSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    offline: offlineSlice,
    auth: authSliceReducer,
  },  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const StoreProvider = memo(function StoreProvider({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
})

export default StoreProvider
