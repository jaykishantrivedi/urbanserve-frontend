import { ImageOff } from "lucide-react"

export default function CategoryServicesEmptyState({ categoryName }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <ImageOff size={28} className="text-gray-400" />
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-1">No services available</p>
      <p className="text-sm text-gray-400">There are no active services under {categoryName} yet.</p>
    </div>
  )
}
