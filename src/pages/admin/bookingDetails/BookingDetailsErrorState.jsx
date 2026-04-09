import { ArrowLeft, ShieldAlert } from "lucide-react"

export function BookingDetailsErrorState({ onBack }) {
    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <ShieldAlert size={48} className="text-red-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Booking Not Found</h3>
            <p className="text-sm text-gray-500 mt-2">The booking you're trying to access doesn't exist.</p>
            <button
                onClick={onBack}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors"
            >
                <ArrowLeft size={16} /> Back to Bookings
            </button>
        </div>
    )
}
