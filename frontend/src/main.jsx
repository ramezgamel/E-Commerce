import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import router from "./routers.jsx";
import StoreProvider from "./store/store.jsx";
import { AnimatePresence } from "framer-motion";


if (import.meta.env.VITE_ENV === 'production'){ disableReactDevTools() }
const clientId = import.meta.env.VITE_APP_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <PayPalScriptProvider
          options={{ clientId, currency: "USD", intent: "capture" }}
          // deferLoading={true}  
        >
        <StoreProvider >
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>
        </StoreProvider>
      </PayPalScriptProvider>
    </HelmetProvider>
  </React.StrictMode>
);
