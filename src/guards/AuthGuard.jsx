//

import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
// pages
import useAuth from "../hooks/useAuth";
import Login from "../pages/auth/Login";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <div class="spinner"></div>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
