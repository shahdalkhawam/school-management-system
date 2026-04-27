import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../config/navigation';

function SidebarLink({ item, onClick, isCollapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center rounded-2xl border px-4 py-3 transition ${
          isActive
            ? 'border-[var(--app-border-strong)] bg-[var(--app-link-active)] text-[var(--app-text)] shadow-[var(--app-shadow)]'
            : 'border-transparent text-[var(--app-text-muted)] hover:border-[var(--app-border)] hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]'
        } ${isCollapsed ? 'justify-center px-2' : 'gap-3'}`
      }
      title={isCollapsed ? item.label : undefined}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--app-link-icon)] text-[var(--app-text)] transition group-hover:bg-[var(--app-primary-soft)]">
        <Icon size={18} />
      </span>
      {!isCollapsed ? (
        <span className="min-w-0">
          <span className="block text-sm font-medium">{item.label}</span>
          <span className="block truncate text-xs text-[var(--app-text-soft)]">
            {item.description}
          </span>
        </span>
      ) : null}
    </NavLink>
  );
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[var(--app-overlay)] transition md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[var(--app-border)] bg-[var(--app-sidebar)] px-4 py-5 backdrop-blur transition-[width,transform] duration-300 md:static md:translate-x-0 ${
          isCollapsed ? 'md:w-24' : 'md:w-80'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--app-primary)]">
              School OS
            </p>
            {!isCollapsed ? (
              <h1 className="mt-2 text-xl font-semibold text-[var(--app-text)]">
                Admin Workspace
              </h1>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-xl border border-[var(--app-border)] p-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)] md:flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <PanelRightClose size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--app-border)] p-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)] md:hidden"
              aria-label="Close sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        </div>

        {!isCollapsed ? (
          <div className="mb-6 rounded-3xl border border-[var(--app-border)] bg-[var(--app-sidebar-hero)] p-4">
            <p className="text-sm font-medium text-[var(--app-text)]">Platform foundation</p>
            <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
              Shared layout, navigation, and routed feature pages are all connected
              now, so each module can grow independently.
            </p>
          </div>
        ) : null}

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {navigationItems.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              onClick={onClose}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {!isCollapsed ? (
          <div className="mt-6 rounded-3xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-4">
            <p className="text-sm font-medium text-[var(--app-text)]">Next build target</p>
            <p className="mt-2 text-sm text-[var(--app-text-soft)]">
              Start with User Management, then reuse the same page patterns across
              the other sections.
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
