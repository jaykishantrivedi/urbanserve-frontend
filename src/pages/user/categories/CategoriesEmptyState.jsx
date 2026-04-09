import { Search, X } from "lucide-react"

export default function CategoriesEmptyState({ query, onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Search size={28} className="text-gray-400" />
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-1">No categories found for "{query}"</p>
      <p className="text-sm text-gray-400 mb-6">Try a different keyword or browse all categories</p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-150"
      >
        <X size={14} />
        Clear search
      </button>
    </div>
  )
}
