import { Download, Search, Upload } from 'lucide-react';

export default function UserToolbar({
  value,
  onChange,
  onImport,
  onExport,
  isBusy,
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#201738] p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-3xl bg-white/10 px-5 py-4 text-slate-300">
          <Search size={22} />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-400"
            placeholder="ابحث عن طالب..."
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onImport}
            disabled={isBusy}
            className="flex items-center gap-3 rounded-3xl bg-emerald-900/40 px-6 py-4 text-lg font-semibold text-emerald-300 transition hover:bg-emerald-800/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={20} />
            <span>استيراد جدول</span>
          </button>

          <button
            type="button"
            onClick={onExport}
            disabled={isBusy}
            className="flex items-center gap-3 rounded-3xl bg-indigo-900/40 px-6 py-4 text-lg font-semibold text-indigo-300 transition hover:bg-indigo-800/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={20} />
            <span>تصدير بيانات</span>
          </button>
        </div>
      </div>
    </div>
  );
}
