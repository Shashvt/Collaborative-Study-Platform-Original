import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth-Context";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  // Redirect logged-in users to the dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
