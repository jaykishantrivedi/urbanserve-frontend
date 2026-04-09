import { Image as ImageIcon } from "lucide-react"
import { EditCategorySectionHeader } from "./EditCategorySectionHeader"

export function EditCategoryImageSection({ categoryImage, existingImageUrl, onImageUpload, onRemoveImage }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <EditCategorySectionHeader
                icon={ImageIcon}
                iconBg="bg-purple-50/80"
                iconColor="text-purple-600"
                title="Category Icon"
                subtitle="Upload a new image to replace the current one"
            />

            {categoryImage ? (
                <div className="flex flex-col sm:flex-row items-center gap-5 p-5 border border-purple-100 bg-purple-50/30 rounded-xl">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-black/5 shadow-sm">
                        <img src={categoryImage.preview} alt="New Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                    </div>
                    <div className="flex-1 text-center sm:text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{categoryImage.file.name}</p>
                        <button
                            type="button"
                            onClick={onRemoveImage}
                            className="mt-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
                        >
                            Remove Selection
                        </button>
                    </div>
                </div>
            ) : existingImageUrl ? (
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200">
                        <img src={existingImageUrl} alt="Current" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Current Image</p>
                        <label className="inline-block mt-3 cursor-pointer px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            Replace Image
                            <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
                        </label>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Add Image
                        <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
                    </label>
                </div>
            )}
        </div>
    )
}
