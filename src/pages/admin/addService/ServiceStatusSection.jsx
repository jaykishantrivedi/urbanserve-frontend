import { CheckCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ToggleSwitch from "./ToggleSwitch";

export default function ServiceStatusSection({ isActive, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionHeader
        icon={CheckCircle}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        title="Service Status"
        subtitle="Set whether this service is immediately available to customers"
      />

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-semibold text-gray-800">{isActive ? "Active" : "Inactive"}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {isActive
              ? "Service is visible and bookable by customers"
              : "Service is hidden from customers"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${isActive ? "text-gray-400" : "text-gray-800"}`}>
            Inactive
          </span>
          <ToggleSwitch checked={isActive} onChange={onToggle} />
          <span className={`text-sm font-medium ${isActive ? "text-emerald-600" : "text-gray-400"}`}>
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
