import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"
import { BookingDetailsStatusBadge } from "./BookingDetailsStatusBadge"

export function BookingDetailsHeader({
    bookingId,
    status,
    createdAt,
    canCancel,
    isAccepted,
    onBack,
    onCancel,
    onComplete,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Bookings
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Booking <span className="font-mono text-gray-500">#{bookingId.slice(-8).toUpperCase()}</span>
                        </h2>
                        <BookingDetailsStatusBadge status={status} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Booked on {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {canCancel && (
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100"
                    >
                        <XCircle className="w-4 h-4" /> Cancel Session
                    </button>
                )}
                {isAccepted && (
                    <button
                        onClick={onComplete}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                    >
                        <CheckCircle className="w-4 h-4" /> Force Complete
                    </button>
                )}
            </div>
        </div>
    )
}
