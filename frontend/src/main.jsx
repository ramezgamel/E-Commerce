import React from "react";
import ReactDOM from "react-dom/client";
import {  RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import router from "./routers.jsx";
import StoreProvider from "./store/store.jsx";

if (import.meta.env.VITE_ENV === 'production') { disableReactDevTools(); }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider >
        <RouterProvider router={router} />
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);
