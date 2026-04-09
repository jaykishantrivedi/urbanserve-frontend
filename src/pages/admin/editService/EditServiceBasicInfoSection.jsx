import { Package } from "lucide-react"
import { EditServiceSectionHeader } from "./EditServiceSectionHeader"

export function EditServiceBasicInfoSection({ formData, errors, slug, onChange, inputClass }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <EditServiceSectionHeader
                icon={Package}
                iconBg="bg-indigo-50"
                iconColor="text-indigo-600"
                title="Basic Information"
                subtitle="Update the core details of the service"
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
                    onChange={onChange}
                    placeholder="e.g., House Cleaning"
                    className={inputClass(errors.serviceName)}
                />
                {errors.serviceName && <p className="text-xs text-red-500">{errors.serviceName}</p>}
            </div>

            <div className="space-y-1.5 mb-4">
                <label className="text-sm font-medium text-gray-700">Current Slug</label>
                <div className="px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-500 font-mono">{slug}</div>
                <p className="text-xs text-gray-400">Slug auto-updates when the service name changes.</p>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    placeholder="Provide a detailed description of the service..."
                    rows={5}
                    className={inputClass(errors.description) + " resize-none"}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>
        </div>
    )
}
