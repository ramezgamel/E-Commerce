/* eslint-disable react-refresh/only-export-components */
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import {lazy } from "react";
import App from "./App.jsx";
import Auth from "./pages/Auth.jsx";
const ResetPassword =lazy(()=>import( "./pages/ResetPassword.jsx"));
const ProductDetails =lazy(()=>import( "./pages/ProductDetails.jsx"));
const PrivateRoute =lazy(()=>import( "./components/PrivateRoute.jsx"));
const Profile =lazy(()=>import( "./pages/Profile.jsx"));
const Shipping =lazy(()=>import( "./pages/Shipping.jsx"));
const Payment =lazy(()=>import( "./pages/Payment.jsx"));
const PlaceOrder =lazy(()=>import( "./pages/PlaceOrder.jsx"));
const Order =lazy(()=>import( "./pages/Order.jsx"));
const UserList =lazy(()=>import( "./pages/admin/UserList.jsx"));
const AdminRoute =lazy(()=>import( "./components/AdminRoute.jsx"));
const OrderList =lazy(()=>import( "./pages/admin/OrderList.jsx"));
const ProductList =lazy(()=>import( "./pages/admin/ProductList.jsx"));
const CreateNotification =lazy(()=>import( "./pages/admin/CreateNotification.jsx"));
const CategoryList =lazy(()=>import( "./pages/admin/CategoryList.jsx"));
const ProductEdit =lazy(()=>import( "./pages/admin/ProductEdit.jsx"));
const Home = lazy(()=>import('./pages/Home.jsx'));
const UserLayout = lazy(()=>import('./pages/UserLayout.jsx'));
const AdminLayout = lazy(()=>import('./pages/admin/AdminLayout.jsx'));
const Cart = lazy(()=>import('./pages/Cart.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="profile" element={<Profile/>}/> 
          <Route path="shipping" element={<Shipping/>} />
          <Route path="payment" element={<Payment/>} />
          <Route path="placeorder" element={<PlaceOrder/>} />
          <Route path="order/:id" element={<Order/>} />
        </Route>
        <Route path="/cart" element={ <Cart/> }/>
      </Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminRoute/>}/>
        <Route path="users" element={<UserList/>}/>
        <Route path="orders" element={<OrderList/>}/>
        <Route path="products" element={<ProductList/>}/>
        <Route path="notifications" element={<CreateNotification/>}/>
        <Route path="categories" element={<CategoryList/>}/>
        <Route path="product/:id/list" element={<ProductEdit/>}/>
      </Route>
      <Route path="auth" element={ <Auth/> }/>
      <Route path="resetPassword" element={<ResetPassword/>} />
    </Route>
  )
);
export default router