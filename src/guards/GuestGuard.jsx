//

import { Navigate } from "react-router-dom";
// hooks

// routes
import useAuth from "../hooks/useAuth";
import { PATH_LANDING_APP } from "../routes/path";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_LANDING_APP.root} />;
  }

  return <>{children}</>;
}
