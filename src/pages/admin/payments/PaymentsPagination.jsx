import { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaymentsPagination({
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
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-sm text-gray-700">
        Showing <span className="font-semibold">{startIndex}</span> to <span className="font-semibold">{endIndex}</span> of{" "}
        <span className="font-semibold">{total}</span> payments
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        {pageNumbers.map((p, i) => (
          <Fragment key={p}>
            {i > 0 && pageNumbers[i - 1] !== p - 1 && <span className="px-1 text-gray-300 text-sm">...</span>}
            <button
              type="button"
              onClick={() => onSetPage(p)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-lg transition-colors font-medium ${
                page === p
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border border-gray-300 text-gray-700 hover:bg-white"
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
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
