import { FolderTree } from "lucide-react"
import { AddCategorySectionHeader } from "./AddCategorySectionHeader"

export function AddCategoryBasicInfoSection({
    formData,
    errors,
    slugManuallyEdited,
    onInput,
    onSlugChange,
    inputClass,
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <AddCategorySectionHeader
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

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center justify-between">
                        <span>
                            Slug <span className="text-red-500">*</span>
                        </span>
                        {slugManuallyEdited && (
                            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Manual override
                            </span>
                        )}
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400/70 select-none">/</span>
                        <input
                            name="slug"
                            type="text"
                            value={formData.slug}
                            onChange={onSlugChange}
                            placeholder="house-cleaning"
                            className={`${inputClass(errors.slug)} pl-7 font-mono text-sm`}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">URL-friendly identifier. Auto-generates by default.</p>
                    {errors.slug && <p className="text-xs text-red-500 mt-1.5">{errors.slug}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={onInput}
                        placeholder="Optional description for users exploring this category..."
                        rows={4}
                        className={`${inputClass(false)} resize-none`}
                    />
                </div>
            </div>
        </div>
    )
}
