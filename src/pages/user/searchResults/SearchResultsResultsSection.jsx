import { Search } from "lucide-react"
import SearchResultsEmptyState from "./SearchResultsEmptyState"
import SearchResultsProviderCard from "./SearchResultsProviderCard"
import SearchResultsSkeletonCard from "./SearchResultsSkeletonCard"

export default function SearchResultsResultsSection({
  queryService,
  queryCity,
  isLoading,
  isError,
  results,
  navigate,
  openEnquiry,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {!queryService && !queryCity && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-5">
            <Search size={32} className="text-gray-400" />
          </div>
          <p className="text-xl font-bold text-gray-700 mb-2">Enter a service or city to start</p>
          <p className="text-sm text-gray-400">Use the search bar above to find providers near you.</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-lg">Failed to load providers. Please try again later.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading && [...Array(6)].map((_, i) => <SearchResultsSkeletonCard key={i} />)}

        {!isLoading &&
          !isError &&
          (queryService || queryCity) &&
          results.map((result) => (
            <SearchResultsProviderCard
              key={result.providerServiceId}
              result={result}
              onClick={() => navigate(`/providers/${result.provider._id}`)}
              onEnquiry={openEnquiry}
            />
          ))}

        {!isLoading && !isError && (queryService || queryCity) && results.length === 0 && (
          <SearchResultsEmptyState service={queryService} city={queryCity} />
        )}
      </div>
    </div>
  )
}
