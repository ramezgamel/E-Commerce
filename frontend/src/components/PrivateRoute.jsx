/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "./common/Loader";


function PrivateRoute({ restrictTo = [] }) {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo &&
    restrictTo.includes(userInfo.role) ?
    <Suspense fallback={<Loader />} state={{ from: location.from }}>
      <Outlet />
    </Suspense>
    : <Navigate to="/auth" replace />;
}

export default PrivateRoute;
