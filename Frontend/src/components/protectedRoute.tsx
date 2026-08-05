import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth-Context";

interface ProtectedRouteProps {
  children: ReactNode; // ReactNode is used for the children prop to allow any valid React element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthContext();

  // Redirect to auth page if user is not authenticated
  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
