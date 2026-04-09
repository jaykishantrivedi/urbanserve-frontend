const STATUS_CONFIG = {
    open: { label: "Open", cls: "bg-sky-50 text-sky-700 border-sky-100" },
    accepted: { label: "In Progress", cls: "bg-blue-50 text-blue-700 border-blue-100" },
    closed: { label: "Closed", cls: "bg-purple-50 text-purple-700 border-purple-100" },
    completed: { label: "Completed", cls: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600 border-red-100" },
}

export function BookingDetailsStatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || {
        label: status,
        cls: "bg-gray-50 text-gray-600 border-gray-200",
    }

    return (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border capitalize ${cfg.cls}`}>
            {cfg.label}
        </span>
    )
}
