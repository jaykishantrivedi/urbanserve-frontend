import { Users } from 'lucide-react'
import ProviderCard from './ProviderCard'

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-200" />
      <div className="w-24 h-14 rounded-2xl bg-gray-100" />
    </div>
    <div className="h-5 bg-gray-200 rounded-lg w-3/5 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-1/4 mb-3" />
    <div className="h-3 bg-gray-100 rounded w-2/5 mb-4" />
    <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
    <div className="h-3 bg-gray-100 rounded w-4/5 mb-5" />
    <div className="h-px bg-gray-100 mb-4" />
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <div className="h-7 w-16 bg-gray-100 rounded-xl" />
        <div className="h-7 w-20 bg-gray-100 rounded-xl" />
      </div>
      <div className="h-9 w-9 bg-gray-100 rounded-xl" />
    </div>
  </div>
)

const EmptyState = ({ city, serviceName }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
    <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-5">
      <Users size={32} className="text-blue-400" />
    </div>
    <p className="text-xl font-bold text-gray-800 mb-2">No providers found</p>
    <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
      Nobody is currently offering{' '}
      <span className="font-medium text-gray-600">{serviceName}</span> in{' '}
      <span className="font-medium text-gray-600">{city}</span>.
      Try a different city or service above.
    </p>
  </div>
)

const ProviderResultsGrid = ({
  isLoading,
  isError,
  results,
  city,
  serviceName,
  onViewProfile,
  onEnquiry,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    {isError && (
      <div className="text-center py-24 text-gray-500">
        <p className="text-lg">Failed to load providers. Please try again later.</p>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {isLoading && [...Array(6)].map((_, index) => <SkeletonCard key={index} />)}

      {!isLoading && !isError && results.map((result) => (
        <ProviderCard
          key={result.providerServiceId}
          result={result}
          onViewProfile={onViewProfile}
          onEnquiry={onEnquiry}
        />
      ))}

      {!isLoading && !isError && results.length === 0 && (
        <EmptyState city={city} serviceName={serviceName} />
      )}
    </div>
  </div>
)

export default ProviderResultsGrid
