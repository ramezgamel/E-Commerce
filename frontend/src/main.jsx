import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import router from "./routers.jsx";
import StoreProvider from "./store/store.jsx";
import { AnimatePresence } from "framer-motion";

if (import.meta.env.VITE_ENV === 'production') { disableReactDevTools(); }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider >
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);
