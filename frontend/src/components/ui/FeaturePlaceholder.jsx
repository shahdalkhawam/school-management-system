export default function FeaturePlaceholder({ sections }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-[24px] border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-[var(--app-shadow)]"
        >
          <p className="text-sm font-semibold text-[var(--app-text)]">
            {section.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
            {section.description}
          </p>
        </section>
      ))}
    </div>
  );
}
