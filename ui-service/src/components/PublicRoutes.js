import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const useAuth = () => {
    if (currentUser) {
      return true;
    }
  };
  const auth = useAuth();
  return auth ? <Navigate to="/users" /> : <Outlet />;
};

export default PublicRoutes;
