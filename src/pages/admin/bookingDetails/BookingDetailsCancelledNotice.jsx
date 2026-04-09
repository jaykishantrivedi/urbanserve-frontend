import { ShieldAlert } from "lucide-react"

export function BookingDetailsCancelledNotice({ cancelledBy }) {
    return (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
            <div>
                <h4 className="text-sm font-bold text-red-800">Booking Cancelled</h4>
                <p className="text-sm text-red-700 mt-1">
                    This engagement was cancelled by the <strong className="capitalize">{cancelledBy || "Administrator"}</strong>.
                </p>
            </div>
        </div>
    )
}
