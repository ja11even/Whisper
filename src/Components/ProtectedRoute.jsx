import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
import { useEffect } from "react";
import FullPageLoader from "./FullPageLoader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoadingUser, user, isAuthenticated } = useUser();
  useEffect(() => {
    if (isLoadingUser) return;

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [user, isAuthenticated, isLoadingUser, navigate]);
  if (isLoadingUser) return <FullPageLoader />;
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
