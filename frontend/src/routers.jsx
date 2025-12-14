/* eslint-disable react-refresh/only-export-components */
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy } from "react";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
import Addresses from "./pages/Profile/Addresses.jsx";
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const Coupon = lazy(() => import("./pages/admin/Coupon.jsx"));
const UserOrders = lazy(() => import("./pages/Profile/UserOrders.jsx"));
const WishList = lazy(() => import("./pages/Profile/WishList.jsx"));
const Personal = lazy(() => import("./pages/Profile/Personal.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const Profile = lazy(() => import("./pages/Profile"));
const Shipping = lazy(() => import("./pages/user/Shipping.jsx"));
const Payment = lazy(() => import("./pages/user/Payment.jsx"));
const PlaceOrder = lazy(() => import("./pages/user/PlaceOrder.jsx"));
const Order = lazy(() => import("./pages/Order.jsx"));
const UserList = lazy(() => import("./pages/admin/UserList.jsx"));
const OrderList = lazy(() => import("./pages/admin/OrderList.jsx"));
const ProductList = lazy(() => import("./pages/admin/ProductList.jsx"));
const CreateNotification = lazy(() => import("./pages/admin/CreateNotification.jsx"));
const CategoryList = lazy(() => import("./pages/admin/CategoryList.jsx"));
const Home = lazy(() => import('./pages/Home.jsx'));
const UserLayout = lazy(() => import('./pages/user/UserLayout.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="/" element={<PrivateRoute restrictTo={["user", "admin"]} />}>
          <Route path="order/:id" element={<Order />} />
        </Route>
        <Route path="/" element={<PrivateRoute restrictTo={"user"} />}>
          <Route path="profile" element={<Profile />}>
            <Route index element={<Personal />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishList" element={<WishList />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
          <Route path="shipping" element={<Shipping />} />
          <Route path="payment" element={<Payment />} />
          <Route path="placeorder" element={<PlaceOrder />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<PrivateRoute restrictTo={"admin"} />} />
        <Route path="users" element={<UserList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="notifications" element={<CreateNotification />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="coupons" element={<Coupon />} />
      </Route>
      <Route path="auth" element={<Auth />} />
      <Route path="resetPassword" element={<ResetPassword />} />
    </Route>
  )
);

export default router;