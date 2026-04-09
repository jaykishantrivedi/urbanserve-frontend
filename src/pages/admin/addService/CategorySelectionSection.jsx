import { Tag } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { inputClass } from "./inputClass";

export default function CategorySelectionSection({ value, categories, isLoading, error, onChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionHeader
        icon={Tag}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
        title="Category Selection"
        subtitle="Choose the appropriate category for this service"
      />

      <div className="space-y-1.5">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Service Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={value}
          onChange={onChange}
          disabled={isLoading}
          className={`${inputClass(error)} cursor-pointer`}
        >
          <option value="">{isLoading ? "Loading categories..." : "Select a category"}</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
