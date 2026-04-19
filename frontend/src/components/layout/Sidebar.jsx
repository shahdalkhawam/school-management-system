import { PanelLeftClose } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../config/navigation';

function SidebarLink({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
          isActive
            ? 'border-fuchsia-500/40 bg-gradient-to-r from-fuchsia-600/20 to-cyan-400/10 text-white shadow-lg shadow-fuchsia-900/20'
            : 'border-transparent text-slate-300 hover:border-white/8 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-200 transition group-hover:bg-white/10">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{item.label}</span>
        <span className="block truncate text-xs text-slate-400">
          {item.description}
        </span>
      </span>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 transition md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-white/10 bg-[#0d0a18]/95 px-4 py-5 backdrop-blur transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              School OS
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white">
              Admin Workspace
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="mb-6 rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-sky-300/5 to-transparent p-4">
          <p className="text-sm font-medium text-white">Platform foundation</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Shared layout, navigation, and routed feature pages are all connected
            now, so each module can grow independently.
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {navigationItems.map((item) => (
            <SidebarLink key={item.path} item={item} onClick={onClose} />
          ))}
        </nav>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-white">Next build target</p>
          <p className="mt-2 text-sm text-slate-400">
            Start with User Management, then reuse the same page patterns across
            the other sections.
          </p>
        </div>
      </aside>
    </>
  );
}
