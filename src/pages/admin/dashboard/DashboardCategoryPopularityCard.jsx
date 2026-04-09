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

export function DashboardCategoryPopularityCard({ isLoading, data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 transition-shadow duration-200 hover:shadow-lg">
            <h3 className="text-base font-bold text-gray-900 mb-1">Category Popularity</h3>
            <p className="text-xs text-gray-400 mb-5">Top 5 service categories by total bookings</p>
            {isLoading ? (
                <DashboardChartSkeleton />
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data || []} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                        <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis
                            dataKey="category"
                            type="category"
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            width={110}
                        />
                        <Tooltip
                            {...DASHBOARD_TOOLTIP_STYLE}
                            formatter={(value) => [formatDashboardNumber(value), "Bookings"]}
                            cursor={false}
                        />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar
                            dataKey="count"
                            fill={DASHBOARD_COLORS.purple}
                            radius={[0, 6, 6, 0]}
                            name="Bookings"
                            maxBarSize={36}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
