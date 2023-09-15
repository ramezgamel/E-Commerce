import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import NewProduct from "./pages/NewProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Shipping from "./pages/Shipping.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Order from "./pages/Order.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderList from "./pages/OrderList.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/new",
        element: <NewProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/shipping",
            element: <Shipping />,
          },
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "/order/:id",
            element: <Order />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            path: "/orderList",
            element: <OrderList />,
          },
        ],
      },
    ],
  },
]);
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{ clientId, currency: "USD" }}
        // deferLoading={true}
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
