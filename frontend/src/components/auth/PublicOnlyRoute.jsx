import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

export default function PublicOnlyRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] text-[var(--app-text)]">
        <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel)] px-8 py-6 text-lg text-[var(--app-text-muted)] shadow-[var(--app-shadow)]">
          Loading...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}
