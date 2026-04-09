export function ProviderProfileStatusBadge({ status }) {
    const cfg = {
        approved: { dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700", label: "Approved" },
        pending: { dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700", label: "Pending Approval" },
        blocked: { dot: "bg-red-500", bg: "bg-red-50 text-red-600", label: "Blocked" },
    }

    const c = cfg[status] || cfg.pending

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    )
}
