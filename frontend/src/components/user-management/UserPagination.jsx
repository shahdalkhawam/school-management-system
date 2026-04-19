export default function UserPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-slate-400 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-lg">
        عرض {endItem} من {totalItems} {totalItems > 1 ? 'سجل' : 'سجل'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-2xl bg-white/10 px-6 py-3 text-xl font-semibold text-slate-300 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
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
                  ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
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
          className="rounded-2xl bg-white/10 px-6 py-3 text-xl font-semibold text-slate-300 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          السابق
        </button>
      </div>
    </div>
  );
}
