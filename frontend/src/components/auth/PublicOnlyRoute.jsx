import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PublicOnlyRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090612] text-white">
        <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-6 text-lg text-slate-300">
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}
