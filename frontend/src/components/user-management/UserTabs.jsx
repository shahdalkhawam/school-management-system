export default function UserTabs({ tabs, activeRole, onChange }) {
  return (
    <div className="grid gap-3 rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel)] p-3 md:grid-cols-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeRole === tab.role;

        return (
          <button
            key={tab.role}
            type="button"
            onClick={() => onChange(tab.role)}
            className={`flex items-center justify-center gap-3 rounded-[22px] px-6 py-5 text-xl font-semibold transition ${
              isActive
                ? 'bg-gradient-to-r from-[var(--brand-500)] to-[var(--brand-700)] text-white shadow-[var(--app-shadow)]'
                : 'text-[var(--app-text-muted)] hover:bg-[var(--app-link-hover)] hover:text-[var(--app-text)]'
            }`}
          >
            <Icon size={22} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
