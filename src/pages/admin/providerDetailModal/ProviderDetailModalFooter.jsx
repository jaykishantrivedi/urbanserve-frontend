import { CheckCircle, XCircle } from "lucide-react"

export function ProviderDetailModalFooter({ providerId, processing, onApprove, onReject }) {
    return (
        <div className="p-5 border-t border-gray-100 flex gap-3">
            <button
                onClick={() => onReject(providerId)}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
            >
                {processing ? (
                    <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <XCircle size={16} />
                )}
                Reject
            </button>
            <button
                onClick={() => onApprove(providerId)}
                disabled={processing}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
                {processing ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <CheckCircle size={16} />
                )}
                Approve
            </button>
        </div>
    )
}
