import { Package } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { inputClass } from "./inputClass";

export default function BasicInfoSection({ formData, errors, onFieldChange, onSlugChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionHeader
        icon={Package}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
        title="Basic Information"
        subtitle="Enter the core details of the service"
      />

      <div className="space-y-1.5 mb-4">
        <label htmlFor="serviceName" className="text-sm font-medium text-gray-700">
          Service Name <span className="text-red-500">*</span>
        </label>
        <input
          id="serviceName"
          name="serviceName"
          type="text"
          value={formData.serviceName}
          onChange={onFieldChange}
          placeholder="e.g., House Cleaning, Plumbing Repair"
          className={inputClass(errors.serviceName)}
        />
        {errors.serviceName && <p className="text-xs text-red-500">{errors.serviceName}</p>}
      </div>

      <div className="space-y-1.5 mb-4">
        <label htmlFor="slug" className="text-sm font-medium text-gray-700">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={formData.slug}
          onChange={onSlugChange}
          placeholder="auto-generated-from-name"
          className={inputClass(errors.slug)}
        />
        <p className="text-xs text-gray-400">URL-friendly version of the name (auto-generated, but editable)</p>
        {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onFieldChange}
          placeholder="Provide a detailed description of the service..."
          rows={5}
          className={inputClass(errors.description) + " resize-none"}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
      </div>
    </div>
  );
}
