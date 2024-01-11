import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === "admin" ? (
    <Suspense fallback={<Loader/>}>
      <Outlet/>
    </Suspense>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default AdminRoute;
