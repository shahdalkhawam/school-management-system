import { Download, Search, Upload } from 'lucide-react';

export default function UserToolbar({
  value,
  onChange,
  onImport,
  onExport,
  isBusy,
}) {
  return (
    <div className="rounded-[28px] border border-[var(--app-border)] bg-[var(--app-panel)] p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-3xl border border-[var(--app-border)] bg-[var(--app-search-bg)] px-5 py-4 text-[var(--app-text-muted)]">
          <Search size={22} />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-lg text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
            placeholder="ابحث عن طالب..."
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onImport}
            disabled={isBusy}
            className="flex items-center gap-3 rounded-3xl border border-emerald-500/25 bg-emerald-500/12 px-6 py-4 text-lg font-semibold text-emerald-400 transition hover:bg-emerald-500/18 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={20} />
            <span>استيراد جدول</span>
          </button>

          <button
            type="button"
            onClick={onExport}
            disabled={isBusy}
            className="flex items-center gap-3 rounded-3xl border border-[var(--app-border-strong)] bg-[var(--app-primary-soft)] px-6 py-4 text-lg font-semibold text-[var(--app-primary-strong)] transition hover:bg-[var(--app-link-active)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={20} />
            <span>تصدير بيانات</span>
          </button>
        </div>
      </div>
    </div>
  );
}
