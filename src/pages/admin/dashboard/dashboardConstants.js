export const DASHBOARD_COLORS = {
    indigo: "#4F46E5",
    emerald: "#10B981",
    amber: "#F59E0B",
    red: "#EF4444",
    purple: "#8B5CF6",
    cyan: "#06B6D4",
    blue: "#3B82F6",
}

export const PIE_PROVIDER_COLORS = [DASHBOARD_COLORS.emerald, DASHBOARD_COLORS.amber, DASHBOARD_COLORS.red]
export const PIE_BOOKING_COLORS = [
    DASHBOARD_COLORS.blue,
    DASHBOARD_COLORS.amber,
    DASHBOARD_COLORS.purple,
    DASHBOARD_COLORS.emerald,
    DASHBOARD_COLORS.red,
]

export const DASHBOARD_VARIANTS = [
    { key: "currentMonth", label: "This Month" },
    { key: "last7days", label: "Last 7 Days" },
    { key: "last12months", label: "12 Months" },
]

export const DASHBOARD_TOOLTIP_STYLE = {
    contentStyle: {
        backgroundColor: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "10px",
        fontSize: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    },
    labelStyle: { fontWeight: 600, color: "#374151" },
}

export const formatDashboardNumber = (value) => value?.toLocaleString("en-IN") ?? "-"

export const formatTrendLabel = (pct) => {
    if (pct === null || pct === undefined) return null

    return {
        value: `${Math.abs(pct)}% from last month`,
        isPositive: Number(pct) >= 0,
    }
}
