const PRICE_TYPES = ['Fixed', 'Hourly', 'Inspection']
const EXPERIENCE_OPTIONS = [
  { label: 'Any', value: '' },
  { label: '1+ yr', value: '1' },
  { label: '3+ yr', value: '3' },
]

const ProviderFiltersPanel = ({
  show,
  filters,
  setFilters,
  onReset,
  onApply,
}) => {
  if (!show) return null

  return (
    <div className="mt-4 p-5 sm:p-7 bg-[#F4F7FB] rounded-3xl border border-gray-100 animate-slide-down">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range (INR)</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(event) => setFilters({ ...filters, minPrice: event.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
            <span className="text-gray-300">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Price Type</h4>
          <div className="flex flex-wrap gap-2">
            {PRICE_TYPES.map((priceType) => (
              <button
                key={priceType}
                onClick={() => setFilters({ ...filters, priceType: filters.priceType === priceType ? '' : priceType })}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  filters.priceType === priceType
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {priceType}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Min Rating</h4>
          <button
            onClick={() => setFilters({ ...filters, minRating: filters.minRating === '4' ? '' : '4' })}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border flex items-center gap-1.5 ${
              filters.minRating === '4'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            4 star and above
          </button>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Experience</h4>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_OPTIONS.map((option) => (
              <button
                key={option.label}
                onClick={() => setFilters({ ...filters, experience: option.value })}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  filters.experience === option.value
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-7 pt-5 border-t border-gray-200/60">
        <button onClick={onReset} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
          Reset
        </button>
        <button onClick={onApply} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
          Apply
        </button>
      </div>
    </div>
  )
}

export default ProviderFiltersPanel
