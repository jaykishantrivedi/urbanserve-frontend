import { ChevronRight, Search, X } from "lucide-react"

export default function CategoriesHeader({
  navigate,
  query,
  setQuery,
  isLoading,
  isError,
  allCategoriesLength,
  filteredLength,
}) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-blue-600 transition-colors duration-150">
            Home
          </button>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">All Categories</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-3">
              All Categories
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse Categories</h1>
            {!isLoading && !isError && (
              <p className="text-gray-500 mt-2">
                {allCategoriesLength} {allCategoriesLength === 1 ? "category" : "categories"} available
              </p>
            )}
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Filter categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {query && !isLoading && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredLength}</span> result
              {filteredLength !== 1 ? "s" : ""} for
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
              "{query}"
              <button onClick={() => setQuery("")} className="hover:text-blue-900">
                <X size={12} />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
