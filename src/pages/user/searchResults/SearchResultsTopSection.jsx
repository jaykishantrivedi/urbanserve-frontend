import { ChevronRight, Home, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react"
import SearchResultsDropdown from "./SearchResultsDropdown"

export default function SearchResultsTopSection({
  navigate,
  queryCity,
  queryService,
  isLoading,
  isError,
  resultsLength,
  sortParam,
  onSortChange,
  handleSearch,
  serviceRef,
  serviceInput,
  onServiceInputChange,
  onServiceFocus,
  serviceSuggestions,
  showServices,
  onSelectService,
  cityRef,
  cityInput,
  onCityInputChange,
  onCityFocus,
  citySuggestions,
  showCities,
  onSelectCity,
  showFilters,
  onToggleFilters,
  activeFilters,
  filters,
  setFilters,
  resetFilters,
  applyFilters,
  removeFilter,
}) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <nav className="flex items-center gap-1 mb-7 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            <Home size={13} />
            <span>Home</span>
          </button>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-sm font-semibold text-gray-700 px-2 py-1">Search Results</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              {queryCity && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                  <MapPin size={11} />
                  {queryCity}
                </span>
              )}
              {queryService && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100">
                  <Search size={11} />
                  {queryService}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {queryService ? queryService : queryCity ? `Services in ${queryCity}` : "Search Results"}
            </h1>
            {!isLoading && !isError && (
              <p className="text-gray-500 mt-2 text-sm">
                {resultsLength} provider{resultsLength !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={sortParam}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 hover:border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronRight
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
            />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-4xl">
          <div ref={serviceRef} className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search a service..."
              value={serviceInput}
              onChange={(e) => onServiceInputChange(e.target.value)}
              onFocus={onServiceFocus}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
            <SearchResultsDropdown
              items={serviceSuggestions}
              visible={showServices && serviceInput.trim().length > 0}
              onSelect={onSelectService}
              renderItem={(s) => (
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">{s.serviceName}</span>
                  <span className="text-xs text-gray-400 shrink-0">{s.category?.categoryName}</span>
                </div>
              )}
            />
          </div>

          <div ref={cityRef} className="relative flex-1">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter city..."
              value={cityInput}
              onChange={(e) => onCityInputChange(e.target.value)}
              onFocus={onCityFocus}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
            <SearchResultsDropdown
              items={citySuggestions}
              visible={showCities && cityInput.trim().length > 0}
              onSelect={onSelectCity}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all shadow-sm shadow-blue-500/20 h-[50px] shrink-0"
          >
            <Search size={16} />
            Search
          </button>

          <button
            type="button"
            onClick={onToggleFilters}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all h-[50px] shrink-0 ${
              showFilters || Object.values(activeFilters).some((v) => v)
                ? "bg-blue-600 text-white shadow-md border-transparent hover:bg-blue-700"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </form>

        {showFilters && (
          <div className="mt-4 p-5 sm:p-7 bg-[#F4F7FB] rounded-3xl border border-gray-100 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range (Rs)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <span className="text-gray-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Price Type</h4>
                <div className="flex flex-wrap gap-2">
                  {["Fixed", "Hourly", "Inspection"].map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setFilters({ ...filters, priceType: filters.priceType === pt ? "" : pt })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        filters.priceType === pt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Min Rating</h4>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, minRating: filters.minRating === "4" ? "" : "4" })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                    filters.minRating === "4"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  4
                  <Star
                    size={12}
                    className={filters.minRating === "4" ? "fill-amber-500 text-amber-500" : "fill-gray-400 text-gray-400"}
                  />
                  & above
                </button>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Experience</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { l: "Any", v: "" },
                    { l: "1+ yr", v: "1" },
                    { l: "3+ yr", v: "3" },
                  ].map((ex) => (
                    <button
                      key={ex.l}
                      type="button"
                      onClick={() => setFilters({ ...filters, experience: ex.v })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        filters.experience === ex.v
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {ex.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-7 pt-5 border-t border-gray-200/60">
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {!isLoading && resultsLength > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-[15px] font-extrabold text-gray-900 mr-1">
              {resultsLength} result{resultsLength !== 1 && "s"}
            </span>
            {activeFilters.priceType && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                {activeFilters.priceType}
                <X size={12} className="cursor-pointer hover:text-indigo-900" onClick={() => removeFilter("priceType")} />
              </span>
            )}
            {activeFilters.minRating === "4" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
                Rating 4star+
                <X size={12} className="cursor-pointer" onClick={() => removeFilter("minRating")} />
              </span>
            )}
            {activeFilters.experience && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                {activeFilters.experience}+ Yrs Exp
                <X size={12} className="cursor-pointer" onClick={() => removeFilter("experience")} />
              </span>
            )}
            {(activeFilters.minPrice || activeFilters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                Rs{activeFilters.minPrice || "0"} - {activeFilters.maxPrice || "Any"}
                <X
                  size={12}
                  className="cursor-pointer"
                  onClick={() => {
                    removeFilter("minPrice")
                    removeFilter("maxPrice")
                  }}
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
