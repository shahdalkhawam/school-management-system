import React from 'react';

export function NavIcon({ icon, active }) {
  return (
    <button
      className={`rounded-xl p-3 transition-all ${
        active
          ? 'bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] text-white shadow-[var(--app-shadow)]'
          : 'text-[var(--app-text-soft)] hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]'
      }`}
    >
      {icon}
    </button>
  );
}

export function StatCard({ icon, title, value, color, trend }) {
  return (
    <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-[var(--app-shadow)]">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-xs font-medium text-emerald-400">{trend}</span>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-panel-soft)] ${color}`}
        >
          <div className={color.replace('bg-', 'text-')}>{icon}</div>
        </div>
      </div>
      <div className="text-right">
        <h3 className="mb-1 text-sm text-[var(--app-text-soft)]">{title}</h3>
        <p className="text-2xl font-bold text-[var(--app-text)]">{value}</p>
      </div>
    </div>
  );
}

export function ActionBtn({ icon, color }) {
  return (
    <button
      className={`rounded-md border border-[var(--app-border)] bg-[var(--app-panel-soft)] p-1.5 transition hover:bg-[var(--app-link-hover)] ${color}`}
    >
      {icon}
    </button>
  );
}
