export default function SearchResultsSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-[180px] bg-gray-200" />
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-100 rounded-full w-20" />
        </div>
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
        <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
        <div className="h-3 bg-gray-100 rounded w-4/5 mb-5" />
        <div className="h-11 bg-gray-100 rounded-xl" />
      </div>
    </div>
  )
}
