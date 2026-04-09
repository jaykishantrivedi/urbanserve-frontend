import { Tag } from "lucide-react"
import { EditServiceSectionHeader } from "./EditServiceSectionHeader"

export function EditServiceCategorySection({ formData, errors, categories, catsLoading, onChange, inputClass }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <EditServiceSectionHeader
                icon={Tag}
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
                title="Category"
                subtitle="Change the category this service belongs to"
            />

            <div className="space-y-1.5">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Service Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    disabled={catsLoading}
                    className={`${inputClass(errors.category)} cursor-pointer`}
                >
                    <option value="">{catsLoading ? "Loading categories..." : "Select a category"}</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>
                {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
        </div>
    )
}
