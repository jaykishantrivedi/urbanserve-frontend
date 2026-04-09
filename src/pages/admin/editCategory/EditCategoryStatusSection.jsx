import { CheckCircle } from "lucide-react"
import { EditCategoryToggle } from "./EditCategoryToggle"

export function EditCategoryStatusSection({ isActive, onToggle }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50/80 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Visibility Status</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Control if customers can see this</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <span className={`text-sm font-medium ${!isActive ? "text-gray-900" : "text-gray-400"}`}>Hidden</span>
                    <EditCategoryToggle checked={isActive} onChange={onToggle} />
                    <span className={`text-sm font-bold ${isActive ? "text-emerald-600" : "text-gray-400"}`}>Active</span>
                </div>
            </div>
        </div>
    )
}
