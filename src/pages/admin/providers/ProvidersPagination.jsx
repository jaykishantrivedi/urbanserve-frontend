import { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProvidersPagination({
  isLoading,
  total,
  startIndex,
  endIndex,
  page,
  totalPages,
  pageNumbers,
  onPrevious,
  onNext,
  onSetPage,
}) {
  if (isLoading || total <= 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-800">{startIndex}–{endIndex}</span> of{" "}
        <span className="font-semibold text-gray-800">{total}</span> providers
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        {pageNumbers.map((p, i) => (
          <Fragment key={p}>
            {i > 0 && pageNumbers[i - 1] !== p - 1 && <span className="px-1 text-gray-300 text-sm">…</span>}
            <button
              type="button"
              onClick={() => onSetPage(p)}
              className={`w-8 h-8 text-sm rounded-lg transition-colors font-medium ${
                page === p
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-gray-200 text-gray-600 hover:bg-white"
              }`}
            >
              {p}
            </button>
          </Fragment>
        ))}

        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
