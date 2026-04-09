import { CheckCircle } from "lucide-react"
import { EditServiceSectionHeader } from "./EditServiceSectionHeader"
import { EditServiceToggle } from "./EditServiceToggle"

export function EditServiceStatusSection({ isActive, onToggle }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <EditServiceSectionHeader
                icon={CheckCircle}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
                title="Service Status"
                subtitle="Toggle whether this service is visible to customers"
            />

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                    <p className="text-sm font-semibold text-gray-800">{isActive ? "Active" : "Inactive"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {isActive ? "Visible and bookable by customers" : "Hidden from customers"}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isActive ? "text-gray-400" : "text-gray-800"}`}>Inactive</span>
                    <EditServiceToggle checked={isActive} onChange={onToggle} />
                    <span className={`text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-400"}`}>Active</span>
                </div>
            </div>
        </div>
    )
}
