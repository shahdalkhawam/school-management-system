export default function UserTabs({ tabs, activeRole, onChange }) {
  return (
    <div className="grid gap-3 rounded-[28px] border border-white/10 bg-[#201738] p-3 md:grid-cols-3">
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
                ? 'bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-lg shadow-fuchsia-900/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
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
