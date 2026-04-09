import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { DashboardChartSkeleton } from "./DashboardChartSkeleton"
import { DASHBOARD_COLORS, DASHBOARD_TOOLTIP_STYLE, formatDashboardNumber } from "./dashboardConstants"
import { DashboardVariantToggle } from "./DashboardVariantToggle"

export function DashboardRevenueOverviewCard({ variant, onVariantChange, isLoading, data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 transition-shadow duration-200 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                    <h3 className="text-base font-bold text-gray-900">Revenue Overview</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Total revenue collected over time (₹)</p>
                </div>
                <DashboardVariantToggle value={variant} onChange={onVariantChange} />
            </div>
            {isLoading ? (
                <DashboardChartSkeleton />
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                        <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 11 }} tickLine={false} />
                        <YAxis
                            stroke="#9CA3AF"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                        />
                        <Tooltip
                            {...DASHBOARD_TOOLTIP_STYLE}
                            formatter={(value) => [`₹${formatDashboardNumber(value)}`, "Revenue"]}
                            cursor={false}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar
                            dataKey="revenue"
                            fill={DASHBOARD_COLORS.emerald}
                            radius={[6, 6, 0, 0]}
                            name="Revenue (₹)"
                            maxBarSize={48}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
