import {
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelRightClose,
  Search,
  Sun,
} from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

export default function Topbar({
  activeItem,
  breadcrumbs,
  onOpenSidebar,
  onToggleSidebarCollapse,
  isSidebarCollapsed,
}) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const displayName =
    `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'System Admin';
  const roleLabel = user?.roles?.join(', ') || 'Operations workspace';

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--app-border)] bg-[var(--app-topbar)] backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-xl border border-[var(--app-border)] p-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)] md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <button
          type="button"
          onClick={onToggleSidebarCollapse}
          className="hidden rounded-xl border border-[var(--app-border)] p-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)] md:flex"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <PanelRightClose size={18} /> : <PanelLeftClose size={18} />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-primary)]">
            Navigation
          </p>
          <h2 className="truncate text-lg font-semibold text-[var(--app-text)]">
            {activeItem.label}
          </h2>
          <div className="mt-1 hidden items-center gap-2 text-xs text-[var(--app-text-soft)] sm:flex">
            {breadcrumbs.map((crumb, index) => (
              <div key={`${crumb}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight size={12} /> : null}
                <span>{crumb}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-w-[280px] items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-4 py-3 text-[var(--app-text-soft)] lg:flex">
          <Search size={16} />
          <span className="text-sm">Search users, reports, settings...</span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-3 text-[var(--app-text-muted)] transition hover:bg-[var(--app-primary-soft)] hover:text-[var(--app-text)]"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          className="rounded-xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-3 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-3 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>

        <div className="hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-4 py-2 sm:block">
          <p className="text-sm font-medium text-[var(--app-text)]">{displayName}</p>
          <p className="text-xs text-[var(--app-text-soft)]">{roleLabel}</p>
        </div>
      </div>
    </header>
  );
}
