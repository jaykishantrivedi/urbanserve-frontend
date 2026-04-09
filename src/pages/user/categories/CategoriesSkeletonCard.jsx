export default function CategoriesSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-5">
        <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
        <div className="w-6 h-6 bg-gray-100 rounded-full" />
      </div>
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="h-3 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-4/5 mb-6" />
      <div className="h-px bg-gray-100 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  )
}
