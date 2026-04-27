export default function UserStats({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.label}
            className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel)] px-6 py-5 shadow-[var(--app-shadow)]"
          >
            <div className="mb-8 flex items-start justify-between">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>
              <span className="text-2xl font-semibold text-emerald-400">
                {item.trend}
              </span>
            </div>
            <p className="text-xl font-semibold text-[var(--app-text-muted)]">
              {item.label}
            </p>
            <p className="mt-1 text-5xl font-semibold tracking-tight text-[var(--app-text)]">
              {item.value}
            </p>
          </article>
        );
      })}
    </div>
  );
}
