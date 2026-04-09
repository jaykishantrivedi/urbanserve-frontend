import { X } from 'lucide-react'

const ActiveFiltersChips = ({ visible, resultsCount, activeFilters, onRemoveFilter }) => {
  if (!visible) return null

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <span className="text-[15px] font-extrabold text-gray-900 mr-2">
        Showing {resultsCount} provider{resultsCount !== 1 && 's'}
      </span>

      {activeFilters.priceType && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
          {activeFilters.priceType}
          <button onClick={() => onRemoveFilter('priceType')}>
            <X size={12} className="cursor-pointer hover:text-indigo-900" />
          </button>
        </span>
      )}

      {activeFilters.minRating === '4' && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
          Rating 4+
          <button onClick={() => onRemoveFilter('minRating')}>
            <X size={12} className="cursor-pointer hover:text-amber-900" />
          </button>
        </span>
      )}

      {activeFilters.experience && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
          {activeFilters.experience}+ Yrs Exp
          <button onClick={() => onRemoveFilter('experience')}>
            <X size={12} className="cursor-pointer hover:text-blue-900" />
          </button>
        </span>
      )}

      {(activeFilters.minPrice || activeFilters.maxPrice) && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
          INR {activeFilters.minPrice || '0'} - {activeFilters.maxPrice || 'Any'}
          <button onClick={() => onRemoveFilter(['minPrice', 'maxPrice'])}>
            <X size={12} className="cursor-pointer hover:text-emerald-900" />
          </button>
        </span>
      )}
    </div>
  )
}

export default ActiveFiltersChips
