import { Bell, LogOut, Menu, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Topbar({ activeItem, onOpenSidebar }) {
  const { user, logout } = useAuth();
  const displayName =
    `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'System Admin';
  const roleLabel = user?.roles?.join(', ') || 'Operations workspace';

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090612]/70 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
            Navigation
          </p>
          <h2 className="truncate text-lg font-semibold text-white">
            {activeItem.label}
          </h2>
        </div>

        <div className="hidden min-w-[280px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-400 lg:flex">
          <Search size={16} />
          <span className="text-sm">Search users, reports, settings...</span>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>

        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 sm:block">
          <p className="text-sm font-medium text-white">{displayName}</p>
          <p className="text-xs text-slate-400">{roleLabel}</p>
        </div>
      </div>
    </header>
  );
}
