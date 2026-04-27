export default function UserPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}) {
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-[var(--app-border)] px-6 py-5 text-[var(--app-text-muted)] lg:flex-row lg:items-center lg:justify-between">
      <p className="text-lg">
        عرض {endItem} من {totalItems} سجل
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-6 py-3 text-xl font-semibold text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          التالي
        </button>

        <div className="flex items-center gap-3">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onChange(pageNumber)}
              className={`h-14 w-14 rounded-2xl text-xl font-semibold transition ${
                pageNumber === currentPage
                  ? 'bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] text-white'
                  : 'border border-[var(--app-border)] bg-[var(--app-panel-soft)] text-[var(--app-text-muted)] hover:bg-[var(--app-link-hover)]'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel-soft)] px-6 py-3 text-xl font-semibold text-[var(--app-text-muted)] transition hover:bg-[var(--app-link-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          السابق
        </button>
      </div>
    </div>
  );
}
