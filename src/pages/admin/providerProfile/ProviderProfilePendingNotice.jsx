import { AlertCircle } from "lucide-react"

export function ProviderProfilePendingNotice() {
    return (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-semibold text-amber-800">Awaiting Approval</p>
                <p className="text-xs text-amber-600 mt-0.5">
                    This provider has not yet been approved. Review the details below and approve or leave pending.
                </p>
            </div>
        </div>
    )
}
