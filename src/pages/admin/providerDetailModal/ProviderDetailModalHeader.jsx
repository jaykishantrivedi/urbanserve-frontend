import { Building2, X } from "lucide-react"

export function ProviderDetailModalHeader({ isLoading, providerName, onClose }) {
    return (
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <Building2 size={18} className="text-indigo-600" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Provider Details</p>
                    <p className="text-sm font-bold text-gray-900 truncate max-w-55">
                        {isLoading ? "Loading..." : providerName || "-"}
                    </p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"
            >
                <X size={18} />
            </button>
        </div>
    )
}
