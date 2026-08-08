import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/ui/Spinner";

export default function PublicRoute() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-ink-50 dark:bg-ink-950">
        <Spinner size={28} />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
