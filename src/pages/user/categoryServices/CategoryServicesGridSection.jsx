import CategoryServicesEmptyState from "./CategoryServicesEmptyState"
import CategoryServicesServiceCard from "./CategoryServicesServiceCard"
import CategoryServicesSkeletonCard from "./CategoryServicesSkeletonCard"

export default function CategoryServicesGridSection({
  isError,
  isLoading,
  services,
  category,
  categorySlug,
  activeCity,
  categoryStyle,
  navigate,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isError && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">Failed to load services. Please try again later.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading && [...Array(8)].map((_, i) => <CategoryServicesSkeletonCard key={i} />)}

        {!isLoading &&
          !isError &&
          services.map((service) => (
            <CategoryServicesServiceCard
              key={service._id}
              service={service}
              categoryStyle={categoryStyle}
              onClick={() => navigate(`/${activeCity}/${categorySlug}/${service.slug}`)}
            />
          ))}

        {!isLoading && !isError && services.length === 0 && (
          <CategoryServicesEmptyState categoryName={category?.categoryName || categorySlug} />
        )}
      </div>
    </div>
  )
}
