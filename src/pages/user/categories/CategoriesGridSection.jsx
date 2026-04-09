import CategoriesCard from "./CategoriesCard"
import CategoriesEmptyState from "./CategoriesEmptyState"
import CategoriesSkeletonCard from "./CategoriesSkeletonCard"

export default function CategoriesGridSection({
  isError,
  isLoading,
  filtered,
  query,
  setQuery,
  onCategoryClick,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isError && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">Failed to load categories. Please try again later.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && [...Array(9)].map((_, i) => <CategoriesSkeletonCard key={i} />)}

        {!isLoading && !isError && filtered.map((category) => (
          <CategoriesCard key={category._id} category={category} onClick={() => onCategoryClick(category)} />
        ))}

        {!isLoading && !isError && filtered.length === 0 && (
          <CategoriesEmptyState query={query} onClear={() => setQuery("")} />
        )}
      </div>
    </div>
  )
}
