import { ArrowLeft, XCircle } from "lucide-react"

export function EditServiceErrorState({ onBack }) {
    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <XCircle size={40} className="text-red-300 mb-3" />
            <p className="text-lg font-bold text-gray-700">Service Not Found</p>
            <p className="text-sm text-gray-400 mt-1">This service may have been deleted or the ID is invalid.</p>
            <button
                onClick={onBack}
                className="mt-5 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
                <ArrowLeft size={15} /> Back to Services
            </button>
        </div>
    )
}
