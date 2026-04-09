import { Check, DollarSign } from "lucide-react"
import { BookingDetailsInfoItem } from "./BookingDetailsInfoItem"

export function BookingDetailsFinancialsCard({
    price,
    finalPrice,
    priceType,
    hoursWorked,
    isPaid,
    status,
    startOTP,
    completionOTP,
    showPrice,
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Financials & Auth</h3>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <BookingDetailsInfoItem label="Base Price" value={showPrice(price)} />
                <BookingDetailsInfoItem label="Price Type" value={<span className="capitalize">{priceType}</span>} />
                {priceType === "hourly" && <BookingDetailsInfoItem label="Hours" value={hoursWorked || "TBD"} />}
                <BookingDetailsInfoItem
                    label="Final Amount"
                    value={showPrice(finalPrice)}
                    valueClass="text-emerald-600 text-lg font-bold"
                />
                <BookingDetailsInfoItem
                    label="Payment Status"
                    value={
                        isPaid ? (
                            <span className="flex items-center gap-1 text-emerald-600">
                                <Check size={14} /> Paid
                            </span>
                        ) : (
                            <span className="text-amber-600">Pending</span>
                        )
                    }
                />
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 grid grid-cols-2 gap-6">
                <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Start OTP</span>
                    <span className="text-sm font-medium text-gray-800">
                        {status === "open" ? "Pending validation" : startOTP ? <span className="text-emerald-600">Validated</span> : "N/A"}
                    </span>
                </div>
                <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Completion OTP</span>
                    <span className="text-sm font-medium text-gray-800">
                        {["completed", "closed"].includes(status)
                            ? <span className="text-emerald-600">Validated</span>
                            : completionOTP
                                ? "Generated"
                                : "N/A"}
                    </span>
                </div>
            </div>
        </div>
    )
}
