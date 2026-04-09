import { FolderTree } from "lucide-react"
import { EditCategorySectionHeader } from "./EditCategorySectionHeader"

export function EditCategoryBasicInfoSection({ formData, errors, onInput, inputClass }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <EditCategorySectionHeader
                icon={FolderTree}
                iconBg="bg-indigo-50/80"
                iconColor="text-indigo-600"
                title="Basic Information"
                subtitle="Core details of the category"
            />

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="categoryName"
                        type="text"
                        value={formData.categoryName}
                        onChange={onInput}
                        placeholder="e.g. House Cleaning, Plumbing"
                        className={inputClass(errors.categoryName)}
                    />
                    {errors.categoryName && <p className="text-xs text-red-500 mt-1.5">{errors.categoryName}</p>}
                </div>

                <div className="space-y-1.5 mb-4">
                    <label className="text-sm font-medium text-gray-700">Current Slug</label>
                    <div className="px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-500 font-mono">
                        {formData.slug}
                    </div>
                    <p className="text-xs text-gray-400">Slug auto-updates when the category name changes.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={onInput}
                        rows={4}
                        className={`${inputClass(false)} resize-none`}
                    />
                </div>
            </div>
        </div>
    )
}
