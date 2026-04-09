export function BookingDetailsInfoItem({ icon: Icon, label, value, valueClass = "text-gray-900" }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {Icon && <Icon className="w-3.5 h-3.5" />} {label}
            </span>
            <span className={`text-sm font-medium ${valueClass}`}>{value || "-"}</span>
        </div>
    )
}
