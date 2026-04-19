export default function FeaturePlaceholder({ sections }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-[24px] border border-white/10 bg-[#120e21]/80 p-5"
        >
          <p className="text-sm font-semibold text-white">{section.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {section.description}
          </p>
        </section>
      ))}
    </div>
  );
}
