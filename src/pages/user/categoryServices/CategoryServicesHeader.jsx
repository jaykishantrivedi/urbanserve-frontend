import { ChevronRight } from "lucide-react"

export default function CategoryServicesHeader({
  navigate,
  isCategoryLoading,
  category,
  categorySlug,
  categoryStyle,
  activeCity,
  isServicesLoading,
  isServicesError,
  servicesLength,
}) {
  const { icon: Icon, gradient, text, light } = categoryStyle

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate("/")} className="hover:text-blue-600 transition-colors duration-150">
            Home
          </button>
          <ChevronRight size={14} />
          {isCategoryLoading ? (
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span className="text-gray-700 font-medium">{category?.categoryName || categorySlug}</span>
          )}
        </nav>

        <div className="flex items-start gap-6">
          {!isCategoryLoading && (
            <div className={`hidden sm:flex w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} items-center justify-center shadow-lg shrink-0`}>
              <Icon className="text-white" size={28} />
            </div>
          )}
          {isCategoryLoading && <div className="hidden sm:block w-16 h-16 rounded-2xl bg-gray-200 animate-pulse shrink-0" />}

          <div className="flex-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${light} ${text} text-xs font-semibold rounded-full mb-3`}>
              📍 {activeCity}
            </span>

            {isCategoryLoading ? (
              <>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-72 animate-pulse" />
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{category?.categoryName || categorySlug}</h1>
                {category?.description && <p className="text-gray-500 max-w-xl">{category.description}</p>}
              </>
            )}

            {!isServicesLoading && !isServicesError && (
              <p className="text-sm text-gray-400 mt-2">
                {servicesLength} {servicesLength === 1 ? "service" : "services"} available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
