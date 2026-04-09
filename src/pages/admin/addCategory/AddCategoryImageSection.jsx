import { Image as ImageIcon, Upload } from "lucide-react"
import { AddCategorySectionHeader } from "./AddCategorySectionHeader"

export function AddCategoryImageSection({ categoryImage, onImageUpload, onRemoveImage }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <AddCategorySectionHeader
                icon={ImageIcon}
                iconBg="bg-purple-50/80"
                iconColor="text-purple-600"
                title="Category Icon"
                subtitle="Visual representation (optional)"
            />

            {!categoryImage ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                        <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Browse File
                        <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" />
                    </label>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                        Max 2MB. Supports standard formats (JPG, PNG, WebP).
                    </p>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row items-center gap-5 p-5 border border-purple-100 bg-purple-50/30 rounded-xl">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-black/5 shadow-sm">
                        <img src={categoryImage.preview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                    </div>
                    <div className="flex-1 text-center sm:text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{categoryImage.file.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{(categoryImage.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                            type="button"
                            onClick={onRemoveImage}
                            className="mt-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
                        >
                            Remove Attachment
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
