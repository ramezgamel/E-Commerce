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
import UserLayout from "./pages/UserLayout.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserList from "./pages/admin/UserList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import DashBoard from "./pages/admin/DashBoard.jsx";
import NotFound from "./pages/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
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
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminRoute />,
          },
          {
            index: true,
            path: "dashboard",
            element: <DashBoard />,
          },
          {
            path: "orders",
            element: <OrderList />,
          },
          {
            path: "users",
            element: <UserList />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "product/:id/edit",
            element: <ProductEdit />,
          },
        ],
      },
    ],
  },
  {
    path:"*",
    element: <NotFound/>
  }
]);
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{ clientId, currency: "USD", intent: "capture" }}
          // deferLoading={true}
        >
        <ToastContainer />
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
