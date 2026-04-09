import { DASHBOARD_VARIANTS } from "./dashboardConstants"

export function DashboardVariantToggle({ value, onChange }) {
    return (
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {DASHBOARD_VARIANTS.map((variant) => (
                <button
                    key={variant.key}
                    onClick={() => onChange(variant.key)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        value === variant.key
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {variant.label}
                </button>
            ))}
        </div>
    )
}
