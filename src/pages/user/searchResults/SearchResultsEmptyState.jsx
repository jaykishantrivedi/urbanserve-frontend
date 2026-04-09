import { Users } from "lucide-react"

export default function SearchResultsEmptyState({ service, city }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-5">
        <Users size={32} className="text-blue-400" />
      </div>
      <p className="text-xl font-bold text-gray-800 mb-2">No providers found</p>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        {service && city ? (
          <>
            Nobody offering <span className="font-semibold text-gray-600">"{service}"</span> in{" "}
            <span className="font-semibold text-gray-600">{city}</span>. Try a different search.
          </>
        ) : (
          "Try adjusting your search filters."
        )}
      </p>
    </div>
  )
}
